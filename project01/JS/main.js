//CATALOGO DE PRODUCTOS
const productos = [
    //Cupcake Tematico
    {
        id: "5",
        titulo: "bakura",
        imagen: "https://shumistore.com/cdn/shop/products/G128421_1024x.png?v=1681747945",
        categoria: {
            nombre: "figura",
            id: "5"       // campo nclave para enlazar con indexx.html
        },
        precio: 35000
    },
    {
        id: "4",
        titulo: "kaiba01",
        imagen: "https://animes-pro.com/cdn/shop/files/4580416927567_3.jpg?v=1724134604",
        categoria: {
            nombre: "figura",
            id: "4"       // campo nclave para enlazar con indexx.html
        },
        precio: 35000
    },
    {
        id: "3",
        titulo: "Jaden",
        imagen: "https://images.bigbadtoystore.com/images/p/full/2024/03/686641bd-7fe3-4346-beeb-1f92c59d505c.jpg",
        categoria: {
            nombre: "figura",
            id: "3"       // campo nclave para enlazar con indexx.html
        },
        precio: 35000
    },
    {
        id: "2",
        titulo: "yusei",
        imagen: "https://www.goodsmile.com/gsc-webrevo-sdk-storage-prd/product/image/55270/N2xrMkDeJRaS1mq85C0sA4nTQtWpZVGu.jpg",
        categoria: {
            nombre: "figura",
            id: "2"       // campo nclave para enlazar con indexx.html
        },
        precio: 35500
    },
    {
        id: "1",
        titulo: "Kaiba",
        imagen: "https://www.sddistribuciones.com/Portadas/GSCYGM04304.JPG",
        categoria: {
            nombre: "figura",
            id: "1"       // campo nclave para enlazar con indexx.html
        },
        precio: 44500
    },
    {
        id: "1",
        titulo: "LEON",
        imagen: "https://http2.mlstatic.com/D_NQ_NP_634770-MCO81382462740_122024-O.webp",
        categoria: {
            nombre: "FIGURAS",
            id: "01"       // campo nclave para enlazar con indexx.html
        },
        precio: 35000
    }






];
const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}
