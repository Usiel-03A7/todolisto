const boton = document.querySelector('.boton');
const entradaTex = document.querySelector('.entradaTex');
const contenedor_input = document.getElementById('contenedor_input');
var arregloCaracteres = [];
boton.addEventListener("click", (e) => {
    e.preventDefault();
    const tarea = entradaTex.value;

    if (!tarea) {
        alert('Se recomienda ingresar un dato');
        return;
    }

    const elementoInput = document.createElement('input');
    elementoInput.classList.add('text')
    elementoInput.type = 'text';
    elementoInput.value = tarea;
    guardarLocalStorage(elementoInput.value);

    elementoInput.setAttribute('readonly', 'readonly')



    const accion = document.createElement('div')
    accion.classList.add('actions')

    const editar = document.createElement('button')
    editar.type = 'submit';
    editar.classList.add('edit');
    editar.innerHTML = 'Editar';
    const listo = document.createElement('button')
    listo.classList.add('listo')
    listo.type = 'submit';
    listo.innerHTML = 'Done';

    accion.appendChild(editar);
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
    const eliminar = document.createElement('button')
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
const extraer = document.querySelector('.extraer')
extraer.addEventListener('click', () => {

    //extraeLocalStrona();
    extraerDataSave();


})
function guardarLocalStorage(elementoInput) {
    arregloCaracteres.push(elementoInput);
    localStorage.setItem("nombre", JSON.stringify(arregloCaracteres));
    postArchivo(JSON.stringify(arregloCaracteres));
}

function extraerDataSave() {
    
    fetch('./datos/prueba.txt') //Consultar datos
        .then(response => response.text()) //Si se obtuvieron, 
        .then(data => {
            // Do something with your data
            console.log(data);
            localStorage.setItem("nombre", data);     //setear el localstorage
        });					//TODO:si no

    extraeLocalStrona();

}

function extraeLocalStrona() {

    var newData = localStorage.getItem("nombre");
    reconstruir(newData);
}

function reconstruir(varAre) {
    let cont = 0;
	

    var lo = JSON.parse(varAre);



    for (let i = 0; i < lo.length; i++) {

        const newImp = document.createElement('input');
        newImp.classList.add('text')
        newImp.type = 'text';
        newImp.value = lo[i];

        newImp.setAttribute('readonly', 'readonly')



        const newaccion = document.createElement('div')
        newaccion.classList.add('actions')

        const editar = document.createElement('button')
        editar.type = 'submit';
        editar.classList.add('edit');
        editar.innerHTML = 'Editar';
        const listo = document.createElement('button')
        listo.classList.add('done')
        listo.type = 'submit';
        listo.innerHTML = 'Done';

        newaccion.appendChild(editar);
        editar.addEventListener('click', (e) => {
            newImp.removeAttribute('readonly');
            newaccion.appendChild(listo);



        })

        newImp.setAttribute('readonly', 'readonly');


        listo.addEventListener('click', (e) => {

            newImp.setAttribute('readonly', 'readonly');
            guardarLocalStorage(newImp.value);
            listo.remove();
        })
        const eliminar = document.createElement('button')
        eliminar.classList.add('delete');
        eliminar.innerHTML = 'Eliminar';

        contenedor_input.appendChild(newImp);

        newaccion.appendChild(eliminar);
        contenedor_input.appendChild(newaccion);

        eliminar.addEventListener('click', () => {
            newImp.remove();
            editar.remove();
            eliminar.remove();
            listo.remove();
        })
    }
}

function postArchivo(elementoInput) {
 var correo = document.getElementById("uCorreo").innerText;
	var usuario = {
	archi: archi,
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