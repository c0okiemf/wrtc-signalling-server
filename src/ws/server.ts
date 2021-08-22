import { AnswerRequest, IceCandidateRequest, LoginRequest, OfferRequest, Request } from '../types/rtcRequest';
import { MessageType } from '../constants/message';
import WebSocket from 'ws';
import { handleAnswer, handleIceCandidate, handleLeave, handleLogin, handleOffer } from './handlers';

const handleConnection = (connection: WebSocket) => {
  let connectionUserName = '';

  connection.on('message', (message: Buffer) => {
    const json = message.toString();
    console.log(`Received: ${json}`);

    const request = JSON.parse(json);

    const { type } = request as Request;

    switch (type) {
      case MessageType.Login: {
        const { adminCredentials } = request as LoginRequest;
        const loggedInUserName = handleLogin(connection, adminCredentials);
        if (loggedInUserName) {
          connectionUserName = loggedInUserName;
        }
        break;
      }
      case MessageType.Offer: {
        const { sdp } = request as OfferRequest;
        handleOffer(connectionUserName, sdp);
        break;
      }
      case MessageType.Answer: {
        const { sdp, forUserName } = request as AnswerRequest;
        handleAnswer(forUserName, sdp);
        break;
      }
      case MessageType.IceCandidate: {
        const iceCandidateRequest = request as IceCandidateRequest;
        const { forUserName, candidate } = iceCandidateRequest;
        handleIceCandidate(forUserName, connectionUserName, candidate);
        break;
      }
      case MessageType.Leave: {
        handleLeave(connectionUserName);
        break;
      }
    }
  });

  connection.on('close', () => {
    handleLeave(connectionUserName);
  });
};

export const startSignallingServer = (port: number): WebSocket.Server => {
  const wss = new WebSocket.Server({ port });
  wss.on('connection', handleConnection);
  return wss;
};

export const stopSignallingServer = (wss?: WebSocket.Server): void => {
  wss?.close();
};
