const boton = document.querySelector('.boton');
const entradaTex = document.querySelector('.entradaTex');
const contenedor_input = document.querySelector('#contenedor_input');
const guardar = document.querySelector('.guardar');
function delete_row(e) {
    e.parentNode.parentNode.removeChild(e.parentNode);
}
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
    tImputEl.setAttribute('readonly', 'readonly')



    const accion = document.createElement('div')
    accion.classList.add('actions')

    const edit = document.createElement('button')
    edit.type = 'submit'
    edit.classList.add('edit')
    edit.innerHTML = 'Editar'
    const done = document.createElement('button')
    done.classList.add('done')
    done.type = 'submit'
    done.innerHTML = 'Done'
    
    accion.appendChild(edit);
    edit.addEventListener('click', (e) => {
        tImputEl.removeAttribute('readonly');
        accion.appendChild(done);
        
    })
    tImputEl.setAttribute('readonly', 'readonly')


    done.addEventListener('click', (e) => {
        tImputEl.setAttribute('readonly', 'readonly')
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
    guardar.addEventListener('click',()=>{
        localStorage.setItem(tImputEl)
    })
})



