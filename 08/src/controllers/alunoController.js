import { alunos } from '../models/alunoModel.js';

export default class AlunoController {
    static listarAlunos(req, res) {
        res.status(200).json(alunos);
    }

    static criar(req, res) {
        try {
            
            const {nome , idade, curso, matricula} = req.body;
            const id = alunos.length + 1;
            const novoAluno = {id, nome, idade, curso, matricula};
            alunos.push(novoAluno);
            res.status(201).json({msg: "aluno criado com sucesso!", aluno: novoAluno});

        } catch (error) {
            res.status(500).json({ msg: "erro ao criar aluno!", error: error.message });
        }
    }

    static listarPorId(req, res) {
        try {
            const id = parseInt(req.params.id);
            const aluno = alunos.find(a => a.id === id);
            if(!aluno) {
                res.status(404).json({msg: "aluno nao encontrado!"});
                return;
            }
            res.status(200).json(aluno);
        } catch (error) {
            res.status(500).json({ msg: "erro ao buscar aluno!", error: error.message });   
        }
    }

    static atualizar(req, res) {
        try {
            const id = parseInt(req.params.id);
            const {nome , idade, curso, matricula} = req.body;
            const aluno = alunos.find(a => a.id === id);
            if (!aluno){
                res.status(404).json({msg: "aluno nao encontrado!"});
                return; 
            }

            if (!nome || !idade || !curso || !matricula) {
                res.status(400).json({msg: "dados incompletos!"});
                return;
            }

            // matricula deve ser unica e idade mininima 16 anos
            if (idade < 16) {
                res.status(400).json({msg: "idade minima 16 anos!"});
                return;
            }
            const matriculaExistente = alunos.find(a => a.matricula === matricula && a.id !== id);
            if (matriculaExistente) {
                res.status(400).json({msg: "matricula ja existe!"});
                return;
            }

            aluno.nome = nome;
            aluno.idade = idade;
            aluno.curso = curso;
            aluno.matricula = matricula;
            res.status(200).json({msg: "aluno atualizado com sucesso!", aluno: alunos});

        } catch (error) {
            res.status(500).json({ msg: "erro ao atualizar aluno!", error: error.message });   
        }   
    
    }   

    static deletar(req, res) {
        try {
            const id = parseInt(req.params.id);
            const alunoIndex = alunos.findIndex(a => a.id === id);
            if (alunoIndex === -1) {
                res.status(404).json({msg: "aluno nao encontrado!"});
                return; 
            }
            alunos.splice(alunoIndex, 1);
            res.status(200).json({msg: "aluno deletado com sucesso!"});
        } catch (error) {
            res.status(500).json({ msg: "erro ao deletar aluno!", error: error.message });   
        }

}

    //listar alunos por curso
    static listarPorCurso(req, res) {
        try {
            const curso = req.params.curso;
            const alunosCurso = alunos.filter(a => a.curso.toLowerCase() === curso.toLowerCase());
            if (alunosCurso.length === 0) {
                res.status(404).json({msg: "nenhum aluno encontrado para esse curso!"});
                return;
            }
            res.status(200).json(alunosCurso);
        } catch (error) {
            res.status(500).json({ msg: "erro ao buscar alunos por curso!", error: error.message });   
        }




}}
