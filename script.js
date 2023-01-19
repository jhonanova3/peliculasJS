const formulario = document.getElementById("formulario");
const nombreInput = document.getElementById("name");
const linkInput = document.getElementById("link");
const calificacionInput = document.getElementById("calificacion");
const posterInput = document.getElementById("poster");

let listaPeliculas = []

const guardarPeliculas = () => {
    const stringPeliculas = JSON.stringify(listaPeliculas);
    localStorage.setItem("listaPeliculas", stringPeliculas);
}

const cargarPeliculas = () => {
    const stringPeliculas = localStorage.getItem("listaPeliculas");
    if(stringPeliculas) {
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
        poster: posterInput.value
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
     contenedorPeliculas.innerHTML += `
     <div class="pelicula">
     <img src="${listaPeliculas[i].poster}" alt="Poster de ${listaPeliculas[i].nombre}">
     <h4> ${listaPeliculas[i].nombre} </h4>
     <h6>${listaPeliculas[i].calificacion} /10</h6>
     <a href="${listaPeliculas[i].link}">Ver Pelicula</a>
   </div> `
        
    }
}

cargarPeliculas()
formulario.addEventListener("submit", enviarFormulario);



