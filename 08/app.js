import express from 'express';
import alunoRoutes from './src/routes/alunoRoutes.js';
const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/alunos', alunoRoutes);

app.get('/', (req, res) => {
    res.send('API de Alunos está funcionando!');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`);
})




// 1 - APP / 2 - MODELS / 3 - CONTROLLERS / 4 - ROUTES