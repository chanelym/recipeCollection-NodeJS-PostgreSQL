require('dotenv').config();

const express = require('express');
const app = express();
const db = require('./database');
const worldMenu = require ('./models');
const path = require('path');
const port = process.env.PORT;

let message = '';

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}));

app.get('/', async (req,res) => {
	const menu = await worldMenu.findAll();
	setTimeout(() => {
        message = '';
      }, 1000);
	res.render('index.ejs', { menu : menu, message});
});

app.get('/form', (req,res) => {
	res.render('form');
});

app.post('/form', async (req, res) => {
	const { 
		recipe_name, 
		recipe_cuisine, 
		recipe_history,
		recipe_ingredients,
		recipe_prep_method, 
		recipe_image_url 
	} = req.body;

	const menu = await worldMenu.create({
		recipe_name: recipe_name,
		recipe_cuisine: recipe_cuisine, 
		recipe_history : recipe_history,
		recipe_ingredients : recipe_ingredients,
		recipe_prep_method : recipe_prep_method, 
		recipe_image_url : recipe_image_url
  	});

	message = 'New recipe successfully created!'
	res.redirect('/', );
});

app.get('/details/:id', async (req, res) => {  
	const menu = await worldMenu.findByPk(req.params.id);  
	res.render('details.ejs', { menu,  });
});

app.get('/delete/:id', async (req, res) => {  
	const menu = await worldMenu.findByPk(req.params.id);  
	
	if (!menu) {    
		res.render('/delete/:id', {      
			message: 'Recipe not Found!',    
		});
	}  
		
	await menu.destroy(); 
	message = 'Recipe successfully removed';
	
	res.redirect('/', );
});

db.connected();
app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));