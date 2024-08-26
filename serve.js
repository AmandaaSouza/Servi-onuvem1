// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://021ab354:<021ab354>@cluster0.xppt7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// ///run().catch(console.dir);


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Criação do app Express
const app = express();
const port = process.env.PORT || 3000; // Permite que a porta seja definida por variáveis de ambiente

// Middleware para analisar JSON
app.use(bodyParser.json());

// Configuração de conexão com o MongoDB
const mongoURI = 'mongodb+srv://<021ab354>:<021ab354>@cluster0.mongodb.net/chatbot?retryWrites=true&w=majority';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB', err));

// Definição do schema e modelo para o histórico de ações
const actionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  action: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const Action = mongoose.model('Action', actionSchema);

// Endpoint para registrar uma ação
app.post('/api/actions', async (req, res) => {
  const { userId, action } = req.body;

  if (!userId || !action) {
    return res.status(400).json({ message: 'userId e action são obrigatórios' });
  }

  try {
    const newAction = new Action({ userId, action });
    await newAction.save();
    res.status(201).json({ message: 'Ação registrada com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao registrar a ação', error: err });
  }
});

// Servir o frontend HTML (opcional)
app.use(express.static('public'));

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});