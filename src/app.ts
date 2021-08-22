import { startSignallingServer, stopSignallingServer } from './ws/server';
import { defineCleanUp } from './cleanUp';
import WebSocket from 'ws';

let wss: WebSocket.Server | undefined;

const startServer = () => {
  const wsPort = 9090;
  wss = startSignallingServer(wsPort);
  console.log('Signalling server started');
};

const stopServer = () => {
  stopSignallingServer(wss);
  console.log('Signalling server stopped');
};

defineCleanUp(stopServer);

startServer();
