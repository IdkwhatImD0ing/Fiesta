const express = require('express');
const {createServer} = require('http');
const {Server} = require('socket.io');

require('dotenv').config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const {Hop, ChannelType} = require('@onehop/js');
const hop = new Hop(process.env.HOP_KEY);

const createChannelId = () => {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

// Home Page
app.get('/', (req, res) => {
  res.send('Backend Server Home!');
});

app.get('/id', async (req, res) => {
  const {id} = await hop.channels.tokens.create();
  res.json({message: 'Successfully Generated ID!', id: id});
});

httpServer.listen(5000);
