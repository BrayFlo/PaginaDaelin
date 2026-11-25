document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. MANEJO DEL CARRITO DE COMPRAS Y LOCALSTORAGE
       ========================================================================== */
    window.obtenerCarrito = function() {
        return JSON.parse(localStorage.getItem('photo_mara_cart')) || [];
    };

    window.guardarCarrito = function(carrito) {
        localStorage.setItem('photo_mara_cart', JSON.stringify(carrito));
        window.actualizarContadorCarrito();
    };

    window.actualizarContadorCarrito = function() {
        const cartCountEl = document.getElementById('cart-count');
        if (cartCountEl) {
            const carrito = window.obtenerCarrito();
            const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
            cartCountEl.textContent = totalItems;
        }
    };

    window.agregarAlCarrito = function(id, nombre, precio) {
        let carrito = window.obtenerCarrito();
        const itemExistente = carrito.find(item => item.id === id);

        if (itemExistente) {
            itemExistente.cantidad += 1;
        } else {
            carrito.push({ id, nombre, precio, cantidad: 1 });
        }

        window.guardarCarrito(carrito);
        window.mostrarNotificacion(`¡"<strong>${nombre}</strong>" se agregó al carrito!`);
    };

    window.cambiarCantidad = function(index, cambio) {
        let carrito = window.obtenerCarrito();
        if (carrito[index]) {
            carrito[index].cantidad += cambio;
            if (carrito[index].cantidad <= 0) {
                carrito.splice(index, 1);
            }
            window.guardarCarrito(carrito);
            window.renderizarPaginaCarrito();
        }
    };

    window.eliminarDelCarrito = function(index) {
        let carrito = window.obtenerCarrito();
        carrito.splice(index, 1);
        window.guardarCarrito(carrito);
        window.renderizarPaginaCarrito();
    };

    window.mostrarNotificacion = function(mensaje) {
        let toast = document.getElementById('cart-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'cart-toast';
            toast.className = 'cart-toast';
            document.body.appendChild(toast);
        }

        toast.innerHTML = `<i class="fas fa-check-circle"></i> ${mensaje} <a href="carrito.html">Ver Carrito</a>`;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3500);
    };

    /* ==========================================================================
       2. LÓGICA DE NAVEGACIÓN, MODALES Y ANIMACIONES (INDEX.HTML)
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Modales legales
    const openTermsBtn = document.getElementById('open-terms');
    const openPrivacyBtn = document.getElementById('open-privacy');
    const modalTerms = document.getElementById('modal-terms');
    const modalPrivacy = document.getElementById('modal-privacy');

    const openModal = (modal) => {
        if (!modal) return;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = (modal) => {
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    if (openTermsBtn) openTermsBtn.addEventListener('click', (e) => { e.preventDefault(); openModal(modalTerms); });
    if (openPrivacyBtn) openPrivacyBtn.addEventListener('click', (e) => { e.preventDefault(); openModal(modalPrivacy); });

    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay') || 
                e.target.classList.contains('modal-close-btn') || 
                e.target.classList.contains('modal-close-btn-action')) {
                closeModal(modal);
            }
        });
    });

    /* ==========================================================================
       3. LÓGICA DE GALERÍA Y CONTRATACIÓN INDIVIDUAL (SERVICIO.HTML)
       ========================================================================== */
    const serviceTitle = document.getElementById('service-title');
    const serviceDesc = document.getElementById('service-desc');
    const serviceGallery = document.getElementById('service-gallery');
    const actionContainer = document.getElementById('service-action-container');

    if (serviceTitle && serviceGallery) {
        const urlParams = new URLSearchParams(window.location.search);
        const tipoServicio = urlParams.get('tipo') || 'boda';

        const datosServicios = {
            boda: {
                id: 'boda_std',
                titulo: "Fotografía de Boda",
                precio: 4500,
                descripcion: "Momentos mágicos, emoción auténtica y elegancia en la cobertura del día más importante de tu vida.",
                fotos: [
                    "./img/boda1.jpg",
                    "./img/boda2.jpg",
                    "./img/boda3.jpg",
                    "./img/boda4.jpg",
                    "./img/boda5.jpg",
                    "./img/boda6.jpg"
                ]
            },
            xv: {
                id: 'xv_std',
                titulo: "Fotografía de XV Años",
                precio: 4000,
                descripcion: "Sesiones editoriales y cobertura de fiesta para conmemorar esta etapa tan especial.",
                fotos: [
                    "./img/xv1.jpg",
                    "./img/xv2.jpg",
                    "./img/xv3.jpg",
                    "./img/xv4.jpg",
                    "./img/xv5.jpg",
                    "./img/xv6.jpg"
                ]
            },
            individual: {
                id: 'ind_std',
                titulo: "Retrato Individual",
                precio: 1800,
                descripcion: "Retratos personales en estudio o exterior orientados a reflejar tu personalidad y profesionalismo.",
                fotos: [
                    "./img/indv1.jpg",
                    "./img/indv2.jpg",
                    "./img/indv3.jpg",
                    "./img/indv4.jpg",
                    "./img/indv5.jpg",
                    "./img/indv6.jpg"
                ]
            },
            compartida: {
                id: 'comp_std',
                titulo: "Fotografía Compartida",
                precio: 2200,
                descripcion: "Sesiones en pareja o grupos para plasmar la conexión y momentos compartidos.",
                fotos: [
                    "./img/par1.jpg",
                    "./img/par2.jpg",
                    "./img/par3.jpg",
                    "./img/par4.jpg",
                    "./img/par5.jpg",
                    "./img/par6.jpg"
                ]
            },
            casual: {
                id: 'cas_std',
                titulo: "Sesión Casual",
                precio: 1600,
                descripcion: "Enfoque relajado y fresco sin poses rígidas, perfecto para recuerdos del día a día.",
                fotos: [
                    "./img/cas1.jpg",
                    "./img/cas2.jpg",
                    "./img/cas3.jpg",
                    "./img/cas4.jpg",
                    "./img/cas5.jpg",
                    "./img/cas6.jpg"
                ]
            },
            ninos: {
                id: 'nin_std',
                titulo: "Fotografía Infantil / Niños",
                precio: 1700,
                descripcion: "Capturamos la espontaneidad, risas y ternura en cada etapa de la infancia.",
                fotos: [
                    "./img/boy1.jpg",
                    "./img/boy2.jpg",
                    "./img/boy3.jpg",
                    "./img/boy4.jpg",
                    "./img/boy5.jpg",
                    "./img/retedit.jpg"
                ]
            },
            escuela: {
                id: 'esc_std',
                titulo: "Fotografía Escolar",
                precio: 2500,
                descripcion: "Retratos de anuario, grupos escolares y registros de actividades institucionales.",
                fotos: [
                    "./img/esc1.jpg",
                    "./img/esc2.jpg",
                    "./img/esc3.jpg",
                    "./img/esc4.jpg",
                    "./img/esc5.jpg",
                    "./img/esc6.jpg"
                ]
            },
            cumpleanos: {
                id: 'cump_std',
                titulo: "Fotografía de Cumpleaños",
                precio: 3000,
                descripcion: "Cobertura de fiestas, momentos pastel y diversión para cualquier edad.",
                fotos: [
                    "./img/cum1.jpg",
                    "./img/cum2.jpg",
                    "./img/cum3.jpg",
                    "./img/cum4.jpg",
                    "./img/cum5.jpg",
                    "./img/cum6.jpg"
                ]
            }
        };

        const servicioSeleccionado = datosServicios[tipoServicio] || datosServicios.boda;

        serviceTitle.textContent = servicioSeleccionado.titulo;
        if (serviceDesc) serviceDesc.textContent = servicioSeleccionado.descripcion;
        document.title = `${servicioSeleccionado.titulo} | Photo by Mara`;

        if (actionContainer) {
            actionContainer.innerHTML = `
                <button class="btn btn-primary" onclick="agregarAlCarrito('${servicioSeleccionado.id}', '${servicioSeleccionado.titulo}', ${servicioSeleccionado.precio})">
                    <i class="fas fa-cart-plus"></i> Contratar Servicio ($${servicioSeleccionado.precio.toLocaleString('es-MX')} MXN)
                </button>
            `;
        }

        serviceGallery.innerHTML = servicioSeleccionado.fotos.map((url, idx) => `
            <div class="gallery-item reveal active">
                <img src="${url}" alt="${servicioSeleccionado.titulo} ${idx + 1}">
                <div class="gallery-overlay">
                    <h4>${servicioSeleccionado.titulo}</h4>
                    <p>Muestra ${idx + 1}</p>
                </div>
            </div>
        `).join('');
    }

    /* ==========================================================================
       4. RENDERIZADO DE LA PÁGINA DEL CARRITO (CARRITO.HTML)
       ========================================================================== */
    window.renderizarPaginaCarrito = function() {
        const itemsContainer = document.getElementById('cart-items-container');
        const subtotalEl = document.getElementById('cart-subtotal');
        const taxEl = document.getElementById('cart-tax');
        const totalEl = document.getElementById('cart-total');
        const paypalBtnContainer = document.getElementById('paypal-button-container');

        if (!itemsContainer) return;

        const carrito = window.obtenerCarrito();

        if (carrito.length === 0) {
            itemsContainer.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align: center; padding: 50px 20px; color: var(--text-muted, #777);">
                        Tu carrito está vacío actualmente. <br><br>
                        <a href="index.html#servicios" class="btn btn-outline" style="font-size:0.8rem;">Ver Especialidades</a>
                    </td>
                </tr>
            `;
            if (subtotalEl) subtotalEl.textContent = "$0.00 MXN";
            if (taxEl) taxEl.textContent = "$0.00 MXN";
            if (totalEl) totalEl.textContent = "$0.00 MXN";
            if (paypalBtnContainer) paypalBtnContainer.innerHTML = '';
            return;
        }

        const subtotal = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
        const iva = subtotal * 0.16;
        const total = subtotal + iva;

        itemsContainer.innerHTML = carrito.map((item, index) => `
            <tr>
                <td><strong>${item.nombre}</strong></td>
                <td>$${item.precio.toLocaleString('es-MX')} MXN</td>
                <td>
                    <button class="btn-qty" onclick="cambiarCantidad(${index}, -1)">-</button>
                    <span style="margin: 0 10px; font-weight:600;">${item.cantidad}</span>
                    <button class="btn-qty" onclick="cambiarCantidad(${index}, 1)">+</button>
                </td>
                <td>$${(item.precio * item.cantidad).toLocaleString('es-MX')} MXN</td>
                <td style="text-align: center;">
                    <button class="btn-remove" onclick="eliminarDelCarrito(${index})" title="Eliminar">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
            </tr>
        `).join('');

        if (subtotalEl) subtotalEl.textContent = `$${subtotal.toLocaleString('es-MX', {minimumFractionDigits: 2})} MXN`;
        if (taxEl) taxEl.textContent = `$${iva.toLocaleString('es-MX', {minimumFractionDigits: 2})} MXN`;
        if (totalEl) totalEl.textContent = `$${total.toLocaleString('es-MX', {minimumFractionDigits: 2})} MXN`;

        if (paypalBtnContainer && typeof paypal !== 'undefined') {
            paypalBtnContainer.innerHTML = '';
            paypal.Buttons({
                style: {
                    layout: 'vertical',
                    color:  'gold',
                    shape:  'rect',
                    label:  'paypal'
                },
                createOrder: function(data, actions) {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                currency_code: 'MXN',
                                value: total.toFixed(2)
                            },
                            description: "Reserva de Servicios Fotográficos - Photo by Mara"
                        }]
                    });
                },
                onApprove: function(data, actions) {
                    return actions.order.capture().then(function(details) {
                        alert(`¡Gracias por tu pago, ${details.payer.name.given_name}! Tu sesión ha sido reservada con éxito.`);
                        window.guardarCarrito([]);
                        window.location.href = "index.html";
                    });
                }
            }).render('#paypal-button-container');
        }
    };

    // Inicializaciones globales al cargar el archivo
    window.actualizarContadorCarrito();
    window.renderizarPaginaCarrito();
});