/**
 * Reusable pricing card as a custom element.
 *
 * Usage:
 *   <pricing-card
 *     title="Basic Plan"
 *     price="$9.99 /month"
 *     features="1 GB Storage|Basic Support|All Core Features"
 *     button-label="Start Trial"
 *   ></pricing-card>
 *
 * Or pass features as child <li> elements (slot="feature").
 */
class PricingCard extends HTMLElement {
  static get observedAttributes() {
    return ['title', 'price', 'features', 'button-label', 'highlighted'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  getFeatureItems() {
    const slotted = [...this.querySelectorAll('[slot="feature"]')].map(
      (el) => el.textContent.trim()
    );
    if (slotted.length) return slotted;

    const raw = this.getAttribute('features') ?? '';
    return raw
      .split('|')
      .map((s) => s.trim())
      .filter(Boolean);
  }

  render() {
    const title = this.getAttribute('title') ?? 'Plan';
    const price = this.getAttribute('price') ?? '';
    const buttonLabel = this.getAttribute('button-label') ?? 'Get started';
    const highlighted = this.hasAttribute('highlighted');
    const features = this.getFeatureItems();

    const featureMarkup = features
      .map((text) => `<li>${escapeHtml(text)}</li>`)
      .join('');

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          box-sizing: border-box;
        }

        .pricing {
          width: 300px;
          max-width: 100%;
          margin: auto;
          background-color: #fff;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.12);
          border-radius: 8px;
          padding: 1.25rem;
          text-align: left;
          box-sizing: border-box;
        }

        .pricing--highlighted {
          outline: 2px solid #2563eb;
          box-shadow: 0 4px 16px rgba(37, 99, 235, 0.2);
        }

        .title {
          margin: 0 0 0.5rem;
          font-size: 1.375rem;
          font-weight: bold;
          line-height: 1.3;
        }

        .price {
          margin: 0 0 1rem;
          font-size: 1.125rem;
          color: #15803d;
        }

        .features {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .features li {
          padding: 0.5rem 0;
          border-bottom: 1px solid #eee;
        }

        .features li:last-child {
          border-bottom: none;
        }

        .btn {
          display: block;
          width: 100%;
          margin-top: 1rem;
          padding: 0.625rem 1.25rem;
          background: #2563eb;
          color: #fff;
          font-size: 1rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }

        .btn:hover {
          background: #1d4ed8;
        }

        .btn:focus-visible {
          outline: 2px solid #1d4ed8;
          outline-offset: 2px;
        }
      </style>

      <article class="pricing${highlighted ? ' pricing--highlighted' : ''}">
        <h2 class="title">${escapeHtml(title)}</h2>
        <p class="price">${escapeHtml(price)}</p>
        <ul class="features">${featureMarkup}</ul>
        <button type="button" class="btn">${escapeHtml(buttonLabel)}</button>
      </article>
    `;

    this.shadowRoot.querySelector('.btn')?.addEventListener('click', () => {
      this.dispatchEvent(
        new CustomEvent('pricing-card-cta', { bubbles: true, composed: true })
      );
    });
  }
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

customElements.define('pricing-card', PricingCard);
