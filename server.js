const express = require('express');
const cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose');
require('dotenv').config();

const File = require('./models/File');
const app = express();

// Middleware
app.use(cors());
app.use(express.static('public'));

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("📦 Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB error", err));

// Multer setup
const upload = multer({ dest: 'uploads/' });

// Serve HTML page
app.get('/', (req, res) => {
  res.sendFile(__dirname + './index.html');
});

// API endpoint
app.post('/api/fileanalyse', upload.single('upfile'), async (req, res) => {
  const { originalname, mimetype, size } = req.file;

  const fileDoc = new File({
    name: originalname,
    type: mimetype,
    size: size
  });

  await fileDoc.save();

  res.json({
    name: originalname,
    type: mimetype,
    size: size
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT}`);
});
