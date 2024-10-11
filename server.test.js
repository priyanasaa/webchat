const request = require('supertest');
const app = require('./server'); // Ensure this is the correct path to your server.js

describe('Web Chat App', () => {
  it('should load the main page', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('<title>Web Chat</title>'); // Check if the page contains the correct title
  });

  it('should emit a chat message', async (done) => {
    const io = require('socket.io-client');
    const socket = io('http://3.107.189.104:3000');

    socket.on('connect', () => {
      socket.emit('chat message', { name: 'Test User', message: 'Hello World' });
    });

    socket.on('chat message', (data) => {
      expect(data.name).toEqual('Test User');
      expect(data.message).toEqual('Hello World');
      socket.disconnect();
      done();
    });
  });
});
