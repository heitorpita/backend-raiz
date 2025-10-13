import { livros } from "../models/livroModel.js";

export default class LivroController {
    static listarLivros = (req, res) => {
        res.status(200).json(livros);
    }

    static criar(req, res) {
        try {
            
            const { titulo, autor, ano } = req.body;
            if(!titulo || !autor || !ano ){
                res.status(400).json({msg: "Preencha todos os campos"});
                return;
            }
            const livro = livros.findIndex(f => f.titulo.toLowerCase() === titulo.toLowerCase());
            if(livro !== -1){
                res.status(400).json({msg: "Titulo Já existente"});
                return;
            }
            if(Number(ano) <= 1800 || Number(ano) > new Date().getFullYear()){
                res.status(400).json({msg: "Ano inválido"});
                return;
            }
            const novoLivro = {
                id: livros.length +1,
                titulo: titulo,
                autor: autor,
                ano: Number(ano)
            };
            livros.push(novoLivro);
            res.status(201).json({msg: "Livro criado com sucesso", livro: novoLivro});
        } catch (error) {
            res.status(500).json({msg: "Erro ao criar livro", erro: error.message});
        }
    }


}