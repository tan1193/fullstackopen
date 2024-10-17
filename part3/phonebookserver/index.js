const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = 3001;

// Middleware to parse incoming request body as JSON
app.use(express.json());

morgan.token('post-data', (req) => {
    return JSON.stringify(req.body);
});

// Middleware for logging HTTP requests including POST data
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'));


// Phonebook data
let persons = [
    { id: "1", name: "Arto Hellas", number: "040-123456" },
    { id: "2", name: "Ada Lovelace", number: "39-44-5323523" },
    { id: "3", name: "Dan Abramov", number: "12-43-234345" },
    { id: "4", name: "Mary Poppendieck", number: "39-23-6423122" }
];

// Route to get all phonebook entries
app.get('/api/persons', (req, res) => {
    res.json(persons);
});

// Route to get a single phonebook entry by id
app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const person = persons.find(p => p.id === id);

    if (person) {
        res.json(person);
    } else {
        res.status(404).send({ error: 'Entry not found' });
    }
});

// Route to delete a phonebook entry by id
app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const personIndex = persons.findIndex(p => p.id === id);

    if (personIndex !== -1) {
        persons.splice(personIndex, 1);  // Remove person from array
        res.status(204).end();  // Send 204 No Content status
    } else {
        res.status(404).send({ error: 'Entry not found' });
    }
});

// Route to add a new phonebook entry
app.post('/api/persons', (req, res) => {
    const body = req.body;

    // Validate request body
    if (!body.name || !body.number) {
        return res.status(400).json({ error: 'Name or number missing' });
    }

    // Check if name already exists
    const existingPerson = persons.find(p => p.name === body.name);
    if (existingPerson) {
        return res.status(400).json({ error: 'Name must be unique' });
    }

    // Create new person with a random id
    const newPerson = {
        id: Math.floor(Math.random() * 1000000).toString(),
        name: body.name,
        number: body.number
    };

    persons.push(newPerson);
    res.status(201).json(newPerson);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
