const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}));

app.get('/', function (req, res) {
	res.render('index.ejs');
});

app.get('/form', function (req, res) {
	res.render('form.ejs');
});

app.get('/details', function (req, res) {
	res.render('details.ejs');
});

app.get('/recipes/:id', function (req, res) {
	res.render('details.ejs');
});

app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));