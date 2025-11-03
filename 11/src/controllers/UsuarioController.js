import {v4 as uuidv4} from 'uuid';
import bcrypt from "bcrypt";
import UsuarioModel from '../models/UsuarioModel.js';


export default class UsuarioController {

  static listar(req, res) {
    try {
      const usuarios = UsuarioModel.listar();
      if (!usuarios || usuarios.length === 0) {
        res.status(200).json({ msg: "nenhum usuarios cadastrados" });
        return;
      }
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({ msg: "erro ao listar usuarios", erro: error.message });
    }
  }

  static async criar(req, res){

    try {
        const { nome, email, senha } = req.body;
        if (!nome || !email || !senha) {
            res.status(400).json({ msg: "todos os campos devem ser preenchidos" });
            return;
        }

        const senhaHash = await bcrypt.hash(senha, parseInt(process.env.SALT));

        const novoUsuario = {
            id: uuidv4(),
            nome: nome,
            email: email,
            senha: senhaHash,
            criadoEm: new Date()
        };
        const userCriado = UsuarioModel.criar(novoUsuario);
        if(userCriado){
            res.status(201).json({ msg: "usuario criado com sucesso", userCriado });
        }
        
    } catch (error) {
        res.status(500).json({ msg: "erro ao criar usuario", erro: error.message });
    }

  }


}