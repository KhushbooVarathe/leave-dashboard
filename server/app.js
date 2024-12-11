const express = require('express');
const path = require('path');
require('./db_Config/index');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const cors = require('cors');
const app = express();
const empRoutes  = require('./routes/empRoutes');
const authRoutes  = require('./routes/authRoutes');

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));

// app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', authRoutes);
app.use('/api', empRoutes);
// app.use((req, res, next) => {
//   res.status(404).send('Page not found!');
// });

 
const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
