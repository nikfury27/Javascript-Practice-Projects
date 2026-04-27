const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

const todoSchema = new mongoose.Schema({
    task: { type: String, required: true }
});

const Todo = mongoose.model('Todo', todoSchema);

app.get('/todos/fetch', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos.map(t => ({ id: t._id, task: t.task })));
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch todos' });
    }
});

app.post('/todos/new', async (req, res) => {
    try {
        const newTodo = new Todo({ task: req.body.task });
        await newTodo.save();
        res.json({ id: newTodo._id, task: newTodo.task });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add todo' });
    }
});

app.put('/todos/update', async (req, res) => {
    try {
        await Todo.findByIdAndUpdate(req.body.key, { task: req.body.task });
        res.json({ message: 'Updated successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update todo' });
    }
});

app.delete('/todos/deleted', async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.body.key);
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete todo' });
    }
});

app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});
