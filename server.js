const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/auth'); // Import auth middleware
const cors = require('cors');
require('dotenv').config();

app.use(cors());
const app = express();
const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error(err));

app.use(cors());
app.use(bodyParser.json());

// Apply auth middleware to all routes except /auth
app.use('/users', authMiddleware, userRoutes);
app.use('/auth', authRoutes); // No authentication for auth routes

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
