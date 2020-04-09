const express = require('express');

const db = require('./src/db');

const app = express();
const PORT = process.env.PORT || 5000;

db.connect();

app.use(express.json());

app.get('/', (req, res) => res.send('API running...'));
app.use('/api/users', require('./src/routes/users'));
app.use('/api/profiles', require('./src/routes/profile'));
app.use('/api/posts', require('./src/routes/posts'));
app.use('/api/auth', require('./src/routes/auth'));

app.listen(PORT, () => console.log(`Server running at port ${PORT}`) );