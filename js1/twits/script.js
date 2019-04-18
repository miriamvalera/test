/*este script sería para un twit
<article>
	<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis
	 delectus soluta maxime vitae est, iste odio unde. Eligendi cumque 
	 consequuntur dolorum labore velit. Atque, corporis. Molestias sunt 
	 dolorem dignissimos quae. Lorem ipsum dolor sit amet, consectetur 
	 adipisicing elit. Porro earum facilis deleniti enim, hic culpa maxime 
	 iusto. Aspernatur unde suscipit exercitationem expedita nam alias qui 
	 ipsa autem, molestiae saepe sed!</p>
	

	<button id="suma">Me gusta</button>
	<span id="resultado"></span>
		
</article>

var contador = 0;
document.getElementById('suma').onclick = function(){
	console.log('clickando');
	contador++;
	resultado.innerHTML = ('Cantidad me gustas: ' + contador);
} */

//este script sería para más de un twit

const generarComentario = function(comentarios){
	const comentario = comentarios[Math.floor(Math.random()*comentarios.length)];
	return comentario;
}
const creadorTwit = function(){
	let twit = [];
	const comentarios = [
		'Hola, ¿estas en Barcelona?',
		'¿Te apetece tomar algo?', 
		'Deseando que llegue el viernes!!',
		'Nos vemos a las 20h'
		];

	for(i=0; i<10; i++){
		twit.push({id:i, descripcion: generarComentario(comentarios), likes:0});
	}
	console.log('Twit: ', twit);
	return twit;
}
const imprimeTwits = function(){
	const puntoAnclaje = document.getElementById('main');
	const twits = creadorTwit();
	let plantillaTwits = '';

	for(let i=0; i<twits.length; i++){
		plantillaTwits+= `
			<article>
				<p>${twits[i].descripcion}</p>
				<button class="btn-likes"><i class="far fa-heart"></i></button>
				<span>${twits[i].likes}</span>
			</article>
		`;

	}
	puntoAnclaje.innerHTML = plantillaTwits;
	//console.log(plantillaTwits); 
	document.querySelectorAll('.btn-likes').forEach(function(btn){
		//console.log(btn.parentNode);
		btn.onclick = function(){

			let like = btn.nextElementSibling.innerHTML;
			like = parseInt(like)+1;
			btn.nextElementSibling.innerHTML = like;
			btn.innerHTML = '<i class="fas fa-heart"></i>';
		}
	});
}

imprimeTwits();

