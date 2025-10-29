import express from "express";
import "dotenv/config";

import UsuarioRoute from "./src/routes/UsuarioRoutes.js";

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use("/usuario", UsuarioRoute);

app.get("/", (req, res)=>{
    res.status(200).json({msg: "Rota Home"});
})

app.listen(port, () =>{
    console.log(`Aplicação rodando em http://localhost:${port}`);
    
})