const boton = document.querySelector('.boton');
const entradaTexto = document.querySelector('.entradaTex');
const contenedorImput = document.getElementById('contenedor_input');
let listado = {
}

boton.addEventListener("click", (e) => {
    e.preventDefault();
    const tarea = entradaTexto.value;

    if (!tarea ) {
        alert('Se recomienda ingresar un dato');
        return;
    }

    const elementoImput = document.createElement('input');
    elementoImput.classList.add('text');
    elementoImput.type = 'text';
    elementoImput.value = tarea;
    listado[Date.now()] = tarea;
    guardarLocalStorage(listado);

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
        let elementoEditado = elementoImput.getAttribute('name');
        listado[elementoEditado]=elementoImput.value
        elementoImput.setAttribute('readonly', 'readonly');
        guardarLocalStorage(listado);
        listo.remove();
    })
    const eliminar = document.createElement('button');
    eliminar.classList.add('delete');
    eliminar.innerHTML = 'Eliminar';

    contenedorImput.appendChild(elementoImput);

    accion.appendChild(eliminar);
    contenedorImput.appendChild(accion);

    eliminar.addEventListener('click', () => {
        var elementoParaBorrar = elementoImput.getAttribute('name');
        elementoImput.remove();
        editar.remove();
        eliminar.remove();
        eliminarElemento(elementoParaBorrar, listado);
    })
    entradaTexto.value = '';


})

const extraerDataSave = async () => {
    var correo = document.getElementById("uCorreo").textContent.trim();
    const response = await fetch('./datos/' + correo )
    const data  = await response.text()
    
    console.log('data: ', data)
    extraeLocalStrona(JSON.parse(data));
}

extraerDataSave();

const extraer = document.querySelector('.extraer')
/**
 * @param {objetc} listado 
 * @param {string} textoConvertido 
 */
function guardarLocalStorage(listado) {
   const textoConvertido = JSON.stringify(listado)
   localStorage.setItem("nombre",textoConvertido );
   postArchivo(textoConvertido);
}

/**
 * 
 * @param {string} data 
 */

function extraeLocalStrona(data) {
    
    var datoNuevo = localStorage.getItem("nombre");	
    if(!datoNuevo){
	listado=data
    }else{
    listado = JSON.parse(datoNuevo);
    console.log('listado',listado);
    Object.entries(data).forEach(([key,value]) => {
        if (!listado[key]) {
            listado[key]=value;
        }
    });
    console.log('listado',listado);

    postArchivo(listado);
    }
    reconstruir(listado);
}

function reconstruir(listado) {
    console.log('si entró ala funcion de reconstruir');


    Object.entries(listado).forEach(([key, value]) => {
        const nuevoInput = document.createElement('input');
        nuevoInput.classList.add('text')
        nuevoInput.type = 'text';
        nuevoInput.setAttribute('name', key)
        nuevoInput.value = value;

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

         
    listo.addEventListener('click', (e) => {
        let elementoEditado = nuevoInput.getAttribute('name');
        listado[elementoEditado]=nuevoInput.value
        nuevoInput.setAttribute('readonly', 'readonly');
        guardarLocalStorage(listado);
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
            nuevoInput.remove();
            editar.remove();
            eliminar.remove();
            eliminarElemento(elementoParaBorrar, listado);
        })
    });

   
    console.log('salió de la funcion de reconstruir');
}
function eliminarElemento(elementoParaBorrar, listado) {
    console.log('el elemento es el numero: ' + elementoParaBorrar);

    console.log(`El elemento a borrar es ${elementoParaBorrar} y el arreglo es ${listado}`);

    delete listado[elementoParaBorrar]

    console.log('existoso');
    console.log(listado);
    guardarLocalStorage(listado)

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

async function postArchivo(listaCaracteres) {
    console.log(listaCaracteres);
    var correo = document.getElementById("uCorreo").textContent.trim();
    var usuario = {
        listaCaracteres: listaCaracteres,
        correo: correo

    };
    var cadena = JSON.stringify(usuario);
    console.log(cadena);

    const respuesta = await fetch('https://sistemas.cruzperez.com/usiel/back.php',
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: cadena
        })
        .catch(function (res) { console.log(res) })
       // .then(function (res) { console.log(res) })
       // .catch(function (res) { console.log(res) })
	console.log('respuesta', await respuesta.text() )
	
}   