// app.js corregido

// Función para cargar los productos y pintarlos en la tabla
function cargarProductos() {
    fetch('/api/perritos') // Asegúrate de que este sea el endpoint correcto de tu backend
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById('tbodyProductos');
            tbody.innerHTML = ''; // Limpiamos la tabla antes de cargar

            data.forEach(producto => {
                const tr = document.createElement('tr');
                
                // Asumiendo que tu backend devuelve id, nombre, descripcion, precio, stock
                tr.innerHTML = `
                    <td>${producto.id || '-'}</td>
                    <td>${producto.nombre}</td>
                    <td>${producto.descripcion || '-'}</td>
                    <td>$${producto.precio}</td>
                    <td>${producto.stock || '-'}</td>
                    <td>
                        <button class="secondary" onclick="alert('Funcionalidad editar pendiente')">Editar</button>
                        <button class="danger" onclick="alert('Funcionalidad eliminar pendiente')">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Error buscando productos:', error);
            document.getElementById('status').textContent = 'Error al cargar los datos.';
            document.getElementById('status').className = 'status error';
        });
}

// Botón de recarga manual
document.getElementById('btnCargar').addEventListener('click', cargarProductos);

// Cargar productos automáticamente al abrir la página
cargarProductos();