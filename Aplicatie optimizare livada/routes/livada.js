const express = require('express');
const router = express.Router();
const Livada = require('../db/modelLivada'); 

router.post('/proceseaza', async (req, res) => {
    const { suprafata, lungime, latime, rowSpacing, colSpacing } = req.body;

    const params = [suprafata, lungime, latime, rowSpacing, colSpacing];
    if (params.some(p => isNaN(Number(p)))) {
        return res.status(400).json({ eroare: 'Parametri invalizi' });
    }

    try {
        const response = await fetch('http://localhost:5000/optimizeaza', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ suprafata, lungime, latime, rowSpacing, colSpacing })
        });

        if (!response.ok) {
            const errText = await response.text();
            return res.status(500).json({ eroare: 'Eroare de la serverul Flask', detalii: errText });
        }

        const rezultat = await response.json();

        const livada = new Livada({
            parametri: { suprafata, lungime, latime, rowSpacing, colSpacing },
            rezultat: rezultat
        });
        await livada.save();

        res.json(rezultat);
    } catch (e) {
        console.error("EROARE FETCH:", e);
        res.status(500).json({
            eroare: e.message,
            stack: e.stack
        });
    }
});


module.exports = router;