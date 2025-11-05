import UsuarioController from "../controllers/UsuarioController.js";
import express from "express";
const router = express.Router();

router.get("/", UsuarioController.listar);
router.post("/", UsuarioController.criar);
router.post("/login", UsuarioController.login);
router.get("/:id", UsuarioController.buscarPorId);
router.put("/:id", UsuarioController.atualizar);
router.delete("/:id", UsuarioController.deletar);
router.patch("/:id", UsuarioController.atualizarParcialmente);

export default router;