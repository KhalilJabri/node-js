
// npm i -g nodemon


const express = require('express');

const app = express();

app.use(express.json()); // middleware to parse the request body

let todos = [
    { id: 1, text: 'Todo One' },
    { id: 2, text: 'Todo Two' },
    { id: 3, text: 'Todo Three' }
];

app.post('/api/todo/create', (req, res) => {
    todos.push(req.body);
    console.log(req.body);
    res.send({ 'data': todos });
});

app.get('/api/todo/all', (req, res) => {
    res.send({ 'data': todos });
});

app.put('/api/todo/update/:id', (req, res) => {
    const id = Number(req.params.id);
    todos = todos.map(todo => {
        return todo.id === id ? { ...todo, ...req.body } : todo;
    });
    res.send({ 'data': todos });
});

app.delete('/api/todo/delete/:id', (req, res) => {
    const id = Number(req.params.id);
    todos = todos.filter(todo => todo.id !== id);
    res.send({ 'data': todos });
});

app.get('/api/todo/:id', (req, res) => {
    const id = Number(req.params.id);
    let checktodo = todos.find(todo => todo.id === id);
    if(!checktodo) {
        res.status(404).send({ 'error': 'Todo not found' });
    }
    res.send({ 'data': checktodo });
});


app.get('/todo', (req, res) => {
    res.send({ 'data': todos });

});

app.get('/todo/:id', (req, res) => {
    const id = req.params.id;
    const todo = todos.find(todo => todo.id === parseInt(id));
    if (!todo) {
        res.status(404).send({ 'error': 'Todo not found' });
    }
    res.send({ 'data': todo });

});

app.get('/file', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');

});

app.get('/user/:id', (req, res) => {
    const id = req.params.id;
    res.send(`User id is ${id}`);

});

app.get('/', (req, res) => {
    res.send('Hello World!'); // accept all ypes of responses
    res.json({ sucess: 'Hello to my server' }); // accept only json responses
    res.end('welcome to my server'); // execute the request and skip the rest of the code

});

app.listen(5000, () => {
    console.log('Server is running on port', 5000);
});