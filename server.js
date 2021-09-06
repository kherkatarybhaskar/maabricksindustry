const express =  require('express');
const connectDB =  require('./config/db');
const cors =  require('cors');
const path = require('path');
const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/carrier', require('./routes/api/carrier'));
app.use('/api/cook', require('./routes/api/cook'));
app.use('/api/material', require('./routes/api/material'));
app.use('/api/sales', require('./routes/api/sales'));

// Serve static assets in production
if(process.env.NODE_ENV === 'production'){
    //Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`));