fetch('http://www.mocky.io/v2/5ca62323340000640076af6f')
.then(function(respuesta){
	console.log('respuesta:', respuesta);
	return respuesta.json();
}).then(function(json_data){
	console.log('json_data:', json_data);
}).catch(function(error){//catch: capturar el error por si se encuentra alguno
	console.log('error:', error);
}); 

//el fetch se coneccta a la dirección de mocky.io
//cuando tenga la respuesta
//voy hacer algo con la respuesta del servidor (una función de call back)
//cuando tenga la respuesta la convierto en json
//cuando tenga el json hecho 
//haré algo con ese json
//en caso que tenga algún error 
//lo mostramos por pantalla
//Más errores: 
//aparte de la direccion también nos puede dar error si no está bien el json(este mal formado)
//no tener conexión a internet