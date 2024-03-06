require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const cors = require('cors');
const { Server } = require("socket.io");
const runCrons = require('./Crons/runCrons');
const account = require('./Models/Account')

// Database connection setup
mongoose.connect(process.env.DB_HOST)
.then(() => {
  console.log('Connected to MongoDB');

})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
  process.exit(1); // Exit the process if unable to connect to the database
});


  // Create Express app
  const app = express();
  app.use(express.json());
  app.use(cors());

  // Create HTTP server
  const server = http.createServer(app);

  // Initialize Socket.IO
  const io = new Server(server, {
    cors: {origin:"http://localhost:5173", methods: ["GET", "POST"]}
  });

  // WebSocket connection
  io.on('connection', socket => {
    console.log(`Client connected: ${socket.id}`); // Log client's socket ID
    socket.on('disconnect', () => {
      console.log('A client disconnected');
    });
  });
      // Handle client disconnection

  app.use((req, res, next) => {
    req.io = io; // Make io accessible via req object
    next();
  });
  // Import routes
  const siteRoutes = require("./Routes/siteRoutes");
  const userRoutes = require("./Routes/userRoutes");
  const authRoutes = require("./Routes/authRoutes");


  // Use routes
  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/sites', siteRoutes);
  runCrons()
  // Start the server
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Worker process ${process.pid} started. Server is running on port ${PORT}`);
  });

