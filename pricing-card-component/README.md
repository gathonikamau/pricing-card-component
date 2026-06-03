# Pricing Card Component

A reusable `<pricing-card>` custom element with encapsulated styles (Shadow DOM).

## Bugs fixed from the original snippet

| Issue | Fix |
|-------|-----|
| `box-shdow` typo | Corrected to `box-shadow` |
| `<h2>…<h2>` wrong closing tag | Proper `</h2>` via component template |
| No semantic wrapper | Uses `<article>` for the card |
| Button not full-width in card | `display: block; width: 100%` |
| Missing interaction affordances | `cursor: pointer`, `:focus-visible` |

## Usage

```html
<script type="module" src="./pricing-card.js"></script>

<pricing-card
  title="Basic Plan"
  price="$9.99 /month"
  features="1 GB Storage|Basic Support|All Core Features"
  button-label="Start Trial"
></pricing-card>
```

Features can also be provided as slotted children:

```html
<pricing-card title="Pro" price="$19.99 /month" button-label="Subscribe">
  <li slot="feature">10 GB Storage</li>
  <li slot="feature">Priority Support</li>
</pricing-card>
```

Listen for CTA clicks:

```js
card.addEventListener('pricing-card-cta', (e) => {
  console.log(e.target.getAttribute('title'));
});
```

Optional `highlighted` attribute adds a emphasized border style.

## Run locally

```bash
npx --yes serve .
```

Open the URL shown and view `index.html`.
