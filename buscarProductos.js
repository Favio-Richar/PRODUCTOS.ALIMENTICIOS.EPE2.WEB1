// Cargar el archivo JSON al cargar la página
window.onload = function() {
    fetch('table.json')
    .then(response => response.json())
    .then(data => {
        // Generar opciones de proveedores y categorías
        generarOpciones(data);
        // Mostrar todos los productos al cargar la página
        mostrarProductos(data);
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));
}

// Función para generar opciones de proveedores y categorías
function generarOpciones(data) {
    const proveedores = [...new Set(data.map(producto => producto.Proveedor))];
    const categorias = [...new Set(data.map(producto => producto.Categoría))];
    
    const proveedorSelect = document.getElementById('proveedorSelect');
    const categoriaSelect = document.getElementById('categoriaSelect');

    // Generar opciones para proveedor y categoría
    proveedores.forEach(proveedor => {
        const option = document.createElement('option');
        option.textContent = proveedor;
        option.value = proveedor;
        proveedorSelect.appendChild(option);
    });

    categorias.forEach(categoria => {
        const option = document.createElement('option');
        option.textContent = categoria;
        option.value = categoria;
        categoriaSelect.appendChild(option);
    });
}

// Función para filtrar productos por proveedor o categoría
function filtrarProductos() {
    const proveedor = document.getElementById('proveedorSelect').value;
    const categoria = document.getElementById('categoriaSelect').value;

    fetch('table.json')
    .then(response => response.json())
    .then(data => {
        let productosFiltrados = data;

        if (proveedor) {
            productosFiltrados = productosFiltrados.filter(producto => producto.Proveedor === proveedor);
        }

        if (categoria) {
            productosFiltrados = productosFiltrados.filter(producto => producto.Categoría === categoria);
        }

        mostrarProductos(productosFiltrados);
    })
    .catch(error => console.error('Error al filtrar productos:', error));
}

// Función para mostrar productos en la tabla
function mostrarProductos(productos) {
    const tablaProductos = document.getElementById('tablaProductos');
    tablaProductos.innerHTML = ''; // Limpiar la tabla antes de mostrar nuevos datos

    // Generar encabezados de tabla
    const encabezados = ['IdProducto', 'NombreProducto', 'Proveedor', 'Categoría', 'CantidadPorUnidad', 'PrecioUnidad', 'UnidadesEnExistencia', 'UnidadesEnPedido', 'NivelNuevoPedido', 'Suspendido'];
    const encabezadoRow = tablaProductos.insertRow();
    encabezados.forEach(encabezado => {
        const th = document.createElement('th');
        th.textContent = encabezado;
        encabezadoRow.appendChild(th);
    });

    // Generar filas de productos
    productos.forEach(producto => {
        const fila = tablaProductos.insertRow();
        Object.values(producto).forEach(valor => {
            const cell = fila.insertCell();
            cell.textContent = valor;
        });
    });
}
