const mysql = require('mysql2/promise');

const {
    DB_HOST = "localhost",
    DB_USER = "root",
    DB_PASSWORD = "admin123",
    DB_PORT = 3306
} = process.env;

async function crearBaseDeDatos() {
    let connection;
    try {
        // Conectar al servidor MySQL
        connection = await mysql.createConnection({
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASSWORD,
            port: DB_PORT
        });

        console.log("Conectado al servidor MySQL.");

        // Crear la base de datos si no existe
        await connection.query("CREATE DATABASE IF NOT EXISTS tienda_perritos;");
        console.log("Base de datos 'tienda_perritos' verificada/creada.");

        // Seleccionar la base de datos
        await connection.query("USE tienda_perritos;");

        // Crear la tabla productos si no existe
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS productos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(255) NOT NULL,
                descripcion TEXT,
                precio DECIMAL(10, 2) NOT NULL,
                stock INT NOT NULL
            );
        `;
        await connection.query(createTableQuery);
        console.log("Tabla 'productos' verificada/creada.");

        // Verificar si ya existen productos
        const [rows] = await connection.query("SELECT COUNT(*) as count FROM productos;");
        if (rows[0].count === 0) {
            const insertQuery = `
                INSERT INTO productos (nombre, descripcion, precio, stock) VALUES
                ('Saco Alimento ProPlan 15kg', 'Alimento premium para perros adultos.', 45000, 20),
                ('Hueso de Juguete', 'Juguete de goma resistente para morder.', 5000, 50),
                ('Plato Acero Inoxidable', 'Plato antideslizante tamaño M.', 7500, 30),
                ('Collar Ajustable Rojo', 'Collar reflectante para paseos nocturnos.', 3500, 15);
            `;
            await connection.query(insertQuery);
            console.log("Datos iniciales insertados con éxito.");
        } else {
            console.log("La tabla 'productos' ya contiene datos. Se omitió la inserción inicial.");
        }

    } catch (error) {
        console.error("Error durante la inicialización de la base de datos:", error);
    } finally {
        if (connection) {
            await connection.end();
            console.log("Conexión de inicialización cerrada.");
        }
    }
}

crearBaseDeDatos();