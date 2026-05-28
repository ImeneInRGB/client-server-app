const express = require('express');
const fs = require('fs');
const app = express();

// Configuration pour lire le JSON et servir le dossier public
app.use(express.json());
app.use(express.static('public'));

// Chemin du fichier de sauvegarde (qui sera dans le volume Kubernetes)
const dataFile = '/app/data/notes.json'; 

// Route pour lire les notes
app.get('/api/notes', (req, res) => {
    if (!fs.existsSync(dataFile)) {
        fs.writeFileSync(dataFile, '[]');
    }
    const data = fs.readFileSync(dataFile, 'utf8');
    res.json(JSON.parse(data));
});

// Route pour sauvegarder les notes
app.post('/api/notes', (req, res) => {
    fs.writeFileSync(dataFile, JSON.stringify(req.body));
    res.send({ status: 'success' });
});

app.listen(80, () => {
    console.log('Serveur démarré sur le port 80');
});
