import UsuarioModel from "../models/UsuarioModel.js";
import axios from "axios";

export default class UsuarioController {

  static listar(req, res) {
    try {
      const usuarios = UsuarioModel.listar();
      if (usuarios.length === 0) {
        res.status(200).json({ msg: "nenhum usuarios cadastrados" });
        return;
      }

      if (!usuarios) {
        res.status(400).json({ msg: "erro ao buscar listar usuarios" });
        return;
      }

      res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({ msg: "erro interno", erro: error.message });
    }
  }

  static buscarPorId(req, res) {
    try {
      const id = req.params.id;
      const usuario = UsuarioModel.buscarPorId(id);
      if (!usuario) {
        res.status(400).json({ msg: "usuario Nao encontrado" });
        return;
      }
      res.status(200).json(usuario);
    } catch (error) {
      res.status(500).json({ msg: "erro ao buscar usuario", erro: error.message });
    }
  }

  static async criar(req, res) {
    try {
      const { nome, cep, numero, telefone } = req.body;
      if (!nome || !cep || !numero || !telefone) {
        res.status(400).json({ msg: "todos os campos devem ser preenchidos" });
        return;
      }

      const buscaCep = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

      if (buscaCep.data.erro) {
        res.status(400).json({ msg: "CEP INVALIDO!" });
        return;
      }

      const novoUsuario = {
        id: Date.now(),
        nome,
        telefone,
        cep,
        rua: buscaCep.data.logradouro,
        numero,
        bairro: buscaCep.data.bairro,
        cidade: buscaCep.data.localidade,
        estado: buscaCep.data.uf,
      };
      const userCriado = UsuarioModel.criar(novoUsuario);
      res.status(201).json({ msg: "usuario criado", novoUsuario });
    } catch (error) {
      res.status(500).json({ msg: "Erro interno", erro: error.message });
    }
  }

  static buscarPorCidade(req, res) {
    try {
      const cidade = req.params.cidade;
      const usuarios = UsuarioModel.buscarPorCidade(cidade);
      if (usuarios.length === 0) {
        res.status(200).json({ msg: "nenhum usuario encontrado" });
        return;
      }
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({ msg: "erro ao buscar usuario", erro: error.message });
    }
  }

  static buscarPorEstado(req, res) {
    try {
      const estado = req.params.estado;
      const usuarios = UsuarioModel.buscarPorEstado(estado);
      if (usuarios.length === 0) {
        res.status(200).json({ msg: "nenhum usuario encontrado" });
        return;
      }
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({ msg: "erro ao buscar estado", erro: error.message });
    }
  }

  static NomePorOrdemAlfa(req, res) {
    try {
      const usuarios = UsuarioModel.NomePorOrdemAlfa();
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({ msg: "erro ao buscar usuarios", erro: error.message });
    }
  }

  static BuscarPorCep(req, res) {
    try {
      const cep = req.params.cep;
      const usuarios = UsuarioModel.BuscarPorCep(cep);
      if (usuarios.length === 0) {
        res.status(200).json({ msg: "nenhum usuario encontrado" });
        return;
      }
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({ msg: "erro ao buscar usuario", erro: error.message });
    }
  }

  static buscarPorBairro(req, res) {
    try {
      const bairro = req.params.bairro;
      const usuarios = UsuarioModel.buscarPorBairro(bairro);
      if (usuarios.length === 0) {
        res.status(200).json({ msg: "nenhum usuario encontrado nesse bairro" });
        return;
      }
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({ msg: "erro ao buscar bairro", erro: error.message });
    }
  }

 
  static estatisticas(req, res) {
    try {
      const usuarios = UsuarioModel.listar();
      const total = usuarios.length;
      const cidades = new Set(usuarios.map(u => u.cidade));
      const estados = new Set(usuarios.map(u => u.estado));

      res.status(200).json({
        totalUsuarios: total,
        cidadesDiferentes: cidades.size,
        estadosDiferentes: estados.size
      });
    } catch (error) {
      res.status(500).json({ msg: "erro ao gerar estatísticas", erro: error.message });
    }
  }
}
