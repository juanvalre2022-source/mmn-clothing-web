# MMN Clothing — Landing Page

Landing page de catálogo para MMN Clothing (camisetas y busos estampados), con pedidos por WhatsApp.

## Cómo editar el contenido

Todo lo que cambia seguido está en **`js/script.js`**, al inicio del archivo:

- **`WHATSAPP_NUMBER`**: número de WhatsApp Business, solo dígitos con indicativo de país (ej. Colombia: `"573001234567"`). Actualmente tiene un número de ejemplo — cámbialo apenas lo definas.
- **`PRODUCTS`**: lista del catálogo. Cada producto tiene `name`, `category` (`"camiseta"` o `"buso"`), `price` (en pesos, solo número), `image` (ruta a la foto) y `tag` (opcional, ej. `"Nuevo"`).

Para agregar fotos reales:
1. Guarda las fotos en la carpeta `images/` (ej. `images/camiseta-esencia.jpg`).
2. En `PRODUCTS`, pon esa ruta en el campo `image` del producto correspondiente.

El Instagram del footer y del header ya apunta a `https://www.instagram.com/clothingmmn`.

## Cómo verla en tu computador

Abre el archivo `index.html` directamente en el navegador, o usa un servidor local simple:

```bash
npx serve .
```

## Cómo publicarla gratis (dominio propio opcional)

**Opción recomendada: Vercel o Netlify (gratis)**

1. Sube esta carpeta a un repositorio de GitHub.
2. Entra a [vercel.com](https://vercel.com) o [netlify.com](https://netlify.com), conecta tu cuenta de GitHub.
3. Selecciona el repositorio — no requiere configuración (es HTML/CSS/JS puro).
4. En minutos tendrás una URL pública (ej. `mmn-clothing.vercel.app`).
5. Si compras un dominio (ej. `mmnclothing.com`), lo conectas desde el panel de Vercel/Netlify en "Domains".

## Próximos pasos sugeridos

- [ ] Definir y actualizar el número de WhatsApp Business.
- [ ] Reemplazar los productos de ejemplo con fotos y precios reales.
- [ ] Revisar textos (About, envíos, políticas de cambio/devolución).
- [ ] Comprar un dominio si se desea (ej. en Namecheap, GoDaddy o directamente en Vercel).
