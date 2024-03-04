

// variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');


//  Contendor para los resultados
const resultado = document.querySelector('#resultado');

const max = new Date().getFullYear('#year');
const min = max - 10;

// Generar un objeto con la busqueda
const datosBusqueda = {
    marca : '',
    year : '',
    minimo : '',
    maximo : '',
    puertas : '',
    transmision : '',
    color : '',
}
 
// eventos
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos); //muestra los autos al cargar

    //lena las opciones de años
    llenarSelect()

}) 

// Event listener para los select de busqueda
marca.addEventListener('change', e =>{
    datosBusqueda.marca = e.target.value;

    filtrarAuto();
});

year.addEventListener('change', e =>{
    datosBusqueda.year = parseInt(e.target.value);

    filtrarAuto();
});

minimo.addEventListener('change', e =>{
    datosBusqueda.minimo = parseInt(e.target.value);

    filtrarAuto();
});

maximo.addEventListener('change', e =>{
    datosBusqueda.maximo = parseInt(e.target.value);

    filtrarAuto();
});


puertas.addEventListener('change', e =>{
    datosBusqueda.puertas = parseInt(e.target.value);

    filtrarAuto();
});

transmision.addEventListener('change', e =>{
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
});

color.addEventListener('change', e =>{
    datosBusqueda.color = e.target.value;
    filtrarAuto();

    console.log(datosBusqueda);
});



function mostrarAutos(autos) {
    limipiarHTML();
    autos.forEach(auto => {
        const { marca, modelo, year, puertas, transmision, precio, color } = auto;
        const autoHTML = document.createElement('p');

        autoHTML.innerHTML = `
            ${marca} ${modelo} - ${year} - ${puertas} PUERTAS - TRANSMISIÓN:${transmision.toUpperCase()} - PRECIO:${precio} - COLOR:${color.toUpperCase()}
        `;

        // insertar el HTML en el elemento resultado
        resultado.appendChild(autoHTML);
    });
}


// limipiar html 

function limipiarHTML() {
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

//Genera los años del select
function llenarSelect() {
    // Supongamos que max, min y year están definidos correctamente
    const selectElement = document.getElementById('year'); // Asumiendo que year es el ID del elemento select

    if (!selectElement) {
        console.error("No se encontró el elemento select con el ID 'year'");
        return;
    }

    for (let i = max; i >= min; i--) {
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        selectElement.appendChild(opcion);
    }
}


// Function que filtra una base a la busqueda

function filtrarAuto(){
    const resultado = autos.filter( filtrarMarca ).filter( filtrarYear ).filter(filtrarMinimo).filter( filtrarMaximo ).filter(filtrarPuertas).filter( filtrarTransmision ).filter(filtrarColor)
    // mostrarAutos(resultado);

    if(resultado.length){
        mostrarAutos(resultado);
    }else{
        noResultado();
    }
}

function noResultado(){

    limipiarHTML();
    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta','error');
    noResultado.textContent = 'No hay resultado, Intenta con otros términos de búsqueda';
    resultado.appendChild(noResultado)
}

function filtrarMarca(auto){
    const { marca } = datosBusqueda;
    if( marca ) {
        return auto.marca === marca;
    }
    return auto;
}


function filtrarYear(auto){
    const{year} = datosBusqueda;

    if(year){
        return auto.year === year;
    }
    return auto
}

function filtrarMinimo(auto){
    const{ minimo } = datosBusqueda;

    if( minimo ){
        return auto.precio >= minimo;
    }
    return auto;
}

function filtrarMaximo(auto){
    const{ maximo } = datosBusqueda;

    if( maximo ){
        return auto.precio <= maximo;
    }
    return auto;
}

function filtrarPuertas(auto){
    const{ puertas } = datosBusqueda;
    if( puertas ){
        return auto.puertas === puertas;
    }
    return auto;
}

function filtrarTransmision(auto){
    const{ transmision } = datosBusqueda;
    if( transmision ){
        return auto.transmision === transmision;
    }
    return auto;
}

function filtrarColor(auto){
    const{ color } = datosBusqueda;
    if( color ){
        return auto.color === color;
    }
    return auto;
}