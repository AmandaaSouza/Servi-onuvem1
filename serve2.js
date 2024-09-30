const cors = require('cors');

// Adicione isso ao seu arquivo server.js



const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Cria uma instância do Express
const app = express();
app.use(cors());

// Configuração do body-parser para análise dos corpos das requisições
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conexão com o MongoDB Atlas
const mongoURI = 'mongodb+srv://021ab354:021ab354@cluster0.xppt7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado ao MongoDB Atlas'))
    .catch(err => console.error('Erro ao conectar ao MongoDB Atlas:', err));

// Definindo o modelo para o histórico de conversas
const ConversationSchema = new mongoose.Schema({
    userId: String,
    message: String,
    timestamp: { type: Date, default: Date.now }
});

const Conversation = mongoose.model('Conversation', ConversationSchema);

// Definindo o modelo para os logins dos usuários
const LoginSchema = new mongoose.Schema({
    userId: String,
    loginTime: { type: Date, default: Date.now }
});

const Login = mongoose.model('Login', LoginSchema);

// Endpoint para armazenar o histórico de conversas
app.post('/api/conversation', async (req, res) => {
    try {
        const { userId, message } = req.body;
        const conversation = new Conversation({ userId, message });
        await conversation.save();
        res.status(201).json({ message: 'Mensagem armazenada com sucesso!' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao armazenar a mensagem.' });
    }
});

// Endpoint para armazenar o login do usuário
app.post('/api/login', async (req, res) => {
    try {
        const { userId } = req.body;
        const login = new Login({ userId });
        await login.save();
        res.status(201).json({ message: 'Login armazenado com sucesso!' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao armazenar o login.' });
    }
});

// Porta do servidor
const PORT =  3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
