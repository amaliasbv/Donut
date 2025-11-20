const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Servește fișierele statice din /src și root
app.use(express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname)));

// SPA - Toate rutele returnează index.html din /src
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🎨 DrawHub server running on port ${PORT}`);
    console.log(`📍 Local: http://localhost:${PORT}`);
});
