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

	if (!recipe_name) {
		res.render('/form', {
			message : 'Recipe Name is Required'
		});
	}

	if (!recipe_cuisine) {
		res.render('/form', {
			message : 'Recipe Origin is Required',
		});
	}

	if (!recipe_history) {
		res.render('/form', {
			message : 'Recipe History is Required',
		});
	}

	if (!recipe_ingredients) {
		res.render('/form', {
			message : 'Recipe Ingredients is Required',
		});
	}

	if (!recipe_prep_method) {
		res.render('/form', {
			message : 'Recipe Prep Method is Required',
		});
	}

	if (!recipe_image_url) {
		res.render('/form', {
			message : 'Recipe Pic is Required',
		});
	}

	try {
		const menu = await worldMenu.create({
			recipe_name: recipe_name,
			recipe_cuisine: recipe_cuisine, 
			recipe_history : recipe_history,
			recipe_ingredients : recipe_ingredients,
			recipe_prep_method : recipe_prep_method,
			recipe_image_url : recipe_image_url
		}) 
		message = 'Recipe successfully created';

	res.redirect('/');  
	} catch (err) {    
		console.log(err);    
		
		res.redirect('/', {      
		message : 'We Have a Problem!',    
	});  
}});


app.get('/details/:id', async (req, res) => {  
	const menu = await worldMenu.findByPk(req.params.id);  
	res.render('details.ejs', { menu,  });
});

app.get('/edit/:id', async (req, res) => {
    const menu = await worldMenu.findByPk(req.params.id);
    res.render('edit.ejs', { menu : menu, });
});

app.post('/edit/:id', async (req,res) =>{
    const menu = await worldMenu.findByPk(req.params.id);
    const { 
		recipe_name, 
		recipe_cuisine, 
		recipe_history,
		recipe_ingredients,
		recipe_prep_method, 
		recipe_image_url 
	} = req.body;
    
    menu.recipe_name = recipe_name;
	menu.recipe_cuisine = recipe_cuisine;
	menu.recipe_history = recipe_history;
	menu.recipe_ingredients = recipe_ingredients;
	menu.recipe_prep_method = recipe_prep_method; 
	menu.recipe_image_url = recipe_image_url;

    await menu.save();
	message = 'Recipe successfully edited';

    res.redirect('/');
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

app.get('/about' , (req,res) => {
	res.render('about.ejs', )
}); 

db.connected();
app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));