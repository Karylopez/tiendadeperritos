const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

// Intentamos requerir el script db.js para que verifique/cree la BD al arrancar
try {
    const { crearBaseDeDatos } = require('../db.js');
    // Si db.js exporta la función, la ejecutamos de fondo
    if (typeof crearBaseDeDatos === 'function') {
        crearBaseDeDatos();
    }
} catch (e) {
    console.log("Aviso: Inicialización automática de db.js saltada o manejada internamente.");
}

const app = express();
app.use(cors());
app.use(express.json());

// Variables de entorno para la conexión (iguales a las de tu db.js)
const {
    DB_HOST = "localhost",
    DB_USER = "root",
    DB_PASSWORD = "admin123",
    DB_PORT = 3306
} = process.env;

// Endpoint corregido: Ahora consulta a la Base de Datos Real
app.get('/api/perritos', async (req, res) => {
    let connection;
    try {
        connection = await mysql.createConnection({
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASSWORD,
            port: DB_PORT,
            database: "tienda_perritos" // Nombre de la BD que crea db.js
        });

        // Consultamos los productos de la tienda de perritos
        const [rows] = await connection.query("SELECT * FROM productos;");
        res.json(rows); // Se los enviamos al frontend
    } catch (error) {
        console.error("Error en el Backend al consultar la BD:", error);
        res.status(500).json({ error: "Error interno al conectar con la base de datos" });
    } finally {
        if (connection) {
            await connection.end();
        }
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Backend de la tienda de perritos corriendo en el puerto ${PORT}`);
});