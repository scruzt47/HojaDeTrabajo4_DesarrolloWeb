// public/script.js
document.getElementById('formulario').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const carnet = document.getElementById('carnet').value;
    const nombre = document.getElementById('nombre').value;
    const tarea = document.getElementById('tarea').value;
    const nota = parseFloat(document.getElementById('nota').value);
  
    fetch('/ingresar-notas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ carnet, nombre, tarea, nota }),
    })
      .then(response => response.text())
      .then(() => mostrarResumen());
  });
  
  function mostrarResumen() {
    const carnet = prompt('Ingrese el carnet del estudiante a buscar:');
    if (carnet) {
      fetch(`/buscar/${carnet}`)
        .then(response => response.json())
        .then(data => {
          const resumen = document.getElementById('resumen');
          resumen.innerHTML = '';
          if (data && data.notas.length > 0) {
            resumen.innerHTML += `<h2>Resumen de Notas para ${data.nombre} (Carnet: ${carnet})</h2>`;
            data.notas.forEach(nota => {
              resumen.innerHTML += `<p>Tarea: ${nota.tarea}, Nota: ${nota.nota}</p>`;
            });
          } else {
            resumen.innerHTML = 'Estudiante no encontrado o sin notas.';
          }
        });
    }
  }
  