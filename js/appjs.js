//Borrador del que si jala el duplicado
const boton = document.querySelector('.boton');
const entradaTex = document.querySelector('.entradaTex');
const contenedor_input = document.getElementById('contenedor_input');
var nombreList = [];

boton.addEventListener("click", (e) => {
    e.preventDefault();
    const taskk = entradaTex.value;

    if (!taskk) {
        alert('Se recomienda ingresar un dato');
        return;
    }

    const tImputEl = document.createElement('input');
    tImputEl.classList.add('text');
    tImputEl.type = 'text';
    tImputEl.value = taskk;

    guardarLocalStorage(tImputEl.value);

    tImputEl.setAttribute('readonly', 'readonly');



    const accion = document.createElement('div')
    accion.classList.add('actions');


    
    const edit = document.createElement('button')
    edit.type = 'submit';
    edit.classList.add('edit');
    edit.innerHTML = 'Editar';
    const done = document.createElement('button')
    done.classList.add('done');
    done.type = 'submit';
    done.innerHTML = 'Done';

    accion.appendChild(edit);
    edit.addEventListener('click', (e) => {
        tImputEl.removeAttribute('readonly');
        accion.appendChild(done);


    })

    tImputEl.setAttribute('readonly', 'readonly');


    done.addEventListener('click', (e) => {

        tImputEl.setAttribute('readonly', 'readonly');
        guardarLocalStorage(tImputEl.value);
        done.remove();
    })
    const delet = document.createElement('button');
    delet.classList.add('delete');
    delet.innerHTML = 'Eliminar';

    contenedor_input.appendChild(tImputEl);

    accion.appendChild(delet);
    contenedor_input.appendChild(accion);

    delet.addEventListener('click', () => {
        tImputEl.remove();
        edit.remove();
        delet.remove();
        done.remove();
    })
    entradaTex.value = '';


})
var EDS =[];

EDS = extraerDataSave();

const extraer = document.querySelector('.extraer')
extraer.addEventListener('click', () => {

    //extraeLocalStrona();
    extraerDataSave();


})
function guardarLocalStorage(no) {
    nombreList.push(no);
    localStorage.setItem("nombre", JSON.stringify(nombreList));
    postArchivo(JSON.stringify(nombreList));
}

function extraerDataSave() {
	var  x;
     var correo = document.getElementById("uCorreo").innerText;
    fetch('./datos/'+correo + "?"+Math.random()) //Consultar datos
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

    var newData = localStorage.getItem("nombre");
    nombreList = JSON.parse(newData);
    reconstruir(nombreList);
}

function reconstruir(varAre) {
    let cont = 0;
	
	contenedor_input.innerHTML = ''
    
	if(!varAre) return;
	var lo = varAre;
    


    for (let i = 0; i < lo.length; i++) {

        const newImp = document.createElement('input');
        newImp.classList.add('text')
        newImp.type = 'text';
        newImp.value = lo[i];

        newImp.setAttribute('readonly', 'readonly')



        const newaccion = document.createElement('div')
        newaccion.classList.add('actions')

        const edit = document.createElement('button')
        edit.type = 'submit';
        edit.classList.add('edit');
        edit.innerHTML = 'Editar';
        const done = document.createElement('button')
        done.classList.add('done')
        done.type = 'submit';
        done.innerHTML = 'Done';

        newaccion.appendChild(edit);
        edit.addEventListener('click', (e) => {
            newImp.removeAttribute('readonly');
            newaccion.appendChild(done);



        })

        newImp.setAttribute('readonly', 'readonly');


        done.addEventListener('click', (e) => {

            newImp.setAttribute('readonly', 'readonly');
            guardarLocalStorage(newImp.value);
            done.remove();
        })
        const delet = document.createElement('button')
        delet.classList.add('delete');
        delet.innerHTML = 'Eliminar';

        contenedor_input.appendChild(newImp);

        newaccion.appendChild(delet);
        contenedor_input.appendChild(newaccion);

        delet.addEventListener('click', () => {
            newImp.remove();
            edit.remove();
            delet.remove();
            done.remove();
        })

    }
}
function eliminarar(){

}

function postArchivo(archi) {
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