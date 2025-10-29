import UsuarioModel from "../models/usuarioModel.js";
import axios from "axios";

export default class UsuarioController{

static listar(req, res){
    try {
        const usuarios = UsuarioModel.listar();
        if (usuarios.length === 0) {
            res.status(200).json({msg: "nenhum usuarios cadastrados"})
            return;
        }

        if(!usuarios){
            res.status(400).json({msg: "erro ao buscar listar usuarios"})
            return;
        }

        res.status(200).json(usuarios)
    } catch (error) {
        res.status(500).json({msg: "erro interno", erro: error.message})
    }
}

    static buscarPorId(req, res){
        try {
          const id = req.params.id;
          const usuario = UsuarioModel.buscarPorId(id);
            if (!usuario) {
                res.status(400).json({msg: "usuario Nao encontrada"})
                return;
            }
            res.status(200).json(usuario)
        } catch (error) {
            res.status(500).json({msg: "erro ao buscar usuario", erro: error.message})
        }
    }

    static async criar(req, res){
        try {
            const { nome, cep, numero, telefone } = req.body;
            if ( !nome || !cep || !numero || !telefone){
                res.status(400).json({msg: "todos os campos devem ser preenchidos"})
                return;
            }

            const buscaCep = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)

            if(buscaCep.erro){
                res.status(400).json({msg: "CEP INVALIDO!"})
                return;
            }

            const novoUsuario = {
                id: Date.now(),
                nome: nome,
                telefone: telefone,
                cep: cep,
                rua: buscaCep.data.logradouro,
                numero: numero,
                bairro: buscaCep.data.bairro,
                cidade: buscaCep.data.localidade,
                estado: buscaCep.data.uf,
            }
            const userCriado = UsuarioModel.criar(novoUsuario);
            res.status(201).json({msg: "usuario criado", novoUsuario})

        } catch (error) {
            res.status(500).json({ msg: "Erro interno", erro: error.message });
        }
    }


    static async atualizar(req, res){
        try {
            const id = req.params.id;
            const usuarioExistente = UsuarioModel.buscarPorId(id);
            if (!usuarioExistente) {
                res.status(400).json({msg: "usuario nao encontrado"})
                return;
            }   
            const { nome, cep, numero, telefone } = req.body;

            if ( !nome || !cep || !numero || !telefone){
                res.status(400).json({msg: "todos os campos devem ser preenchidos"})
                return;
            }
            const buscaCep = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
            if(buscaCep.erro){
                res.status(400).json({msg: "CEP INVALIDO!"})
                return;
            }
            const usuarioAtualizado = {
                
                nome: nome,
                telefone: telefone,
                cep: cep,
                rua: buscaCep.data.logradouro,      
                numero: numero,
                bairro: buscaCep.data.bairro,
                cidade: buscaCep.data.localidade,
                estado: buscaCep.data.uf,
            }
            UsuarioModel.atualizar(id, usuarioAtualizado);
            res.status(200).json({msg: "usuario atualizado", usuarioAtualizado})
        } catch (error) {
            res.status(500).json({ msg: "Erro interno", erro: error.message });
        }
    }

    static deletar(req, res){
        try {
            const id = req.params.id;
            const usuarioExistente = UsuarioModel.buscarPorId(id);
            if (!usuarioExistente) {
                res.status(400).json({msg: "usuario nao encontrado"})
                return;
            }
            UsuarioModel.deletar(id);
            res.status(200).json({msg: "usuario deletado"})
        } catch (error) {
            res.status(500).json({ msg: "Erro interno", erro: error.message });
        }   
    }


}