# VloerBot - WordPress Embedding Instructies

## Overzicht
Deze chatbot widget is gebouwd met React, Vite en Framer Motion en is verbonden met Lovable Cloud voor AI-functionaliteit en bestandsopslag.

## Functies

### 🤖 Echte AI-integratie
- Gebruikt Google Gemini 2.5 Flash voor intelligente gesprekken
- Streaming responses voor natuurlijke conversatie
- Gespecialiseerd in vloeradvies en expertise

### 📎 Bestandsupload
- Upload afbeeldingen (JPG, PNG, GIF, WebP)
- Upload documenten (PDF, DOC, DOCX)
- Maximale bestandsgrootte: 10MB
- AI kan afbeeldingen analyseren voor specifiek advies

### ⚡ Backend-functionaliteit
- Beveiligde file storage via Lovable Cloud
- Edge functions voor AI-communicatie
- Geen externe API keys nodig (alles vooraf geconfigureerd)

## Build Instructies

### 1. Installatie
```bash
npm install
```

### 2. Build voor Productie
```bash
npm run build
```

Dit genereert een `dist` folder met:
- `index.html`
- `assets/index-[hash].js`
- `assets/index-[hash].css`

### 3. Voorbereiden voor WordPress

Om de widget embeddable te maken, moet je een wrapper script maken:

Maak een nieuw bestand: `public/embed.js`

```javascript
(function() {
  // Laad de CSS
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://jouw-domein.nl/chatbot/assets/index-[hash].css';
  document.head.appendChild(link);

  // Laad de JavaScript
  const script = document.createElement('script');
  script.type = 'module';
  script.src = 'https://jouw-domein.nl/chatbot/assets/index-[hash].js';
  document.head.appendChild(script);

  // Maak root element
  const root = document.createElement('div');
  root.id = 'vloerbot-root';
  document.body.appendChild(root);
})();
```

### 4. Upload naar Server

1. Build je project: `npm run build`
2. Upload de `dist` folder naar je server (bijv. `/wp-content/chatbot/`)
3. Update de URLs in `embed.js` met je echte domein
4. Upload `embed.js` naar dezelfde locatie

### 5. WordPress Integratie

#### Optie A: Via Theme Header (Globaal)
Voeg toe aan `functions.php`:

```php
function vloerbot_enqueue_widget() {
    wp_enqueue_script(
        'vloerbot-widget',
        get_template_directory_uri() . '/chatbot/embed.js',
        array(),
        '1.0.0',
        true
    );
}
add_action('wp_enqueue_scripts', 'vloerbot_enqueue_widget');
```

#### Optie B: Via Shortcode (Specifieke Pagina's)
Voeg toe aan `functions.php`:

```php
function vloerbot_shortcode() {
    wp_enqueue_script(
        'vloerbot-widget',
        get_template_directory_uri() . '/chatbot/embed.js',
        array(),
        '1.0.0',
        true
    );
    return '<div id="vloerbot-root"></div>';
}
add_shortcode('vloerbot', 'vloerbot_shortcode');
```

Gebruik in pagina's/posts: `[vloerbot]`

#### Optie C: Direct in Template
Voeg toe aan je `footer.php` (voor het sluiten van `</body>`):

```html
<script src="<?php echo get_template_directory_uri(); ?>/chatbot/embed.js"></script>
<div id="vloerbot-root"></div>
```

## Alternatieve Methode: Standalone Build

Voor een volledig standalone versie met init functie:

### 1. Aanpassen van Vite Config
Update `vite.config.ts`:

```typescript
export default defineConfig({
  build: {
    lib: {
      entry: './src/main.tsx',
      name: 'VloerBot',
      fileName: 'vloerbot',
      formats: ['umd']
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {}
      }
    }
  }
});
```

### 2. Main.tsx Aanpassen
Update `src/main.tsx`:

```typescript
import { createRoot } from "react-dom/client";
import ChatWidget from "./components/chatbot/ChatWidget";
import "./index.css";

// Exporteer init functie
(window as any).VloerBot = {
  init: (containerId = 'vloerbot-root') => {
    const container = document.getElementById(containerId);
    if (container) {
      const root = createRoot(container);
      root.render(<ChatWidget />);
    }
  }
};

// Auto-init als container bestaat
if (document.getElementById('vloerbot-root')) {
  (window as any).VloerBot.init();
}
```

### 3. WordPress Gebruik
```html
<div id="vloerbot-root"></div>
<script src="/path/to/vloerbot.umd.js"></script>
<script>
  VloerBot.init('vloerbot-root');
</script>
```

## Configuratie Opties

Je kunt later configuratie toevoegen:

```javascript
VloerBot.init('vloerbot-root', {
  apiEndpoint: 'https://api.jouwdomein.nl/chat',
  primaryColor: '#C17A3E',
  botName: 'VloerBot',
  greeting: 'Hallo! Waarmee kan ik helpen?'
});
```

## Styling Overwegingen

De widget is volledig zelfstandig gestyled met Tailwind CSS. Alle styles zijn:
- Scoped naar de widget
- Gebruikt CSS variables voor theming
- Responsive (380px desktop, full-width mobile)
- Z-index van 9999+ om boven andere content te verschijnen

## Testing

Test in verschillende scenarios:
- ✓ Desktop browsers (Chrome, Firefox, Safari)
- ✓ Mobile devices (iOS, Android)
- ✓ Verschillende WordPress themes
- ✓ Met andere plugins actief
- ✓ Page builders (Elementor, Gutenberg, etc.)

## Support

Voor vragen of problemen, documenteer hier:
- Browser versie
- WordPress versie
- Gebruikte theme
- Console errors (F12)
