const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Servește fișierele statice din directorul curent
app.use(express.static(path.join(__dirname)));

// Redirecționează toate rutele către index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server-ul rulează pe portul ${PORT}`);
});
