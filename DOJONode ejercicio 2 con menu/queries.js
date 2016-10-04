var promise = require('bluebird');

var options = {
	promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://facmbzgu:4YaeudtO6VoscLRVQQeufTBRQEwepQbW@elmer.db.elephantsql.com:5432/facmbzgu';
var db = pgp(connectionString);

function getAllRestaurants(req, res, next){
	db.any('select * from restaurant').then(function(data){
		res.status(200).json({
			status:'Exitoso',
			data:data,
			message:'Recuperados todos los restaurantes'
		});
	}).catch(function(err){
		return next(err);
	});
}

function getRestaurantByName(req, res, next){
	var name= req.params.name;
	db.any('select * from restaurant where name = $1', name).then(function(data){
		res.status(200).json({
			status:'Exitoso',
			data:data,
			message: 'Recuperados restaurantes por nombre'
		});
	}).catch(function(err){
		return next(err);
	});
}

function createRestaurant(req, res, next){
	db.none('insert into restaurant(name,city,address,phone) values($1, $2, $3, $4)',
		[req.body.name,req.body.city,req.body.address,parseInt(req.body.phone)]).then(function(){
		res.status(200).json({
			status:'Exitoso',
			message: 'Insertado un restaurante'
		});
	}).catch(function(err){
		return next(err);
	});
}


function removeRestaurant(req, res, next){
	var restaurantID= parseInt(req.params.id);
	db.result('delete from restaurant where id=$1',restaurantID).then(function(){
		res.status(200).json({
			status:'Exitoso',
			message: 'Removido un restaurante'
		});
	}).catch(function(err){
		return next(err);
	});
}


function updateRestaurant(req, res, next){
	db.none('update restaurant set name=$1, city=$2, address=$3, phone=$4 where id=$5',
		[req.body.name,req.body.city,req.body.address,parseInt(req.body.phone),parseInt(req.params.id)]).then(function(){
		res.status(200).json({
			status:'Exitoso',
			message: 'Restaurante actualizado'
		});
	}).catch(function(err){
		return next(err);
	});
}

function getAllMenus(req, res, next){
	db.any('select * from menu').then(function(data){
		res.status(200).json({
			status:'Exitoso',
			data:data,
			message:'Recuperados todos los menus'
		});
	}).catch(function(err){
		return next(err);
	});
}

function getMenuById(req, res, next){
	var id = req.params.id;
	db.any('select * from menu where id = $1', id).then(function(data){
		res.status(200).json({
			status:'Exitoso',
			data:data,
			message: 'Recuperados los menus por ID'
		});
	}).catch(function(err){
		return next(err);
	});
}

function createMenu(req, res, next){
	db.none('insert into menu(name,description,price,restaurant) values($1, $2, $3, $4)',
		[req.body.name,req.body.description,parseInt(req.body.price), parseInt(req.body.restaurant)]).then(function(){
		res.status(200).json({
			status:'Exitoso',
			message: 'Menu Insertado'
		});
	}).catch(function(err){
		return next(err);
	});
}


function removeMenu(req, res, next){
	var menuID= parseInt(req.params.id);
	db.result('delete from menu where id=$1',menuID).then(function(){
		res.status(200).json({
			status:'Exitoso',
			message: 'Menu Removido'
		});
	}).catch(function(err){
		return next(err);
	});
}


function updateMenu(req, res, next){
	db.none('update menu set name=$1, description=$2, price=$3, restaurant=$4 where id=$5',
		[req.body.name, req.body.description, parseInt(req.body.price), parseInt(req.body.restaurant), parseInt(req.params.id)]).then(function(){
		res.status(200).json({
			status:'Exitoso',
			message: 'Menu actualizado'
		});
	}).catch(function(err){
		return next(err);
	});
}

function menuPorRestaurante(req, res, next) {
	var id = req.params.id;
		db.any('select * from menu where restaurant = $1', id).then(function(data){
		res.status(200).json({
			status:'Exitoso',
			data:data,
			message: 'Recuperados los menus por restaurante'
		});
	}).catch(function(err){
		return next(err);
	});
}

module.exports={
	getAllRestaurants: getAllRestaurants,
	getRestaurantByName: getRestaurantByName,
	createRestaurant: createRestaurant,
	removeRestaurant: removeRestaurant,
	updateRestaurant: updateRestaurant,
	getAllMenus: getAllMenus,
	getMenuById: getMenuById,
	createMenu: createMenu,
	removeMenu: removeMenu,
	updateMenu: updateMenu,
	menuPorRestaurante: menuPorRestaurante
}