const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8080;

app.use(bodyParser.json());

let posts = [
  { id: 1, title: 'TestPost1', content: 'Text1' },
  { id: 2, title: 'TestPost2', content: 'Text2' },
];

//Ziskat vsechny posty
app.get('/posts', (req, res) => {
  res.json(posts);
});

//Ziskat post podle id
app.get('/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find((p) => p.id === postId);

  if (!post) {
    res.status(404).json({ error: 'Post nenalezen' });
  } else {
    res.json(post);
  }
});

//Vytvorit post
app.post('/posts', (req, res) => {
  const { title, content } = req.body;
  const newPost = { id: posts.length + 1, title, content };
  posts.push(newPost);
  res.status(201).json(newPost);
});

//Updatnout post
app.put('/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find((p) => p.id === postId);

  if (!post) {
    res.status(404).json({ error: 'Post nenalezen' });
  } else {
    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    res.json(post);
  }
});

//Smazat post
app.delete('/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  posts = posts.filter((p) => p.id !== postId);
  res.json({ message: 'Post uspesne smazan' });
});

app.listen(PORT, () => {
  console.log(`Server bezi na http://localhost:${PORT}`);
});
