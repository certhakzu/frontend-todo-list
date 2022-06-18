let url = 'http://localhost:8080';

const fillSection =(titleList,idList) =>{
    return `<div class="container-task">
        <div class="card border-info mb-3" style="max-width: 80rem;">
            <div class="card-header">
                <h2 >${titleList}</h2>
                    <input type="text" placeholder="Nueva Tarea" style="width : 250px">
                    <button class= "createTask btn btn-success my-2 my-sm-0" type="submit" value="${idList}">Agregar Tarea</button>
                    <spam  id="novisible"class = "spamId">${idList}</spam>
                    <button class= "deleteList btn btn-danger my-2 my-sm-0" " type="submit" style="margin-left: 200px" value="${idList}">Eliminar</button>
        </div>
        <div class="card-body">
            <table id="tabla-tarea" class="table table-hover">
                <tr>
                    <th>Description de tarea</th>
                    <th>¿Completa?</th>
                    <th>Acciones</th>

                </tr>
                <tr>
                    <td>TAREA</td>
                    <td>
                        <input class="form-check-input" type="checkbox" value="" id="checkbox"
                            style="text-align:right">
                    </td>
                    <td><button class="btn btn-warning">Editar</button>
                        <button class="btn btn-danger">Eliminar</button></button>
                    </td>
                </tr>

            </table>
        </div>
</div>  `

    
}

const fillSectionx = (listas) => {
    let resultadoSub = "";
    let resultado="";
    listas.forEach(lista => {  
        resultadoSub=''
        lista.tareaList.forEach(task => {
            resultadoSub += `<tr>
            <th>Descripción</th>
            <th>¿Completa?</th>
            <th>Acciones</th>

        </tr>
        <tr>
            <td>${task.descriptionTarea}</td>
            <td>
                <input class="form-check-input" type="checkbox" value="" id="checkbox"
                    style="text-align:right">
            </td>
            <td><button class="editTask btn btn-warning" id="editTask${task.id}">Editar</button>
            <button class="deleteTask btn btn-danger" id="editTask${task.id}">Eliminar</button>
        </td>
    </tr>`

        })
        resultado += 
        `<div class="container-task">
        <div class="card border-info mb-3" style="max-width: 80rem;">
            <div class="card-header">
                <h2 >${titleList}</h2>
                    <input type="text" placeholder="Nueva tarea" style="width : 250px">
                    <button class= "createTask btn btn-success my-2 my-sm-0" type="submit" value="${idList}">Agregar Tarea</button>
                    <spam  id="novisible"class = "spamId">${idList}</spam>
                    <button class= "deleteList btn btn-danger my-2 my-sm-0" " type="submit" style="margin-left: 200px" value="${idList}">Eliminar</button>
        </div>
        <div class="card-body">
            ${resultadoSub}
            <table id="tabla-tarea" class="table table-hover"></table>`

    })


}





const $container_task = document.querySelector('.container-task');
const $createList = document.querySelector('#btnAddList');
let result = "";
let resultTask="";


/**
 * Este Fetch obtiene la data de las listas de la BD y transforma dicho objeto en uno JSON, también llama el
 * método showList para mostralas
 */





 fetch(url+`/listatareas`)
     .then(response=>response.json())
     .then(cardJson=>showList(cardJson))
     .catch(error=>alert(error.message));

     /**
    * Función que obtiene las listas en el DOM con sus respectivas listas,
    * además recorre cada element de dicho arreglo obtenido para obtener el nombre y el id de las listas
    * Por último agrega cada card para cada lista en el HTML principal
    */ 

      const showList = async (cards)=>{
          let card = "";
           await cards.forEach(e => {
                card+= fillSection(e.nameLista, e.id, e);
           });

            fillSection(cards);
          $container_task.innerHTML = card;  
        
      }

    




    /**
    * Función de evento del click para agregar lista capturando el valor que tiene el input del
    * HTML, y llama a la función crear enviandole dicho valor, por último recarga la página para actualizar los cambios.
    */   
     $createList.addEventListener('click', e => {
        e.preventDefault();
        createList(document.getElementById('list-name').value)
        location.reload();
    
     })

/**
 * Esta función de  crear Lista recibe como paramentro el arreglo y lo transforma en JSON para enviar la 
 * solicitud de tipo POST al backend para insertar un nuevo registro en la entidad de Listas, por ultima trae la información
 * y refresca la página.
 */
   
      async function createList(newLista) {
            
             let informationReceipt = {
                 method: "POST",
                 headers: {
                     "Content-type": "application/json; charset=utf-8"
                 },
                 body: JSON.stringify({
                     nameLista: newLista
                 })
             },
                 res = await fetch(`${url}/listatareas`, informationReceipt)

                showList();
         } 
         

         /**
          * Evento que escucha los clicks que se hacen dentro del contenedor, cuando clickeas
          * en el botón eliminar llama el método eliminar tarea y cuando se clickea en create tarea
          * llama la creación de dicho elemento.
          */
         $container_task.addEventListener("click", async (e) => {
            if (e.target.classList[0] == "deleteList") {
               deleteList(e.target.previousElementSibling.textContent)
              
            }
            if (e.target.classList[0] == "createTask") { 
                e.preventDefault()
                console.log(e.path[0].value);
                //if (e.target.parentElement.children[3].textContent == "Crear") {
                  let dato = {
                    nameLista:e.target.previousElementSibling.value,
                    id:e.path[0].value
                  }
                  
                  createTask(dato.descriptionTarea, dato.id)   
                
                    
              }
        
        })
        /**
         * Función para eliminar una lista recibiendo el
         * @param {*} id que es capturado por el evento listener
         * por ultimo recarga la pagina
         */
        async function deleteList(id) {
            
            let informationReceipt = {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json; charset=utf-8"
                },
            },
                res = await fetch(`${url}/listatareas/${id}`, informationReceipt)
        
            location.reload()
            
        }   
         

    
/**
 * Esta función muestra las listas almacenadas en la base de datos usando una solicitud tipo  GET
 * en la cual se concatena la URL mas la ruta especifica que tiene el endpoint del backend para traer la información completa
 * 
 */


 const showTask = (tasks) =>{
     let card = "";
     tasks.forEach(element => {
         card+= fillSection(element.nameLista);
     });
     $container_task.innerHTML = card;
 }




 async function createTask(nombre,id){
    
        let informationReceipt = {
            method: "POST",
            headers: {
              "Content-type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({  
              descriptionTarea: nombre,
              isComplete: false,
              tareaList:{
                      id: id
                  }
            })
            
          },
        
            res = await fetch(`${url}/tareas`, informationReceipt)
            location.reload()
            
  
}

async function deleteTask(id) {
            
    let informationReceipt = {
        method: "DELETE",
        headers: {
            "Content-type": "application/json; charset=utf-8"
        },
    },
        res = await fetch(`${url}/tareas/${id}`, informationReceipt)

    location.reload()
    
}   





