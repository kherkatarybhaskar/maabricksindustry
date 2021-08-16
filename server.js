const express =  require('express');
const connectDB =  require('./config/db');
const cors =  require('cors');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());

app.get('/', (req, res) => res.send('API RUNNING'));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/carrier', require('./routes/api/carrier'));
app.use('/api/cook', require('./routes/api/cook'));
app.use('/api/material', require('./routes/api/material'));
app.use('/api/sales', require('./routes/api/sales'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`));