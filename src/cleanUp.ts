export const defineCleanUp = (stopServer: () => void): void => {
  process.on('exit', function () {
    stopServer();
  });
  process.on('SIGINT', function () {
    stopServer();
  });
  process.on('uncaughtException', function (e) {
    console.log('Uncaught Exception...');
    console.log(e.stack);
    stopServer();
    process.exit(99);
  });
};
