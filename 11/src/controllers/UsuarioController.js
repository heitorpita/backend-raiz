import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt";
import UsuarioModel from '../models/UsuarioModel.js';


export default class UsuarioController {
    static listar(req, res) {
        try {
            const usuarios = UsuarioModel.listar();
            if (!usuarios || usuarios.length === 0) {
                res.status(404).json({ msg: "Nenhum usuário cadastrado" });
                return;
            }
            res.status(200).json(usuarios);
        } catch (error) {
            res.status(500).json({ msg: "Erro ao listar os usuários", erro: error.message });
        }
    }

    static buscarPorId(req, res){
        try {
            const id = req.params.id;
            const usuario = UsuarioModel.buscarPorId(id);
            if(!usuario){
                res.status(404).json({msg: "Nenhum usuário encontrado com esse ID"});
                return;
            }
            res.status(200).json({msg: "Usuário encontrado", usuario: usuario});
        } catch (error) {
            res.status(500).json({msg: "Erro interno ao buscar usuário por ID", erro: error.message});
        }
    }

    static async criar(req, res) {
        try {
            const { nome, email, senha } = req.body;
            if (!nome || !email || !senha) {
                res.status(400).json({ msg: "Todos os campos devem ser preenchidos!" });
                return;
            }
            const salt = parseInt(process.env.SALT);
            const senhaHash = await bcrypt.hash(senha, salt);
            const novoUsuario = {
                id: uuidv4(),
                nome: nome,
                email: email,
                senha: senhaHash,
                criadoEm: new Date()
            }
            const usuarioCriado = UsuarioModel.criar(novoUsuario);
            if (usuarioCriado) {
                res.status(201).json({ msg: "Usuário criado com sucesso", usuarioCriado });
                return;
            }
        } catch (error) {
            res.status(500).json({ msg: "Erro ao criar o usuário.", erro: error.message });
        }
    }

    static async login(req, res){
        try {
            const{email, senha} = req.body;
            if(!email || !senha){
                res.status(400).json({msg: "Todos os campos devem ser preenchidos"});
                return;
            }
            const usuario = UsuarioModel.listar().find(u => u.email === email);
            if(!usuario){
                res.status(404).json({msg: "Usuário não encontrado!"});
                return;
            }
            const senhaValida = await bcrypt.compare(senha, usuario.senha);
            if(!senhaValida){
                res.status(400).json({msg: "Email ou senha inválidos!"});
                return;
            }
            res.status(200).json({msg: "Login realizado com sucesso", usuario: usuario.nome});
            // res.redirect("https://www.google.com/")
        } catch (error) {
            res.status(500).json({msg: "Erro ao realizar o login", erro: error.message});
        }
    }
    static async atualizar(req, res){
        try {
            const id = req.params.id;
            const {nome, email, senha} = req.body;
            if(!nome || !email || !senha){
                res.status(400).json({msg: "Todos os campos devem ser preenchidos"});
                return;
            }
            const salt = parseInt(process.env.SALT);
            const senhaHash = await bcrypt.hash(senha, salt);
            const novosDados = {
                nome: nome,
                email: email,
                senha: senhaHash,
                atualizadoEm: new Date()
            }
            const usuarioAtualizado = UsuarioModel.atualizar(id, novosDados);
            if(!usuarioAtualizado){
                res.status(404).json({msg: "Usuário não encontrado."});
                return;
            }
            res.status(201).json({msg: "Usuario atualizado com sucesso!", usuario: usuarioAtualizado});
        } catch (error) {
            res.status(500).json({msg: "Erro interno ao atualizar.", erro: error.message});
        }
    }

    static async atualizarParcialmente(req, res){
        try {
            const id = req.params.id;
            const campos = {...req.body} //Pode conter nome, email, senha
            if(!campos){
                res.status(400).json({msg: "Nenhum valor recebido para atualizar"});
                return;
            }
            if(campos.senha){
                const salt = parseInt(process.env.SALT);
                campos.senha = await bcrypt.hash(campos.senha, salt);
            }
            const usuarioAtualizado = UsuarioModel.atualizar(id, campos);
            if(!usuarioAtualizado){
                 res.status(404).json({msg: "Usuário não encontrado."});
                return;
            }
            res.status(201).json({msg:"Usuário atualizado com sucesso!", usuario: usuarioAtualizado});
        } catch (error) {
             res.status(500).json({msg: "Erro interno ao atualizar parcialmente.", erro: error.message});
        }
    }
    static deletar(req, res){
        try {
            const id = req.params.id;
            const userDelete = UsuarioModel.deletar(id);
            if(!userDelete){
                res.status(404).json({msg: "Usuário não encontrado  ao tentar deletar"});
                return;
            }
            res.status(200).json({msg:"Usuário deletado com sucesso!"});
        } catch (error) {
            res.status(500).json({msg: "Erro interno ao deletar", erro: error.message});
        }
    }
}