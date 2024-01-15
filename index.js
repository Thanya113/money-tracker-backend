const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://thanyagovindaraji:GcAMlpIFON7TlYSd@cluster0.xiykhjo.mongodb.net/money-tracker?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const transactionSchema = new mongoose.Schema({
  description: String,
  amount: Number,
  type: String, // 'income' or 'expense'
});

const Transaction = mongoose.model('Transaction', transactionSchema);

app.post('/api/transactions', async (req, res) => {
  try {
    const newTransaction = new Transaction(req.body);
    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find({});
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
