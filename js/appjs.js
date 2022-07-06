const boton = document.querySelector('.boton');
const entradaTex = document.querySelector('.entradaTex');
const contenedor_input = document.getElementById('contenedor_input');
var arregloCaracteres = [];

boton.addEventListener("click", (e) => {
    e.preventDefault();
    const tarea = entradaTex.value;
//Evalúa el tipo de tarea que va recivir en caso de ser vacío no truena
    if (!tarea) {
        alert('Se recomienda ingresar un dato');
        return;
    }

    const elementoInput = document.createElement('input');//construye el elemento nuevo a pintar
    elementoInput.classList.add('text');
    elementoInput.type = 'text';
    elementoInput.value = tarea;

    guardarLocalStorage(elementoInput.value); //guarda lo capturado en localstorage

    elementoInput.setAttribute('readonly', 'readonly');

//inicia con la creación del padre de los elementos a crear

    const accion = document.createElement('div')
    accion.classList.add('actions');

// creación de los botones o elementos hijos para añadirlos y pintarlos 

    const editar = document.createElement('button')
    editar.type = 'submit';
    editar.classList.add('edit');
    editar.innerHTML = 'Editar';

    const listo = document.createElement('button')
    listo.classList.add('done');
    listo.type = 'submit';
    listo.innerHTML = 'listo';

    accion.appendChild(editar);  //añade el hijo para poderlo mostrar (pintar)

    editar.addEventListener('click', (e) => {
        elementoInput.removeAttribute('readonly');
        accion.appendChild(listo);


    })

    elementoInput.setAttribute('readonly', 'readonly');


    listo.addEventListener('click', (e) => {

        elementoInput.setAttribute('readonly', 'readonly');
        guardarLocalStorage(elementoInput.value);
        listo.remove();
    })
    const eliminar = document.createElement('button');
    eliminar.classList.add('delete');
    eliminar.innerHTML = 'Eliminar';

    contenedor_input.appendChild(elementoInput);

    accion.appendChild(eliminar);
    contenedor_input.appendChild(accion);

    eliminar.addEventListener('click', () => {
        elementoInput.remove();
        editar.remove();
        eliminar.remove();
        listo.remove();
    })
    entradaTex.value = '';


})

//llamada para pintar los nuevos datos 
extraerDataSave();

const extraer = document.querySelector('.extraer') //boton para extraer los datos (poco funcional)
extraer.addEventListener('click', () => {

    //extraeLocalStrona();
    extraerDataSave();


})

// Se hace el guardado del dato  en un arreglo 
function guardarLocalStorage(elementoInput) {
    arregloCaracteres.push(elementoInput);
    localStorage.setItem("nombre", JSON.stringify(arregloCaracteres)); //el arreglo se guarda en almacenamiento local convertido
    postArchivo(JSON.stringify(arregloCaracteres));                     // y etiquetado  para mandar a guardar en backend
}

// Extraer el item de almacenamiento local 
function extraerDataSave() {
    // busca datos lo que haya en la dirección y lo mete 
    var correo = document.getElementById("uCorreo").innerText; //extrae el valor de la sesión 
    fetch('./datos/' + correo + "?" + Math.random()) //Consultar datos
        .then(response => response.text()) //Si se obtuvieron, 
        .then(data => {
            // hace la impresión del item
            console.log(data);
            localStorage.setItem("nombre", data); //setear el localstorage
            extraeLocalStrona();                
        });	

    extraeLocalStrona();

}
// traer el item de almacenamiento local con la etiqueta que se le da al almacenarlo 
function extraeLocalStrona() {

    var nuevoDato = localStorage.getItem("nombre"); //asígarle lo que trae el item guardado (en este caso arreglo)
    arregloCaracteres = JSON.parse(nuevoDato); //convertirlo de nuevo de JSON a lo que es (en este caso un arreglo)
    reconstruir(arregloCaracteres); //Mandar el arreglo a construir cx
}
// Ciclo para reconstrucción de los items almacenados en el arreglo 
function reconstruir(arregloCaracteres) {


    contenedor_input.innerHTML = '' //Reset al input principal

    if (!arregloCaracteres) return; //validación del arreglo vacío 

    var NuevoArregloCaracteres = arregloCaracteres;



    for (let i = 0; i < NuevoArregloCaracteres.length; i++) { //inicio del ciclo para pintar

        const nuevoInput = document.createElement('input');
        nuevoInput.classList.add('text')
        nuevoInput.type = 'text';
        nuevoInput.value = NuevoArregloCaracteres[i];  //asignación del valor del nuevo arreglo en su parte i al valor del nuevo input
        nuevoInput.setAttribute('name', i);       //para le borrado del dato se necesita un atributo que se le asigna para su posterior eliminado
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

        contenedor_input.appendChild(nuevoInput);

        nuevaAccion.appendChild(eliminar);
        contenedor_input.appendChild(nuevaAccion);

        eliminar.addEventListener('click', () => {
            var elementoParaBorrar = nuevoInput.getAttribute('name');
            nuevoInput.remove();
            editar.remove();
            eliminar.remove();
            eliminarElemento(elementoParaBorrar,arregloCaracteres);
        })

    }
}
function eliminarElemento(elementoParaBorrar,arregloCaracteres) {
    console.log(`El elemento a borrar es ${parseInt(elementoParaBorrar)+parseInt(1)} y el arreglo es ${arregloCaracteres}`)
}

function postArchivo(arregloCaracteres) {
    var correo = document.getElementById("uCorreo").innerText;
    var usuario = {
        arregloCaracteres: arregloCaracteres,
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