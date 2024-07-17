<!DOCTYPE html>
<html lang="pt-br">

<head>
  <script type="importmap">
    {
      "imports": {
        "@google/generative-ai": "https://esm.run/@google/generative-ai"
      }
    }
  </script>
</head>

<body>


<body>
  <!-- ... Your HTML and CSS -->
  <!-- Import @google/generative-ai, as shown above. -->
  <script type="module">
      import { GoogleGenerativeAI } from "@google/generative-ai";

      // Fetch your API_KEY
      const API_KEY = "AIzaSyB8ZMZFxHPGGoUBQnjFUWfQ47PqeyI_TnE";

      // Access your API key (see "Set up your API key" above)
      const genAI = new GoogleGenerativeAI(API_KEY);

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
      type="importmap">
  {
    "imports": {
      "@google/generative-ai": "https://esm.run/@google/generative-ai"
    }
  }
  async function run() {
  const prompt = "Write a story about a AI and magic"

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();
  </script>
  
  <label>Insira o prompt:</label></br>
<input type="text" id="cidade"> </br>
<input type="button" submit="Enviar"> </br>
<label>Resposta da IA</label>

</body>
<script></script>
</html>
