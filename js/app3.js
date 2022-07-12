const boton = document.querySelector('.boton');
const entradaTexto = document.querySelector('.entradaTex');
const contenedorImput = document.getElementById('contenedor_input');
   const listaCaracteres = [];

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
    listaCaracteres.push(elementoImput.value);
    guardarLocalStorage(listaCaracteres);

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
   // editar.addEventListener('click', (e) => {
     //   elementoImput.removeAttribute('readonly');
       // accion.appendChild(listo);


    //})

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
//extraerDataSave();

const extraer = document.querySelector('.extraer')

function guardarLocalStorage(listaCaracteres) {
    localStorage.setItem("nombre", JSON.stringify(listaCaracteres));
    postArchivo(JSON.stringify(listaCaracteres));
}

function extraerDataSave() {
var listaCaracteres = [];
    var correo = document.getElementById("uCorreo").innerText;
    fetch('./datos/' + correo + "?" + Math.random()) //Consultar datos
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Bad status code from server.');
            }
            return response.json();
        })
        .then(function (responseData) {
            extraeLocalStrona();
            if (!(responseData.data && responseData.data.success)) {
                throw new Error('Bad response from server.');
            }
        });
    // .then(response => response.text()) //Si se obtuvieron, 
    //   .then(data => {
    // Do something with your data
    //     console.log(data);
    //    localStorage.setItem("nombre", data);
    //   extraeLocalStrona();
    //setear el localstorage
    //TODO:si no
}

extraeLocalStrona();



function extraeLocalStrona() {

    var datoNuevo = localStorage.getItem("nombre");
    listaCaracteres = JSON.parse(datoNuevo);
    reconstruir(listaCaracteres);
}

function reconstruir(listaCaracteres) {
    console.log('si entró ala funcion de reconstruir');

    contenedorImput.innerHTML = ''

    if (!listaCaracteres) return;
    var nuevaListaDeCaracteres = listaCaracteres;



    for (let i = 0; i < nuevaListaDeCaracteres.length; i++) {

        const nuevoInput = document.createElement('input');
        nuevoInput.classList.add('text')
        nuevoInput.type = 'text';
        nuevoInput.setAttribute('name', i)
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
          //  guardarLocalStorage(nuevaListaDeCaracteres)
           concole.log('listo');
            //listo.remove();
        })
        const eliminar = document.createElement('button')
        eliminar.classList.add('delete');
        eliminar.innerHTML = 'Eliminar';

        contenedorImput.appendChild(nuevoInput);

        nuevaAccion.appendChild(eliminar);
        contenedorImput.appendChild(nuevaAccion);
        eliminar.addEventListener('click', () => {
            var elementoParaBorrar = nuevoInput.getAttribute('name');
            nuevoInput.remove();
            editar.remove();
            eliminar.remove();
            eliminarElemento(elementoParaBorrar, nuevaListaDeCaracteres);
        })



    }
    console.log('salió de la funcion de reconstruir');
}
function eliminarElemento(elementoParaBorrar, nuevaListaDeCaracteres) {
    console.log('el elemento es el numero: '+elementoParaBorrar);
    
    console.log(`El elemento a borrar es ${elementoParaBorrar} y el arreglo es ${nuevaListaDeCaracteres}`);
     
    nuevaListaDeCaracteres.splice( elementoParaBorrar, 1 );
    console.log('existoso');
    console.log(nuevaListaDeCaracteres);
    guardarLocalStorage(nuevaListaDeCaracteres)

}
// const eliminar = document.querySelector('.delete');
// const editar = document.querySelector('.edit');
// const listo = document.querySelector('.done');
// const nuevoInput = document.querySelector('.text');
// eliminar.addEventListener('click', () => {
//     console.log('Holi');
//     nuevoInput.remove();
//     editar.remove();
//     eliminar.remove();



// })


function borrarUnElemento(elementoParaBorrar, listaCaracteres) {
    let inicial = listaCaracteres.indexOf(elementoParaBorrar);
    listaCaracteres.splice(inicial, 1);
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