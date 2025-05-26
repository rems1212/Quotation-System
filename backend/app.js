// // app.js
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const quotationRoutes = require('./routes/quotations');
// const productRoutes = require('./routes/products');

// const app = express();



// // Middleware
// app.use(cors());
// app.use(express.json());
// const cors = require('cors');

// app.use(cors({
//   origin: "https://quotation-system-rho.vercel.app",
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));

// // Database connection
// mongoose.connect('mongodb+srv://remssuthar1213:remssuthar@cluster0.wcgnu6j.mongodb.net/interiorDesignerDB?retryWrites=true&w=majority&appName=Cluster0')

// .then(() => console.log('Connected to MongoDB Atlas'))
// .catch(err => console.error('MongoDB Atlas connection error:', err));

// // Routes
// app.use('/api/quotations', quotationRoutes);
// app.use('/api/products', productRoutes);

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Something went wrong!' });
// });

// module.exports = app;



// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const quotationRoutes = require('./routes/quotations');
const productRoutes = require('./routes/products');

const app = express();

// ✅ Middleware
app.use(cors({
  origin: "https://quotation-system-rho.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

// ✅ MongoDB Atlas Connection
mongoose.connect('mongodb+srv://remssuthar1213:remssuthar@cluster0.wcgnu6j.mongodb.net/interiorDesignerDB?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ MongoDB Atlas connection error:', err));

// ✅ Routes
app.use('/api/quotations', quotationRoutes);
app.use('/api/products', productRoutes);

// ✅ Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

module.exports = app;
