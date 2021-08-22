import WebSocket from 'ws';
import { AdminCredentials } from '../types/rtcRequest';
import crypto from 'crypto';
import { User } from '../store/user';
import { MessageType } from '../constants/message';
import { Response } from '../types/rtcResponse';
import { Admin } from '../store/admin';

const sendTo = (connection: WebSocket | undefined, message: Response) => {
  const json = JSON.stringify(message);
  console.log(`Sending: ${json}`);
  if (connection) {
    connection.send(json);
  }
};

export const handleLogin = (connection: WebSocket, adminCredentials?: AdminCredentials): string | false => {
  const userName = adminCredentials ? adminCredentials.userName : crypto.randomBytes(16).toString('base64');
  if (!User.get(userName)) {
    const admin = Admin.get();
    if (userName === admin.userName) {
      if (Admin.authorize(adminCredentials?.password)) {
        sendTo(connection, {
          type: MessageType.Login,
          success: false,
          body: 'Unauthorized',
        });
      }
      for (const userName of Object.keys(User.getAll())) {
        sendTo(User.get(userName)?.connection, {
          type: MessageType.Offer,
          success: true,
          body: 'Admin is online',
          userName: admin.userName,
        });
      }
      sendTo(connection, {
        type: MessageType.Login,
        success: true,
        body: 'Logged in',
      });
      Admin.setConnection(connection);
    } else {
      User.add(userName, {
        connection,
      });
      sendTo(connection, {
        type: MessageType.Login,
        success: true,
        body: 'Logged in',
      });
    }
    return userName;
  } else {
    sendTo(connection, {
      type: MessageType.Login,
      success: false,
      body: 'User already logged in',
    });
  }
  return false;
};

export const handleOffer = (userName: string, sdp: string): void => {
  const admin = Admin.get();
  sendTo(admin.connection, {
    type: MessageType.Offer,
    success: true,
    userName,
    sdp,
  });
};

export const handleAnswer = (forUserName: string, sdp: string): void => {
  sendTo(User.get(forUserName)?.connection, {
    type: MessageType.Answer,
    userName: forUserName,
    success: true,
    sdp,
  });
};

export const handleIceCandidate = (forUserName: string, fromUserName: string, candidate: string): void => {
  const { userName: adminUserName, connection: adminConnection } = Admin.get();
  const connection = forUserName === adminUserName ? adminConnection : User.get(forUserName)?.connection;
  sendTo(connection, {
    type: MessageType.IceCandidate,
    candidate,
    success: true,
    forUserName,
    fromUserName,
  });
};

export const handleLeave = (connectionUserName: string): void => {
  User.remove(connectionUserName);
};
