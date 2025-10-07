import express from 'express';

const app = new express();
const port = 3000;

app.use(express.json());


let produtos = [
    { id: 1, nome: 'Pipa', preco: 10.0 },
    { id: 2, nome: 'Talheres', preco: 20.0 },
    { id: 3, nome: 'Sushi', preco: 30.0 }
];


app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
});

//READ - Listar todos os produtos
app.get('/produtos', (req, res) => {
    res.status(200).json(produtos);
});


//READ - Listar um produto pelo ID

app.get('/produtos/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const produto = produtos.find(p => p.id === id);

    if (!produto) {
      return res.status(404).json({ msg: "Produto não encontrado" });
    }

    res.status(200).json(produto);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});


// CREATE - Adicionar um novo produto
app.post('/produtos', (req, res) => {
    try {
        const { nome, preco } = req.body;
        //VALIDAÇÃO SIMPLES
        if (!nome || !preco) {
            return res.status(400).json({ msg: "Nome e preço são obrigatórios" });
        }

        const novoProduto = {
            id: produtos.length + 1,
            nome,
            preco
        };

        produtos.push(novoProduto);
        res.status(201).json(novoProduto);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

//DELETE REMOVER UM PRODUTO PELO ID
app.delete('/produtos/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const index = produtos.findIndex(p => p.id === id)
        if(index === -1 ) {
            return res.status(404).json({ msg: "Produto não encontrado" });
        }
        const removido = produtos.splice(index, 1);
        res.status(200).json({msg: "Produto Removido com Sucesso", removido});
    } catch (error) {
        res.status(500).json({erro: error.mensage})
    }
})

app.put('/produtos/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { nome, preco } = req.body;   
        const produto = produtos.find(p => p.id === id);

        if (!produto) {
            return res.status(404).json({ msg: "Produto não encontrado" });
        }
        if (!nome || !preco) {
            return res.status(400).json({ msg: "Nome e preço são obrigatórios" });
        }

        produto.nome = nome;
        produto.preco = preco;

        res.status(200).json(produto);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
})

app.listen(port, () => {
    console.log(`APP rodando em ${port}`);
    
});