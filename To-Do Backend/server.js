const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

let todos = [];

// GET all todos
app.get('/todos', (req, res) => {
    res.json(todos);
});

// ADD todo
app.post('/todos', (req, res) => {
    const newTodo = {
    id: Date.now(),
    task: req.body.task
    };

    todos.push(newTodo);
    res.json(newTodo);
});

// UPDATE todo
app.put('/todos/update', (req, res) => {
    const id = Number(req.body.key);

    todos = todos.map(todo =>
    todo.id === id ? { ...todo, task: req.body.task } : todo
    );

    res.json({ message: "Updated successfully" });
});

// DELETE todo
app.delete('/todos/deleted', (req, res) => {
    const id = Number(req.body.key);

    todos = todos.filter(todo => todo.id !== id);

    res.json({ message: "Deleted successfully" });
});

app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});