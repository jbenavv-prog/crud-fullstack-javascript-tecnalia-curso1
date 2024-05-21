//////IMPORTAR LIBRERÍAS///////////////
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
///////////////////////////////////////

const app = express(); // Habilita la creación de apis

app.use(cors()); // Habilitar comunicación del front end

app.use(express.json()); // Habilita la recepción de datos desdes el front end

//////////////////MODELAJE DE DATOS//////////////////

const Product = mongoose.model("Product", {
  nombre: String,
  precio: Number,
});

//////////////////////////////////////////////////////

app.post("/api/producto", (req, res) => {
  // Esta es una api inicial
  console.log(req.body);
  Product.create(req.body);
  res.status(200).json({ ok: true });
});

app.get("/api/producto", async (req, res) => {
  const productos = await Product.find();
  res.status(200).json({ ok: true, datos: productos });
});

app.put("/api/producto/:id", async (req, res)=> {
    console.log(req.params.id);
    console.log(req.body);
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ok: true});
})


app.delete("/api/producto/:id", async (req, res)=> {
  console.log(req.params.id);
  await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({ok: true});
})

///// INICIALIZACIÓN DE BASE DE DATOS Y SERVIDOR//////////////////
mongoose
  .connect(
    "mongodb+srv://root:Maquina2018*@cluster0.dyvadcq.mongodb.net/store?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then((_) => {
    console.log("Connected to MongoDB");

    app.listen(3000, () => {
      console.log("Example app listening on port 3000!");
    });
  });
///////////////////////////////////////////////////////////
