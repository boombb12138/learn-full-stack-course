const { request, response } = require("express");
const express = require("express");
const app = express();

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello</h1>");
});
app.get("/api/persons", (request, response) => {
  response.json(persons);
});
app.get("/info", (request, response) => {
  const info = {
    number: persons.length,
    date: new Date(),
  };
  response.send(`<p>Phonebook has info for ${info.number} people</p>
 
  <p>${info.date}</p>
  `);
});
app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id == id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0; //找到notes中最大的id
  console.log("Math.random() * 1000", Math.round(Math.random() * 1000));
  return Math.max(Math.round(Math.random() * 1000), maxId + 1);
};
app.use(express.json());
app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.number) {
    return response.status(400).json({
      error: "number missing",
    });
  }
  if (!body.name) {
    return response.status(400).json({
      error: "name missing",
    });
  }
  const person = {
    number: body.number,
    name: body.name,
    id: generateId(),
  };
  persons = persons.concat(person); //concat合并两个或多个数组,返回新数组
  response.json(person);
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
