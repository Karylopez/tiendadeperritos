// Este código pide los datos al backend y los dibuja en la pantalla
fetch('/api/perritos')
    .then(response => response.json())
    .then(data => {
        const lista = document.getElementById('lista-perritos');
        data.forEach(perrito => {
            const li = document.createElement('li');
            li.textContent = `${perrito.nombre} - ${perrito.raza} (${perrito.precio})`;
            lista.appendChild(li);
        });
    })
    .catch(error => console.error('Error buscando perritos:', error));