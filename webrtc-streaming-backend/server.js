// webrtc-streaming-backend/server.js
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const app = express();

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static('public'));

// Handle WebSocket connections
wss.on('connection', (ws) => {
  console.log('New client connected');

  // Broadcast messages to all connected clients except the sender
  ws.on('message', (message) => {
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`WebRTC backend server running at http://localhost:${PORT}`);
});
