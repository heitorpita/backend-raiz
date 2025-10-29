import express from "express";
import UsuarioController from "../controllers/UsuarioController.js";

const router = express.Router();


router.get("/cidade/:cidade", UsuarioController.buscarPorCidade);
router.get("/estado/:estado", UsuarioController.buscarPorEstado);
router.get("/ordenar/nome", UsuarioController.NomePorOrdemAlfa);
router.get("/cep/:cep", UsuarioController.BuscarPorCep);
router.get("/bairro/:bairro", UsuarioController.buscarPorBairro);
router.get("/estatisticas", UsuarioController.estatisticas);


router.get("/", UsuarioController.listar);
router.get("/:id", UsuarioController.buscarPorId);
router.post("/", UsuarioController.criar);

export default router;
