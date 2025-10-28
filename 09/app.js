import express from "express";
import "dotenv/config";
import UsuarioRoutes from "./src/routes/usuarioRoutes.js"

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use("/usuarios", UsuarioRoutes)

app.get("/", (req, res)=>{
    res.status(200).json({msg: "Rota Home"});
})

app.listen(port, () =>{
    console.log(`Aplicação rodando em http://localhost:${port}`);
    
})