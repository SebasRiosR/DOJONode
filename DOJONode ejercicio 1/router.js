function route(handle, pathname,response){
	console.log('Va a invocar la funcion para '+ pathname);
	if(typeof handle[pathname]==='function'){
		return handle[pathname](response);
	}else{
		console.log('No se encontró manipulador para '+ pathname);
		response.writeHead(404,{'content-Type':'text/html'});
		response.write('Direccion no disponible');
		response.end();
	}
}
exports.route=route;