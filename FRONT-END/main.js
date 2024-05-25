leer();

let IDACTUAL = "";

function enviar(event) {
  event.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const precio = document.getElementById("precio").value;


//////VALIDAR SI ES UNA CREACIÓN  O UNA ACTUALIZACIÓN /////

if(IDACTUAL == "") { // CREAR
  fetch("http://localhost:3000/api/producto", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, precio }),
  })
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      alert("Producto Creado", datos)
      leer();
    })
    .catch((error) => alert("Error", error)); // /* Error handling */
} else if (IDACTUAL != ""){ // ACTUALIZAR
  actualizar(IDACTUAL, nombre, precio);
}
}

function leer() {
  fetch("http://localhost:3000/api/producto", {
    method: "get",
    headers: { "Content-Type": "application/json" },
  })
    .then((respuesta) => respuesta.json())
    .then((respuesta) => {
      /////LÓGICA PARA LEER DATOS AQUÍ!!
      console.log(respuesta.datos);
      const tabla = document.getElementById("tabla");
      tabla.innerHTML = "";
      respuesta.datos.forEach((producto) => {
        tabla.innerHTML += `<tr>
                                <td> ${producto.nombre}</td>
                                <td> ${ producto.precio }</td>
                                <td>
                                      <button type="button" onclick="editar('${producto._id}', '${producto.nombre}', ${producto.precio})">Editar</button>    
                                      <button type="button" onclick="eliminar('${producto._id}')">Eliminar</button>    
                                </td>
                            </tr>`;
        });
    })
    .catch((err) => alert(err));
}

function editar(id, nombre, precio){
  ////RELLENAR FORMULARIO//////////////
  // alert(id + " "+ nombre + " "+ precio);
  IDACTUAL = id;
  document.getElementById("nombre").value = nombre;
  document.getElementById("precio").value = precio;
}

function limpiar(){
  IDACTUAL = "";
  document.getElementById("nombre").value = "";
  document.getElementById("precio").value = "";
}

function actualizar(idProducto, nombre, precio) {
  console.log(`http://localhost:3000/api/producto/${idProducto}`);

  fetch(`http://localhost:3000/api/producto/${idProducto}`, {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({nombre, precio})
  })
    .then((respuesta) => respuesta.json())
    .then((respuesta) => {
      /////////////////LÓGICA POSTERIOR A ACTUALIZAR DATO //////////////////////
    alert("Producto Actualizado");
    leer();
    })
    .catch((error) => alert("Ha ocurrido un error"));
}

function eliminar(idProducto){
  const eliminar = confirm("Confirmar eliminación permanente");

  if(!eliminar) {
    return;
  }

  fetch(`http://localhost:3000/api/producto/${idProducto}`, {
    method: "delete",
    headers: {"Content-Type": "application/json"}
  })
  .then(respuesta=>respuesta.json())
  .then(respuesta=> {
    //////LÓGICA POSTERIOR A UNA ELIMINACIÓN////////7

    alert("Producto Eliminado");
    leer();
  })
  .catch((error)=> alert("Ha ocurrido un error", error));
}
