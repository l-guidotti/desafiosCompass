const express = require('express');
const app = express();
const InstituicaoRoutes = require('./src/routes/instituicaoRoutes');
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(InstituicaoRoutes);

app.listen(port, () => {
    console.log(`O servidor está rodando na porta: ${port}`);
})

