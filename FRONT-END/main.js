function crear(event) {
  event.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const precio = document.getElementById("precio").value;

  fetch("http://localhost:3000/api/producto", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, precio }),
  })
    .then((respuesta) => respuesta.json())
    .then((datos) => alert("ok", datos))
    .catch((error) => alert("Error", error)); // /* Error handling */
}

function leer() {
  fetch("http://localhost:3000/api/producto", {
    method: "get",
    headers: { "Content-Type": "application/json" },
  })
    .then((respuesta) => respuesta.json())
    .then((respuesta) => {
      /////LOGICA PARA LEER DATOS AQUÍ!!
      console.log(respuesta.datos);
      const tabla = document.getElementById("tabla");
      respuesta.datos.forEach((producto) => {
        tabla.innerHTML += `<tr>
                                <td> ${producto.nombre}</td>
                                <td> ${ producto.precio }</td>
                                <td>
                                      <button type="button" onclick="editar()">Editar</button>    
                                      <button type="button">Eliminar</button>    
                                </td>
                            </tr>`;
        });
    })
    .catch((err) => alert(err));
}

function editar(){
  ////RELLENAR FORMULARIO//////////////
  alert("RELLENAR formulario para editar")
}

// function actualizar(idProducto, nombre, precio) {
//   console.log(`http://localhost:3000/api/producto/${idProducto}`);

//   fetch(`http://localhost:3000/api/producto/${idProducto}`, {
//     method: "put",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({nombre, precio})
//   })
//     .then((respuesta) => respuesta.json())
//     .then((respuesta) => {
//       /////////////////LÓGICA POSTERIOR A ACTUALIZAR DATO //////////////////////
//     alert("Producto Actualizado");
//     })
//     .catch((error) => alert("Ha ocurrido un error"));
// }

// function eliminar(idProducto){
//   fetch(`http://localhost:3000/api/producto/${idProducto}`, {
//     method: "delete",
//     headers: {"Content-Type": "application/json"}
//   })
//   .then(respuesta=>respuesta.json())
//   .then(respuesta=> {
//     //////LÓGICA POSTERIOR A UNA ELIMINACIÓN////////7
//     alert("Producto Eliminado");
//   })
//   .catch((error)=> alert("Ha ocurrido un error", error));
// }
