const boton = document.querySelector('.boton');
const entradaTex = document.querySelector('.entradaTex');
const contenedor_input = document.querySelector('#contenedor_input');
var nombreList = [];

boton.addEventListener("click", (e) => {
    e.preventDefault();
    const taskk = entradaTex.value;

    if (!taskk) {
        alert('Se recomienda ingresar un dato');
        retunr;
    }

    const tImputEl = document.createElement('input');
    tImputEl.classList.add('text')
    tImputEl.type = 'text';
    tImputEl.value = taskk;
    guardarLocalStorage(tImputEl.value);

    tImputEl.setAttribute('readonly', 'readonly')



    const accion = document.createElement('div')
    accion.classList.add('actions')

    const edit = document.createElement('button')
    edit.type = 'submit';
    edit.classList.add('edit');
    edit.innerHTML = 'Editar';
    const done = document.createElement('button')
    done.classList.add('done')
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
    const delet = document.createElement('button')
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


    // function save__local() {

    //     const save = localStorage.setItem('archivo',JSON.parse( JSON.stringify(tImputEl.value)));
    //     array.push(save); 
    //     console.log(array);
    //     return array;  
    // }
    // function export__local() {
    //     const exportar = localStorage.getItem('archivo');
    //     return exportar;
    // }
    // let jornada = save__local

})
const extraer = document.querySelector('.extraer')
extraer.addEventListener('click', () => {
    //  alert('si esta entrando');
    //console.log('simon si entr0');
    //  console.log('aqu1 arribita tiene que estar el arreglo');
    alert('Holi');

   
    extraeLocalStrona();
   // extraeServerData();


});
function extraeServerData() {
   
}
function guardarLocalStorage(no) {
    nombreList.push(no);
    localStorage.setItem("nombre", JSON.stringify(nombreList));
    postArchivo(nombreList);
}
function extraeLocalStrona() {

    var newData = localStorage.getItem("nombre");
    reconstruir(newData);
}

function reconstruir(varAre) {
    var lo = JSON.parse(varAre);

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

function postArchivo(archi) {
    fetch('https://sistemas.cruzperez.com/usiel/back.php',
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: archi
        })
        .then(function (res) { console.log(res) })
        .catch(function (res) { console.log(res) })
}
// function getArchivo() {
//     fetch('https://sistemas.cruzperez.com/usiel/', {
//         method: 'GET',
//         body: archi
//      })
// }

// getArchivo();


// recives datos,
// verificas datop
// guardas dato
// verificas dato
// envias que fue correcto el dato 