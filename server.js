const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/article');
const articleRouter = require('./routes/articles');
const methodOverride = require('method-override');
const app = express();

mongoose.connect('mongodb://localhost/project-fair', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));


app.get('/', (req, res) => {
  res.render('login.ejs');
})

app.post('/login', (req, res) => {
  // const email = req.body.email;
  // const password = req.body.password;


  const {email, password} = req.body;
  console.log(email, '  space   ', password);
  // console.log(req.originalUrl); 
  
  if (password === 11) {
    res.render('login.ejs');
  } else {
    res.send('Oh!');
  }
})

app.get('/register', (req, res) => {
  res.render('register.ejs');
})

app.post('/create-new-user', (req, res) => {
  const {username, ins_id, semester, course, email, password} = req.body;

  console.log(username);
  console.log(ins_id);
  console.log(semester);
  console.log(course);
  console.log(email);
  console.log(password);
  
  res.send('registration complete. You are good to go.');
  
})

app.get('/student', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' });
  res.render('student_views/studentHomePage', { articles });
})

app.get('/management', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' });

  if (articles) {
    res.render('articles/index', { articles });
  } else {
    res.send('No projects submited yet!');
  }
});

app.use('/articles', articleRouter);

const port = process.env.PORT | 3000;

app.listen(port, () => console.log(`server is listening at ${port}`));
