let sect = document.getElementById('sect');
sect.style.background = "deepskyblue";

sect.onclick = function(){
	alert('Hola');
}

// sect.onclick = function(){ //es asíncrono se ejecturará en el futuro
// 	dihola("Miriam");
// }

const dihola = function(){
	alert('Hola');
}

//estas dos expresiones la de arriba y la de abajo dicen lo mismo

function dihola(x){
	alert('Hola ' + x);
}

//función anónima autoinvocada
(function(x){
	sect.onclick = function(){ 
	dihola(x);
	}
})("miriam");

