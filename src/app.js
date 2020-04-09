const express = require('express');
const cors = require('cors');

const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get('/repositories', (request, response) => {
  return response.json(repositories);
});

app.post('/repositories', (request, response) => {
  const { url, title, techs } = request.body;

  const repository = {
    id: uuid(),
    likes: 0,
    url,
    title,
    techs,
  };

  repositories.push(repository);

  return response.status(200).json(repository);
});

app.put('/repositories/:id', (request, response) => {
  const { id } = request.params;
  const { url, title, techs } = request.body;

  const index = repositories.findIndex((repo) => repo.id === id);

  if (index < 0) {
    return response.status(400).json({ error: 'Repository not found' });
  }

  repositories[index].url = url || repositories[index].url;
  repositories[index].title = title || repositories[index].title;
  repositories[index].techs = techs || repositories[index].techs;

  return response.status(200).json(repositories[index]);
});

app.delete('/repositories/:id', (request, response) => {
  const { id } = request.params;

  const index = repositories.findIndex((repo) => repo.id === id);

  if (index < 0) {
    return response.status(400).json({ error: 'Repository not found' });
  }

  repositories.splice(index, 1);

  return response.status(204).json();
});

app.post('/repositories/:id/like', (request, response) => {
  const { id } = request.params;

  const index = repositories.findIndex((repo) => repo.id === id);

  if (index < 0) {
    return response.status(400).json({ error: 'Repository not found' });
  }

  repositories[index].likes++;

  return response.status(200).json(repositories[index]);
});

module.exports = app;
