import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import Message from '../models/Message.js';

const onlineUsers = new Map();

function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ["GET", "POST"]
    }
  });

  // Middleware for auth
  
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token || socket.handshake.query?.token;
    if (!token) return next();

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = payload.id;
      next();
    } catch (error) {
      next();
    }
  });

  io.on('connection', (socket) => {
    // console.log(`Socket connected - ${socket.id} for userId: ${socket.userId}`);

    if (socket.userId) {
      const prev = onlineUsers.get(socket.userId) || [];
      onlineUsers.set(socket.userId, [...prev, socket.id]);
      socket.broadcast.emit('user-online', { userId: socket.userId });
      socket.join(socket.userId);
    }

    socket.on('fetch-message', async ({ withUserId, limit = 50, skip = 0 }, callback) => {
      try {
        if (!socket.userId) {
          if (typeof callback === "function") {
            callback({ error: 'Not Authenticated' });
          }
          return;
        }

        const messages = await Message.find({
          $or: [
            { sender: socket.userId, receiver: withUserId },
            { receiver: socket.userId, sender: withUserId }
          ]
        }).sort({ createdAt: -1 }).skip(skip).limit(limit).lean();

        console.log(messages);

        if (typeof callback === "function") {
          callback({ ok: true, message: messages.reverse() });
        }
      } catch (error) {
        if (typeof callback === "function") {
          callback({ error: error.message });
        }
        console.log('Socket Error - Fetch Messages:', error.message);
      }
    });

    // Send message
    socket.on('send-message', async ({ to, text = '', attachments = [], tempId }, callback) => {
      try {
        if (!socket.userId) {
          if (typeof callback === "function") {
            callback({ error: 'Not Authenticated' });
          }
          return;
        }

        if (!to) {
          if (typeof callback === "function") {
            callback({ error: 'Missing Receiver' });
          }
          return;
        }

        // Save message
        const message = await Message.create({
          sender: socket.userId,
          receiver: to,
          text,
          attachments
        });

        const messageObj = await Message.findById(message._id)
          .populate('sender', 'name email')
          .lean();

        const recipientSockets = onlineUsers.get(to) || [];
        recipientSockets.forEach(sid => {
          io.to(sid).emit('receive-message', messageObj);
        });

        
        socket.emit('message-sent', { to, message: messageObj, tempId });

        if (typeof callback === "function") {
          callback({ ok: true, message: messageObj });
        }

      } catch (error) {
        if (typeof callback === "function") {
          callback({ error: error.message });
        }
        console.log('Socket Error - Messaging Error:', error.message);
      }
    });


    socket.on('typing', ({ to, isTyping }) => {
      if (!socket.userId || !to) return;

      io.to(to).emit('typing', {
        from: socket.userId,
        isTyping
      });
    });

    socket.on('disconnect', () => {
      if (socket.userId) {
        const arr = onlineUsers.get(socket.userId) || [];
        const filtered = arr.filter(sid => sid !== socket.id);

        if (filtered.length) {
          onlineUsers.set(socket.userId, filtered);
        } else {
          onlineUsers.delete(socket.userId);
          socket.broadcast.emit('user-offline', { userId: socket.userId });
        }
      }
      console.log("Socket disconnected:", socket.id);
    });


    console.log("User connected:", socket.userId, "with socketId:", socket.id);
    console.log("All online users now:", Array.from(onlineUsers.entries()));

  });

  return io;
}

export default initSocket;
