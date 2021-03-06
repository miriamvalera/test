const aleatorio = function (max) {
    return Math.floor(Math.random() * max);
};

const generarNombres = function (nombres) {
    return nombres[aleatorio(nombres.length)] + " " + nombres[aleatorio(nombres.length)];
};

(function (idanclaje) {//Restringimos el acceso a las funciones que hay dentro de esta función anónima, ya no se pueden invocar desde la consola por ejemplo
    const carrito_store = [];
    const mascotas_store = [];

    const generadorMascotas = function () {
        const mascotas = [];//No cambia el valor (array) pero cambian sus propiedades (elementos que contine)
        const nombres = ["missy", "rex", "perro", "bob", "luna", "max", "sebas", "ginna", "balto", "taxi"];
        for (let i = 1; i < 1001; i++) {
            mascotas.push(
                {
                    id: i,
                    nombre: generarNombres(nombres),
                    edad: { valor: 7, unidad: "años" },
                    precio: { valor: 44, unidad: "€" },
                    disponible: true
                }
            );
        }
        return mascotas;
    };

    mascotas_store=generadorMascotas();
    
    const imprimirMascotas = function (idanclaje) {
        const mascotas = mascotas_store;//generadorMascotas();
        const puntoAnclaje = document.getElementById(idanclaje);
        var plantillaMascotas = "";
        for (mascota of mascotas) {
            plantillaMascotas += `
                <li class="item-mascota">
                    <span>Id: ${mascota.id},</span>
                    <span> Nombre: ${mascota.nombre},</span>
                    <span> Edad: ${mascota.edad.valor} ${mascota.edad.unidad},</span>
                    <span> Precio: ${mascota.precio.valor} ${mascota.precio.unidad}</span>
                    <span><button data-id="${mascota.id}" data-nombre="${mascota.nombre}" data-precio="${mascota.precio.valor}" class="btn-comprar">COMPRAR</button></span><!-- Añadimos, con un atributo personalizado, la id de la mascota al boton -->
                </li>
            `;
        }
        
        puntoAnclaje.innerHTML = plantillaMascotas;
        // console.log("botones: ", document.querySelectorAll("btn-comprar"));
        document.querySelectorAll(".btn-comprar").forEach(function (unBtn) {//unBtn es cada uno de los botones, con for Each es como si los llamásemos de 1 en 1 y le asignaramos la función con el evento onclick
            const id = unBtn.getAttribute("data-id");
            const nombre = unBtn.getAttribute("data-nombre");
            const precio = unBtn.getAttribute("data-precio");

            unBtn.onclick = function () {
                const ya_added = carrito_store.includes(id);
                if (!ya_added) {
                    document.getElementById("carrito").innerHTML += nombre + ": " + precio + " €" + "</br>";
                    //this.disabled = true;
                    this.parentElement.parentElement.classList.add('seleccionado');
                    carrito_store.push(id);
                    console.log('Carrito:', carrito_store);
                    //ACTUALIZAR ESTADO DE MASCOTAS
                } else {
                    console.log('Carrito: ya estaba añadido', id);
                }
            }
        });
    };

    imprimirMascotas(idanclaje);
})("lista");
//Añadir carrito con lista, boton en verde, comprar una sola vez