const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Rota de teste (opcional)
app.get("/", (req, res) => {
  res.send("API do Portfólio funcionando!");
});

// Rota para envio de email
app.post("/send", async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  // Validação simples
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Preencha os campos obrigatórios." });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "shelducaladoq@gmail.com", // coloque seu Gmail
      pass: "mwwu czvx tajn zdgn", // coloque sua senha de app
    },
  });

  try {
    await transporter.sendMail({
      from: `"Contato do Portfólio" <seuemail@gmail.com>`,
      to: "shelducaladoq@gmail.com", // ou outro e-mail seu
      subject: `Mensagem: ${subject}`,
      html: `
        <h2>Nova mensagem do formulário</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefone:</strong> ${phone || "Não informado"}</p>
        <p><strong>Assunto:</strong> ${subject || "Sem assunto"}</p>
        <p><strong>Mensagem:</strong><br>${message}</p>
      `,
      replyTo: email,
    });

    res.status(200).json({ message: "E-mail enviado com sucesso!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao enviar o e-mail." });
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
