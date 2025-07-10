function agregarAlCarrito(nombre, precio) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const index = carrito.findIndex(p => p.nombre === nombre);
  
    if (index >= 0) {
      carrito[index].cantidad += 1;
    } else {
      carrito.push({ nombre, precio, cantidad: 1 });
    }
  
    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert(`${nombre} se agregó al carrito`);
  }
 
  function mostrarCarrito() {
    const contenedor = document.getElementById('carrito-contenido');
    const acciones = document.getElementById('acciones-carrito');
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    if (carrito.length === 0) {
      contenedor.innerHTML = `
        <p class='text-center'>El carrito está vacío.</p>
        <div class="text-center mt-3">
          <a href="index.html" class="btn btn-primary">Volver a la tienda</a>
        </div>
      `;
      acciones.style.display = "none";
      return;
    }

    acciones.style.display = "block";
    let total = 0;
    let html = `
      <table class="table table-bordered">
        <thead class="table-light">
          <tr>
            <th>Producto</th>
            <th>Precio unitario</th>
            <th>Cantidad</th>
            <th>Total</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
    `;

    carrito.forEach((item, index) => {
      const subtotal = item.precio * item.cantidad;
      total += subtotal;
      html += `
        <tr>
          <td>${item.nombre}</td>
          <td>S/ ${item.precio.toFixed(2)}</td>
          <td>${item.cantidad}</td>
          <td>S/ ${subtotal.toFixed(2)}</td>
          <td><button class="btn btn-sm btn-danger" onclick="eliminarProducto(${index})">Eliminar</button></td>
        </tr>
      `;
    });

    html += `
        <tr>
          <td colspan="3"><strong>Total a pagar</strong></td>
          <td><strong>S/ ${total.toFixed(2)}</strong></td>
          <td></td>
        </tr>
      </tbody>
      </table>
    `;

    contenedor.innerHTML = html;
  }

  function eliminarProducto(index) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
  }

  function vaciarCarrito() {
    if (confirm("¿Estás seguro de vaciar el carrito?")) {
      localStorage.removeItem('carrito');
      mostrarCarrito();
    }
  }

  function pagar() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    if (carrito.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    alert("Gracias por tu compra 🐾 ¡Tu pedido está en camino!");
    localStorage.removeItem('carrito');

    document.getElementById('carrito-contenido').innerHTML = `
      <p class='text-center'>✅ ¡Gracias por tu compra!</p>
      <div class="text-center mt-3">
        <a href="index.html" class="btn btn-primary">Volver a la tienda</a>
      </div>
    `;

    document.getElementById('acciones-carrito').style.display = "none";
  }

  // Mostrar carrito al cargar
  mostrarCarrito();