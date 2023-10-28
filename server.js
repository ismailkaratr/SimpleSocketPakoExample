const {WebSocketServer} = require('ws');
const wss = new WebSocketServer({ port: 8080 });
const clients = [];

wss.on('connection', function connection(ws) {
    console.log(ws)
  clients.push(ws);
  ws.on('message', function incoming(data) {
    clients.forEach((client) => {
      if (client !== ws && client.readyState === 1) {
        // Veriyi diğer istemcilere gönderin
        client.send(data);
      }
    });
  });
  ws.on('close', () => {
    // İstemci bağlantısını kaldır
    const index = clients.indexOf(ws);
    if (index > -1) {
      clients.splice(index, 1);
    }
  });
});