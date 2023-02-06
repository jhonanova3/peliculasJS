const formulario = document.getElementById("formulario");
const nombreInput = document.getElementById("name");
const linkInput = document.getElementById("link");
const calificacionInput = document.getElementById("calificacion");
const posterInput = document.getElementById("poster");
const filtroVistasCheck = document.getElementById("filtroVistas");
let estadoFiltroVista = false;

let listaPeliculas = []

const guardarPeliculas = () => {
    const stringPeliculas = JSON.stringify(listaPeliculas);
    localStorage.setItem("listaPeliculas", stringPeliculas);
}

const cargarPeliculas = () => {
    const stringPeliculas = localStorage.getItem("listaPeliculas");
    if (stringPeliculas) {
        listaPeliculas = JSON.parse(stringPeliculas);
        mostrarPeliculas();
    }
}

const limpiarFormulario = () => {
    nombreInput.value = "";
    linkInput.value = "";
    calificacionInput.value = "";
    posterInput.value = "";
}


const enviarFormulario = (event) => {
    event.preventDefault();
    const pelicula = {
        nombre: nombreInput.value,
        link: linkInput.value,
        calificacion: calificacionInput.value,
        poster: posterInput.value,
        estaVista: false,
    };
    listaPeliculas.push(pelicula)
    limpiarFormulario();
    mostrarPeliculas();
    guardarPeliculas();
}

const mostrarPeliculas = () => {
    const contenedorPeliculas = document.getElementById("listadoPeliculas");
    contenedorPeliculas.innerHTML = " ";
    for (let i = 0; i < listaPeliculas.length; i++) {
        if ((estadoFiltroVista && !listaPeliculas[i].estaVista) || !estadoFiltroVista) {


            contenedorPeliculas.innerHTML += `
     <div class="pelicula">
        ${listaPeliculas[i].estaVista ? `<button class="botonVisto vista" onClick="marcarVista(${i})">YA VISTA<i class="gg-eye"></i></button>` : `<button  class="botonVisto" onClick="marcarVista(${i})">PENDIENTE<i class="gg-eye"></i></button>`}
     <button class="botonQuitar" onclick="eliminarPelicula(${i})">❌</button>
     <img src="${listaPeliculas[i].poster}" alt="Poster de ${listaPeliculas[i].nombre}">
     <h4> ${listaPeliculas[i].nombre} </h4>
     <h6>${generarCorazones(listaPeliculas[i].calificacion)} </h6>
     <a href="${listaPeliculas[i].link}">Ver Pelicula</a>
   </div> `
        }
    }
}

const marcarVista = posicion => {
    listaPeliculas[posicion].estaVista = !listaPeliculas[posicion].estaVista;
    mostrarPeliculas();
    guardarPeliculas();
}

const generarCorazones = cantCorazones => {
    let puntuacion = "";
    for (let i = 0; i < 5; i++) {
        if (i < cantCorazones) {
            puntuacion += "💜";
        } else {
            puntuacion += "🖤";
        }

    }
    return puntuacion;
}

cargarPeliculas()
formulario.addEventListener("submit", enviarFormulario);


const eliminarPelicula = posicion => {
    listaPeliculas = listaPeliculas.filter((pelicula, index) => index !== posicion);
    mostrarPeliculas();
    guardarPeliculas();
}

const aplicarFiltroVistas = (evento) => {
    estadoFiltroVista = evento.target.checked;
    mostrarPeliculas();
}


filtroVistasCheck.addEventListener("click", aplicarFiltroVistas);


