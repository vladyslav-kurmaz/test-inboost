require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose')
const userModel = require('./user-model')

app.use(express.json());

mongoose
    .connect(process.env.CONNECT_URL_DB)
    .then(() => console.log('DB started'))
    .catch((e) => console.log('DB error'))
    
app.use(cors({
  origin: '*'
}));

// https://test-inboost.vercel.app
// http://localhost:3000

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://test-inboost.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/users', async (req, res) => {
  const data = await userModel.find()

  res.json(data);
});

app.patch('/users/:userId', async (req, res) => {
  const userId = req.params.userId;
  const updatedData = req.body;

  // Опрацьовуємо отримані дані і виконуємо оновлення на сервері
  await userModel.findOneAndUpdate({id: userId}, {notes: updatedData})
      .catch((e) => res.status(500).message("update note fai;"))
      .then(() => res.status(200).json({ success: true, message: 'Data updated successfully', data: updatedData }))

 });

app.post('/users', async (req, res) => {
  // Отримайте дані з тіла запиту

  const userData = req.body;

  // Додайте дані користувача до списку користувачів
  const doc = new userModel(userData)
  await doc.save()

  // Відправте відповідь зі статусом 201 та доданими даними
  res.status(201).json({ success: true, message: 'User created successfully', data: userData });
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log('Server is running on port 3001');
});

module.exports = app;