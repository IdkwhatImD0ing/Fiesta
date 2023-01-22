const express = require('express');
const {createServer} = require('http');
const {Server} = require('socket.io');

require('dotenv').config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

const {Hop, ChannelType} = require('@onehop/js');
const hop = new Hop(process.env.HOP_KEY);
const createInitialState = require('./initial');

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
  res.send(
    'Backend Server Home! Go to /id to make sure the service is working!',
  );
});

app.get('/id', async (req, res) => {
  const {id} = await hop.channels.tokens.create();
  res.json({message: 'Successfully Generated ID!', id: id});
});

io.on('connection', (socket) => {
  // Creating a trip
  socket.on('create', async (data) => {
    try {
      const {name, date, location, user, description} = data;
      const eventObject = createInitialState(
        name,
        date,
        location,
        user,
        description,
      );
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

      socket.emit('create-success', {
        name: eventObject.name,
        date: eventObject.date,
        channelId: channelId,
      });
    } catch {
      socket.emit('create-error', {message: 'Error Creating Channel!'});
    }
  });

  // Lets a user join an event
  socket.on('join', async (data) => {
    try {
      const {channelId, user} = data;
      const channel = await hop.channels.get(`${channelId}`);

      //Updating the state
      let currentState = JSON.parse(JSON.stringify(channel.state.registered));
      currentState = {
        ...currentState,
        [user.email]: user,
      };

      hop.channels.patchState(channelId, {registered: currentState});

      socket.emit('join-success', {message: 'Successfully Joined Trip!'});
    } catch {
      socket.emit('join-error', {message: 'Error Joining Trip!'});
    }
  });

  // Lets a user leave an event
  socket.on('leave', async (data) => {
    try {
      const {channelId, user} = data;
      const channel = await hop.channels.get(`${channelId}`);

      //Updating the state
      const currentState = JSON.parse(JSON.stringify(channel.state.registered));
      delete currentState[user.email];

      hop.channels.patchState(channelId, {registered: currentState});
      socket.emit('leave-success', {message: 'Successfully Left Trip!'});
    } catch {
      socket.emit('leave-error', {message: 'Error Leaving Trip!'});
    }
  });
});

httpServer.listen(5000);
