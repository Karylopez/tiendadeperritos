const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

// Esta es la información que el backend enviará al frontend
app.get('/api/perritos', (req, res) => {
  res.json([
    { id: 1, nombre: 'Firulais', raza: 'Quiltro', precio: 'No tiene precio, es adoptado ❤️' },
    { id: 2, nombre: 'Max', raza: 'Golden Retriever', precio: '$150.000' }
  ]);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend de perritos corriendo en el puerto ${PORT}`);
});