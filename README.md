# MMN Clothing — Landing Page

Landing page para MMN Clothing (camisetas, busos y pantalonetas estampadas), con
catálogo completo, carrito de compras y pedidos por WhatsApp.

## Estructura

- `index.html` — página principal (hero, slider de destacados, vista previa por categoría).
- `catalogo.html` — catálogo completo con pestañas por categoría.
- `js/products.js` — configuración: número de WhatsApp y catálogo de productos.
- `js/cart.js` — lógica del carrito de compras y envío del pedido por WhatsApp.
- `js/main.js` — lógica de la página principal (slider, vistas previas).
- `js/catalog.js` — lógica de la página de catálogo (pestañas, resaltado de producto).

## Cómo editar el contenido

Todo lo que cambia seguido está en **`js/products.js`**, al inicio del archivo:

- **`WHATSAPP_NUMBER`**: número de WhatsApp Business, solo dígitos con indicativo de país (ej. Colombia: `"573001234567"`).
- **`PRODUCTS`**: lista del catálogo. Cada producto tiene `id` (único), `name`, `category` (`"camiseta"`, `"buso"` o `"pantaloneta"`), `price` (en pesos, solo número), `image` (ruta a la foto) y `tag` (opcional, ej. `"Nuevo"`).

Para agregar fotos reales:
1. Guarda las fotos en la carpeta `images/` (ej. `images/camiseta-esencia.jpg`).
2. En `PRODUCTS`, pon esa ruta en el campo `image` del producto correspondiente.

El Instagram del footer y del header ya apunta a `https://www.instagram.com/clothingmmn`.

## Cómo verla en tu computador

Abre el archivo `index.html` directamente en el navegador, o usa un servidor local simple:

```bash
npx serve .
```

## Publicación

El sitio está publicado en Vercel y conectado a este repositorio de GitHub: cada
`git push` a la rama `main` genera una nueva implementación automáticamente.

## Próximos pasos sugeridos

- [x] Definir y actualizar el número de WhatsApp Business.
- [ ] Reemplazar los productos de ejemplo con fotos y precios reales.
- [ ] Revisar textos (About, envíos, políticas de cambio/devolución).
- [ ] Comprar un dominio propio si se desea (ej. en Namecheap, GoDaddy o directamente en Vercel).
