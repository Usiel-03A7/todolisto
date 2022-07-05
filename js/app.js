const boton = document.querySelector('.boton');
const entradaTexto = document.querySelector('.entradaTex');
const contenedorImput = document.getElementById('contenedor_input');
var listaCaracteres = [];

boton.addEventListener("click", (e) => {
    e.preventDefault();
    const tarea = entradaTexto.value;

    if (!tarea) {
        alert('Se recomienda ingresar un dato');
        return;
    }

    const elementoImput = document.createElement('input');
    elementoImput.classList.add('text');
    elementoImput.type = 'text';
    elementoImput.value = tarea;
    guardarLocalStorage(elementoImput.value);

    elementoImput.setAttribute('readonly', 'readonly');



    const accion = document.createElement('div')
    accion.classList.add('actions');

    const editar = document.createElement('button')
    editar.type = 'submit';
    editar.classList.add('edit');
    editar.innerHTML = 'Editar';
    const listo = document.createElement('button')
    listo.classList.add('done');
    listo.type = 'submit';
    listo.innerHTML = 'listo';

    accion.appendChild(editar);
    editar.addEventListener('click', (e) => {
        elementoImput.removeAttribute('readonly');
        accion.appendChild(listo);


    })

    elementoImput.setAttribute('readonly', 'readonly');


    listo.addEventListener('click', (e) => {

        elementoImput.setAttribute('readonly', 'readonly');
        guardarLocalStorage(elementoImput.value);
        listo.remove();
    })
    const eliminar = document.createElement('button');
    eliminar.classList.add('delete');
    eliminar.innerHTML = 'Eliminar';

    contenedorImput.appendChild(elementoImput);

    accion.appendChild(eliminar);
    contenedorImput.appendChild(accion);

    eliminar.addEventListener('click', () => {
        elementoImput.remove();
        editar.remove();
        eliminar.remove();
        listo.remove();
    })
    entradaTexto.value = '';


})
extraerDataSave();

const extraer = document.querySelector('.extraer')
extraer.addEventListener('click', () => {

    //extraeLocalStrona();
    extraerDataSave();


})
function guardarLocalStorage(elementoImput) {
    listaCaracteres.push(elementoImput);
    localStorage.setItem("nombre", JSON.stringify(listaCaracteres));
    postArchivo(JSON.stringify(listaCaracteres));
}

function extraerDataSave() {
    var x;
    var correo = document.getElementById("uCorreo").innerText;
    fetch('./datos/' + correo + "?" + Math.random()) //Consultar datos
        .then(response => response.text()) //Si se obtuvieron, 
        .then(data => {
            // Do something with your data
            console.log(data);
            localStorage.setItem("nombre", data);
            extraeLocalStrona();
            //setear el localstorage
        });					//TODO:si no

    extraeLocalStrona();

}

function extraeLocalStrona() {

    var datoNuevo = localStorage.getItem("nombre");
    listaCaracteres = JSON.parse(datoNuevo);
    reconstruir(listaCaracteres);
}

function reconstruir(listaCaracteres) {
    let cont = 0;

    contenedorImput.innerHTML = ''

    if (!listaCaracteres) return;
    var nuevaListaDeCaracteres = listaCaracteres;



    for (let i = 0; i < nuevaListaDeCaracteres.length; i++) {

        const nuevoInput = document.createElement('input');
        nuevoInput.classList.add('text')
        nuevoInput.type = 'text';
	nuevoInput.setAttribute('name',i)
        nuevoInput.value = nuevaListaDeCaracteres[i];
	
        nuevoInput.setAttribute('readonly', 'readonly')



        const nuevaAccion = document.createElement('div')
        nuevaAccion.classList.add('actions')

        const editar = document.createElement('button')
        editar.type = 'submit';
        editar.classList.add('edit');
        editar.innerHTML = 'Editar';
        const listo = document.createElement('button')
        listo.classList.add('done')
        listo.type = 'submit';
        listo.innerHTML = 'listo';

        nuevaAccion.appendChild(editar);
        editar.addEventListener('click', (e) => {
            nuevoInput.removeAttribute('readonly');
            nuevaAccion.appendChild(listo);



        })

        nuevoInput.setAttribute('readonly', 'readonly');


        listo.addEventListener('click', (e) => {

            nuevoInput.setAttribute('readonly', 'readonly');
            guardarLocalStorage(nuevoInput.value);
            listo.remove();
        })
        const eliminar = document.createElement('button')
        eliminar.classList.add('delete');
        eliminar.innerHTML = 'Eliminar';

        contenedorImput.appendChild(nuevoInput);

        nuevaAccion.appendChild(eliminar);
        contenedorImput.appendChild(nuevaAccion);

        eliminar.addEventListener('click', () => {
            var elementoParaBorrar = nuevoInput.getAttribute('name');
            borrarUnElemento(elementoParaBorrar,listaCaracteres);
            nuevoInput.remove();
            editar.remove();
            eliminar.remove();
            listo.remove();
        })

    }
}
function borrarUnElemento(elementoParaBorrar,listaCaracteres) {
	let inicial = listaCaracteres.indexOf(elementoParaBorrar);
        listaCaracteres.splice(inicial ,1);
	console.log(listaCaracteres);

}

function postArchivo(listaCaracteres) {
    var correo = document.getElementById("uCorreo").innerText;
    var usuario = {
        listaCaracteres: listaCaracteres,
        correo: correo

    };
    var cadena = JSON.stringify(usuario);
    console.log(cadena);

    fetch('https://sistemas.cruzperez.com/usiel/back.php',
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: cadena
        })
        .then(function (res) { console.log(res) })
        .catch(function (res) { console.log(res) })
}