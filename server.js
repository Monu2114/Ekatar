const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json()); // Move this line here

mongoose.connect('mongodb://localhost:27017/user_details', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected successfully');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Routes
app.use("/api/Auth", require("./Auth/Route"));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
