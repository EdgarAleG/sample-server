const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: false,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
  {
    id: 4,
    content: "te amo mucho Virginia 💖💖",
    important: true,
  }
];

const generateId = () => {
  const maxId = notes.length > 0 
    ? Math.max(...notes.map(n => n.id))
    : 0;
  return maxId + 1;
}

app.get("/", (request, response) => {
  response.send("<h1>Hola Virginia, te amo mucho</h1>");
});

app.get("/api/notes", (resquest, response) => {
  response.json(notes);
});

app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((item) => item.id === id);
  if (note) {
    response.json(note);
  } else {
    response.statusMessage = "page not found";
    response.status(404).end();
  }
});

app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter(item => item.id !== id)
  response.status(204).end();
})

app.post("/api/notes", (request, response) => {
  const body = request.body;

  if(!note.content) {
    return response.status(400).json({
      error: "content missing"
    })
  }

  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId(),
  }

  notes = notes.concat(note);

  console.log(note);
  response.json(note);
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server runing on port ${PORT}`);
});
