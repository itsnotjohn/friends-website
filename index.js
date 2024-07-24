const express = require("express");
const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('public'));

require('./structures/Bot/Client')(app);

app.use((req, res) => res.redirect(301, "/"));
app.listen(process.env.PORT || 3000, () => console.log('[+] Iniciando em (localhost:3000)'));