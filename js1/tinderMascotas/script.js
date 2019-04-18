let mascotas = [];
let favoritos = [];

const buscarPosicion = function(id){
	for (var i = 0; i < mascotas.length; i++) {
		if (mascotas[i].id == id) {
			return i;
		}
	}
}
const imprimirMascotas = function(pos){
	if (pos == undefined) {
		pos = 0;
	}
	//console.log(pos)
	const puntoAnclaje = document.getElementById('candidate');
	var plantillaMascotas =`
			<figure>
				<figcaption>${mascotas[pos].nombre}</figcaption>
				<img src="${mascotas[pos].foto}">	
			</figure>
			
	`;
	let corazon = "far";
	if(favoritos.includes(mascotas[pos].id)){
		corazon = "fas";
	}

	if (pos == 0) {
		plantillaMascotas +=`
			<div id="selector">
				<i></i>
				<i class="`+corazon+` fa-heart" data-id="${mascotas[pos].id}"></i>
				<i class="fas fa-chevron-right" data-id="${mascotas[pos].id}"></i>
			</div>

		`;
	}else if (pos == mascotas.length-1){
		plantillaMascotas +=`
			<div id="selector">
				<i class="fas fa-chevron-left" data-id="${mascotas[pos].id}"></i>
				<i class="`+corazon+` fa-heart" data-id="${mascotas[pos].id}"></i>
				<i></i>
			</div>

		`;
	}else{
		plantillaMascotas +=`
			<div id="selector">
				<i class="fas fa-chevron-left" data-id="${mascotas[pos].id}"></i>
				<i class="`+corazon+` fa-heart" data-id="${mascotas[pos].id}"></i>
				<i class="fas fa-chevron-right" data-id="${mascotas[pos].id}"></i>
			</div>

		`;
	}

	puntoAnclaje.innerHTML = plantillaMascotas;

	document.querySelectorAll(".fa-chevron-right").forEach(function (derecha) {
		derecha.onclick = function(){
			let id = parseInt(derecha.getAttribute("data-id"));
			let pos = buscarPosicion(id);
			//Comprobar si hay mas : 
			if (pos<mascotas.length) {
				imprimirMascotas(pos+1);
			}	
		}
	})
	document.querySelectorAll(".fa-chevron-left").forEach(function (izq) {
		izq.onclick = function(){
			let id = parseInt(izq.getAttribute("data-id"));
			let pos = buscarPosicion(id);
			//Comprobar si hay mas : 
			if (pos>0) {
				imprimirMascotas(pos-1);
			}	
		}
	})
	document.querySelectorAll(".fa-heart").forEach(function (like) {
		like.onclick = function(){
			document.getElementById('favs').classList.add('visible');	
			let id = parseInt(like.getAttribute("data-id"));
			let pos = buscarPosicion(id);
			const puntoAnclaje2 = document.getElementById('likes');
			let imprimirPlantilla = "";
			//Añadir al array de favs el elemento de la posicion pos y hacer innerhtml
			const ya_added = favoritos.includes(id);
			console.log(pos,ya_added, favoritos);
			if(!ya_added){
				imprimirPlantilla += `
					<tr>
						<td><img src="${mascotas[pos].foto}"></td>
						<td>${mascotas[pos].nombre}</td>
						<td>${mascotas[pos].edad}</td>
					</tr>
				`;
				favoritos.push(id);
				puntoAnclaje2.innerHTML += imprimirPlantilla;
			}else{
				console.log("Ya está en favoritos");
			}
			
		}
	})
}
//Hacerlo en el css
// if (favoritos.length == 0) {
// 	document.getElementById('F').style.visibility = "hidden";	
// }

fetch('http://www.mocky.io/v2/5ca904223700003e00492e25')
.then(function(respuesta){
	//console.log('respuesta:', respuesta);
	return respuesta.json();
}).then(function(json_data){
	//console.log('json_data:', json_data);
	mascotas = json_data;
	imprimirMascotas();

}).catch(function(error){
	console.log('error:', error);
}); 

/*
1. Hemos hecho datos.json que serán los datos que hemos hecho y los hemos subido al recurso en la página mocky.io
2. Hemos hecho el fetch que es la petición al AJAX, a partir del fetch cuando es .then recoge la respuesta y 
pasamos está respuesta al array de mascotas y llamamos a la función de imprimirMascotas que leerá el array y hará
lo que tenga que hacer.
3.ImprimirMascotas(), ha este nos llega una posición, en el caso que no nos llegue será un defined, entonces con un
IF comprobamos esto y le asignamos el valor inicial, que es 0.
4.Definir un puntoAnclaje que es donde apuntamos la variable donde meteremos la información, és decir, esto apuntará al
elemento div donde meteremos la variable plantilla que contendrá el html que queremos meter.
5.En función de la posición mostraremos unos elementos u otros, por ejemplo si estamos en la útlima posición no mostraremos
la flecha de next ya que no hay más datos..
6.Una vez definidos la plantilla y los datos le inyectamos el HTML al puntoAnclaje
7.Añadir 3 onclicks a 3 elementos
7.1- Función 1: está función se añade al elemento flecha derecha, 
	7.1.1- Primero asignamos el onclick al elemento
	7.1.2- Cogemos su atributo id y lo asignamos a una variable 
	7.1.3- Obtenemos la posición de está id llamando a la función buscarPosicion
	7.1.4- Una vez tenemos la posición, llamamos a imprimirMascotas para volver a inyectar el código con la posición que toca
7.2- Función 2: está función se añade al elemento flecha izquierda, 
	7.2.1- Primero asignamos el onclick al elemento
	7.2.2- Cogemos su atributo id y lo asignamos a una variable 
	7.2.3- Obtenemos la posición de está id llamando a la función buscarPosicion
	7.2.4- Una vez tenemos la posición, llamamos a imprimirMascotas para volver a inyectar el código con la posición que toca
7.3- Función 3: se trata en añadir al array de favoritos (favoritos) que es el objetivo global el elemento mostrado
	7.3.1- Primero asignamos el onclick al elemento del corazón
	7.3.2- Cogemos su atributo id y lo asignamos a una variable 
	7.3.3- Buscamos su posición con la función
	7.3.4- Asignamos a una variable el puntoAnclaje2 donde meteremos información
	7.3.4- Creamos una variable imprimirPlantilla que será la variable que inyectaremos en el puntoAnclaje2
	7.3.5- Añadimos una variable que valdrá lo que retorne la función .includes, que está función comprueba si en el array
	ya existe un valor con el parámetro que le pasamos, en este caso la id
	7.3.6- En el caso que salga false, es que no está añadido, entonces procedemos a añadir al array (push) y a inyectar el 
	HTML (innerHTML) 


*/

/*
Mejoras:
Hacer la función arriba que engloba a todo el códgio es para encapsular hace una burbuja al código así nadie puede modificar ni ver tu código
Recomendable que la plantilla sea única

$ Ejecutar expresiones de un javascript en un html


código alternario
exp?verdad;falso

es lo mismo que:
if(exp) verdad;
else falso; 
*/