import express from 'express';

const app = new express();
const port = 3000;

app.use(express.json());

let tarefas = [
    { id: 1, descricao: 'Estudar', status: "Pendente", prioridade: 'alta', responsavel: 'João' },
    { id: 2, descricao: 'Lavar Louça', status: "em andamento", prioridade: 'media', responsavel: 'Maria' },
    { id: 3, descricao: 'Academia', status: "Concluído", prioridade: 'baixa', responsavel: 'Pedro' }
];

// Lista as tarefas
app.get('/tarefas', (req, res) => {
    res.status(200).json(tarefas);
});

//Buscar Tarefa

app.get('/tarefas/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const tarefa = tarefas.find(t => t.id === id);

    if (!tarefa) {
      return res.status(404).json({ msg: "Tarefa não encontrada" });
    }

    res.status(200).json(tarefa);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

//Criar Tarefa

app.post('/tarefas', (req, res) => {
    try {
        const { descricao, status, prioridade, responsavel } = req.body;
        //VALIDAÇÃO SIMPLES
        if (!descricao || !status || !prioridade || !responsavel) {
            return res.status(400).json({ msg: "Todos os campos são obrigatórios" });
        }

        const novaTarefa = {
            id: tarefas.length + 1,
            descricao,
            status,
            prioridade,
            responsavel
        };

        tarefas.push(novaTarefa);
        res.status(201).json(novaTarefa);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

//Atualizar Tarefa

app.put('/tarefas/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { descricao, status, prioridade, responsavel } = req.body;
        const tarefa = tarefas.find(t => t.id === id);

        if (!tarefa) {
            return res.status(404).json({ msg: "Tarefa não encontrada" });
        }
        if (!descricao || !status || !prioridade || !responsavel) {
            return res.status(400).json({ msg: "Todos os campos são obrigatórios" });
        }

        tarefa.descricao = descricao;
        tarefa.status = status;
        tarefa.prioridade = prioridade;
        tarefa.responsavel = responsavel;

        res.status(200).json(tarefa);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
})

//Excluir Tarefa

app.delete('/tarefas/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const index = tarefas.findIndex(t => t.id === id)
        if(index === -1 ) {
            return res.status(404).json({ msg: "Tarefa não encontrada" });
        }
        const removido = tarefas.splice(index, 1);
        res.status(200).json({msg: "Tarefa Removida com Sucesso", removido});
    } catch (error) {
        res.status(500).json({erro: error.message})
    }
})


app.get('/tarefas/status/:status', (req, res) => {
  try {
    const { status } = req.params;
    const statusValidos = ["pendente", "em andamento", "concluida"];

    if (status) {
      const statusLower = status.toLowerCase();

      if (!statusValidos.includes(statusLower)) {
        return res.status(400).json({
          msg: `Status inválido. Use um dos seguintes: ${statusValidos.join(", ")}`
        });
      }

      const filtradas = tarefas.filter(
        t => t.status.toLowerCase() === statusLower
      );

      if (filtradas.length === 0) {
        return res.status(404).json({ msg: `Nenhuma tarefa com status '${status}' encontrada.` });
      }

      return res.status(200).json(filtradas);
    }

    res.status(200).json(tarefas);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

app.listen(port, () => {
    console.log(`APP rodando em ${port}`);
    
});
