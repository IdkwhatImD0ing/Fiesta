const express = require('express');
const {createServer} = require('http');
const {Server} = require('socket.io');

require('dotenv').config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const {Hop, ChannelType} = require('@onehop/js');
const hop = new Hop(process.env.HOP_KEY);
const {createInitialState} = require('./initial');

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

io.on('connection', (socket) => {
  // Creating a trip
  socket.on('join', async (data) => {
    try {
      const {name, date, location, user} = data;
      const eventObject = createInitialState(name, date, location, user);

      const channelId = createChannelId();
      const channel = await hop.channels.create(
        ChannelType.UNPROTECTED,
        `${channelId}`,
        // Creation Options
        {
          // Initial Channel state object
          state: eventObject,
        },
      );

      socket.emit('join-sucecss', {channelId: channelId});
    } catch {
      socket.emit('join-error', {message: 'Error Creating Channel!'});
    }
  });

  // Lets a user join a trip
  socket.on('join-trip', async (data) => {
    try {
      const {channelId, user} = data;
      const channel = await hop.channels.get(`${channelId}`);

      //Updating the state
      const currentState = JSON.parse(JSON.stringify(channel.state.registered));
      currentState = {
        ...currentState,
        [user.id]: user,
      };

      hop.channels.patchState(channelId, {registered, currentState});

      socket.emit('join-trip-success', {message: 'Successfully Joined Trip!'});
    } catch {
      socket.emit('join-trip-error', {message: 'Error Joining Trip!'});
    }
  });

  // Lets a user leave a trip
  socket.on('leave-trip', async (data) => {
    try {
      const {channelId, user} = data;
      const channel = await hop.channels.get(`${channelId}`);

      //Updating the state
      const currentState = JSON.parse(JSON.stringify(channel.state.registered));
      delete currentState[user.id];

      hop.channels.patchState(channelId, {registered, currentState});
      socket.emit('leave-trip-success', {message: 'Successfully Left Trip!'});
    } catch {
      socket.emit('leave-trip-error', {message: 'Error Leaving Trip!'});
    }
  });
});

httpServer.listen(5000);
