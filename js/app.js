// * Se definen las variables
const proyectos = [
    {
        categoria: "Desarrollo web",
        titulo: "MAYSE S.A.S.",
        imagen: "./src/carrousel/mayse_page.png",
        descripcion: "Mucho más que una plantilla: un sitio web con identidad visual propia, construido a partir de los colores, el logo, los servicios y los productos de la empresa. Evoluciona de forma constante con mejoras y nuevas funcionalidades pensadas para cada temporada.",
        tecnologias: ["HTML", "CSS", "JavaScript", "Bootstrap"],
        link: "https://mayse.co"
    },
    {
        categoria: "Hackathon | Desarrollo web",
        titulo: "Dulce Capricho",
        imagen: "./src/carrousel/dulce_capricho_page.png",
        descripcion: "Landing page creada en equipo durante el Hackathon de Generation para un emprendimiento de cupcakes y postres. Su identidad visual nace de los productos: colores y logo protagonistas para antojar a primera vista y convertir visitas en compras.",
        tecnologias: ["HTML", "CSS", "JavaScript", "Bootstrap"],
        link: "https://nyckveramon-dotcom.github.io/Hackaton-Lading-Page/"
    },
    {
        categoria: "Proyecto Full Stack",
        titulo: "BoronVino",
        imagen: "./src/carrousel/boronvino_page.png",
        descripcion: "Tienda en línea full stack construida en equipo, donde todos desarrollamos, rotamos tareas y conocemos cada parte del proyecto. Yo lidero la integración y la revisión del código, sumando gestión de productos, carrito de compras y backend con Java y Spring Boot.",
        tecnologias: ["HTML", "CSS", "JavaScript", "Bootstrap", "Java", "Spring Boot"],
        link: "https://soymichalle.github.io/FrontEndProyectoFinalEquipo8/index.html"
    },
    {
        categoria: "Proyecto individual",
        titulo: "Planificador Web",
        imagen: "./src/carrousel/planificador_page.png",
        descripcion: "Proyecto individual para poner orden al caos: organiza tus actividades, gestiona tareas y planifica tus pendientes en una interfaz intuitiva. Tus datos se guardan en el navegador con LocalStorage, así tu lista siempre está lista cuando vuelves.",
        tecnologias: ["HTML", "CSS", "JavaScript", "Bootstrap", "LocalStorage"],
        link: "https://soymichalle.github.io/Planificador-Tareas/"
    }
];

// * Se realiza la selección de elementos del DOM
const proyectoCategoria = document.querySelector("#proyecto-categoria");
const hero = document.querySelector("#proyectos");
const proyectoTitulo = document.querySelector("#proyecto-titulo");
const proyectoDescripcion = document.querySelector("#proyecto-descripcion");
const proyectoTecnologias = document.querySelector(".tecnologias");
const proyectoLink = document.querySelector("#proyecto-link");

// * Se captura contenedor de las tarjetas
const proyectoCarousel = document.querySelector(".proyecto-carousel");

// * Se capturan botones de navegación
const btnPrev = document.querySelector("#proyecto-prev");
const btnNext = document.querySelector("#proyecto-next");

// * Se define el proyecto inicial del carrusel
let proyectoActual = 0;

// * Función para animar el cambio de fondo
function cambiarFondo(indice) {

    const imagenSeleccionada = proyectos[indice].imagen;
    const rutaCompleta = new URL(imagenSeleccionada, document.baseURI).href;

    // * Se comprueba si la imagen existe
    const imagen = new Image();

    imagen.onload = () => {
        hero.style.setProperty(
            "--hero-image",
            `url("${rutaCompleta}")`
        );
    };

    imagen.onerror = () => {
        console.error("No se pudo cargar la imagen:", rutaCompleta);
    };

    imagen.src = rutaCompleta;

    hero.classList.remove("expandir-fondo");
    void hero.offsetWidth;
    hero.classList.add("expandir-fondo");
}

// * Función para mostrar información del profeyco
function mostrarProyecto(indice) {

    // * Se obtiene información del proyecto
    const proyecto = proyectos[indice];

    // * Se actualizan textos
    proyectoCategoria.textContent = proyecto.categoria;
    proyectoTitulo.textContent = proyecto.titulo;
    proyectoDescripcion.textContent = proyecto.descripcion;

    // * Se actualizan tecnologías
    mostrarTecnologias(proyecto.tecnologias);

    // * Se actualiza botón
    mostrarBoton(proyecto);

    // * Se hace focus en la primera tarjeta
    const tarjetasActuales = proyectoCarousel.querySelectorAll(".proyecto-card");

    tarjetasActuales.forEach((card, i) => {
        card.classList.toggle("active", i === 0);
    });

    // * Se actualiza imagen de fondo
    cambiarFondo(indice);
}

// * Función para mostrar las tecnologias array
function mostrarTecnologias(tecnologias) {

    // * Se limpian tecnologías anteriores
    proyectoTecnologias.innerHTML = "";

    // * Se crear un span por cada tecnología
    tecnologias.forEach(tecnologia => {

        const etiqueta = document.createElement("span");
        etiqueta.textContent = tecnologia;
        proyectoTecnologias.appendChild(etiqueta);
    });
}

// * Función para actualizar link de direccion al proyecto
function mostrarBoton(proyecto) {

    // * Se actualizan destino del enlace
    proyectoLink.href = proyecto.link;

    // * Se abre en una nueva pestaña
    proyectoLink.target = "_blank";
    proyectoLink.rel = "noopener noreferrer"; // * bien segurito por aqui
}

// * Siguiente proyecto
btnNext.addEventListener("click", () => {

    proyectoActual = (proyectoActual + 1) % proyectos.length;

    // * Se mueve la primera tarjeta al final
    proyectoCarousel.appendChild(proyectoCarousel.firstElementChild);
    mostrarProyecto(proyectoActual);
});

// * Proyecto anterior
btnPrev.addEventListener("click", () => {

    proyectoActual = (proyectoActual - 1 + proyectos.length) % proyectos.length;

    // * Se mueve última tarjeta al principio
    proyectoCarousel.prepend(proyectoCarousel.lastElementChild);
    mostrarProyecto(proyectoActual);
});

// * Evento para cambiar al proyecto seleccionado con el mouse
proyectoCarousel.addEventListener("click", (event) => {

    const tarjetaSeleccionada = event.target.closest(".proyecto-card");
    if (!tarjetaSeleccionada) return;

    // * Se identifica proyecto seleccionado
    const indice = Number(tarjetaSeleccionada.dataset.proyecto);

    // * Se calcula desplazamiento
    const desplazamiento = (
        indice - proyectoActual + proyectos.length
    ) % proyectos.length;

    // * Se reorganizan tarjetas
    for (let i = 0; i < desplazamiento; i++) {
        proyectoCarousel.appendChild(proyectoCarousel.firstElementChild);
    }

    mostrarProyecto(proyectoActual);
});

mostrarProyecto(proyectoActual);