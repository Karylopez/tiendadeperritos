CREATE DATABASE IF NOT EXISTS tienda_perritos;
USE tienda_perritos;

CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL
);

-- Insertar datos de prueba para que la tienda no aparezca vacía
INSERT INTO productos (nombre, descripcion, precio, stock) VALUES 
('Alimento Premium Perritos Adultos', 'Saco de 15kg con alta proteína', 34990.00, 20),
('Juguete Hueso Interactivo', 'Goma ultra resistente para morder', 8990.00, 50),
('Plato de Acero Inoxidable', 'Base antideslizante mediana', 5990.00, 15);