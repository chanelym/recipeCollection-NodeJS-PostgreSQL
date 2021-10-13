require('dotenv').config();

const express = require('express');
const app = express();
const db = require('./database');
const worldMenu = require ('./models');
const path = require('path');
const port = process.env.PORT;

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}));

app.get('/', async (req,res) => {
	const menu = await worldMenu.findAll();
	res.render('index.ejs', { menu : menu, });
});

app.get('/menu', async (req,res) => {
    const menu = await worldMenu.findAll();
    res.json(menu);
});

app.get('/form', function (req, res) {
	res.render('form.ejs');
});

app.get("/details/:id", async (req, res) => {  
	const menu = await worldMenu.findByPk(req.params.id);  
	res.render("details.ejs", { menu,  });
});

db.connected();
app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));