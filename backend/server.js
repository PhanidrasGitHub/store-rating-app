
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const storeRoutes = require('./routes/storeRoutes');
const ratingRoutes = require('./routes/ratingRoutes');

const app = express();

app.use(cors());
app.use(cors({
  origin: ['http://localhost:3000', 'https://storeratingfrontend.vercel.app/'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));



app.use(bodyParser.json());

app.use('/api/users', userRoutes);   
app.use('/api/auth', authRoutes);
app.use('/api/auth', storeRoutes);
app.use('/api/auth', ratingRoutes);
app.listen(process.env.PORT || 5000, () => {
  console.log('Server running...');
});
