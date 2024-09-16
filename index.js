const { MongoClient } = require('mongodb');

// URL de conexão ao MongoDB. Substitua `<username>`, `<password>`, e `<cluster-url>` pelos seus detalhes.
const url = 'mongodb://<021ab354>:<021ab354>@cluster0.xppt7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
// Nome do banco de dados
const dbName = 'meuBancoDeDados';

async function main() {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    // Conectando ao cliente
    await client.connect();
    console.log('Conectado com sucesso ao servidor MongoDB');

    // Acessando o banco de dados
    const db = client.db(dbName);

    // Realize operações com o banco de dados aqui

  } catch (err) {
    console.error('Erro ao conectar ao MongoDB', err);
  } finally {
    // Fechar a conexão
    await client.close();
  }
}

main().catch(console.error);