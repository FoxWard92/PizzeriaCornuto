<script>
  import { base } from "$app/paths";
</script>

<footer>
  <div class="wave">
    <svg
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z"
        fill="var(--color-surface)"
      />
    </svg>
  </div>

  <div class="body">
    <div class="brand-col">
      <p class="logo">DAL <span>CORNUTO</span></p>
      <p class="sub">Pizzeria artigianale · Torino</p>
    </div>

    <div class="nav-col">
      <p class="title">Scopri</p>
      <nav>
        <a href="{base}/">
          <span class="link-icon">→</span> Home
        </a>
        <a href="{base}/menu">
          <span class="link-icon">→</span> Menu
        </a>
        <a href="{base}/contatti">
          <span class="link-icon">→</span> Contatti
        </a>
      </nav>
    </div>

    <div class="info-col">
      <p class="title">Info</p>
      <div class="info-block">
        <span class="info-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
        </span>
        <span>Via Roma 12, Torino</span>
      </div>
      <div class="info-block">
        <span class="info-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
        </span>
        <span>Mer–Dom: 19:00 – 23:30</span>
      </div>
      <p class="disclaimer">
        Le immagini dei prodotti sono a scopo illustrativo. Prezzi e disponibilità
        soggetti a variazioni senza preavviso.
      </p>
    </div>
  </div>

  <div class="bottom">
    <span>© 2026 Pizzeria Dal Cornuto · Torino</span>
  </div>
</footer>

<style>
  footer {
    background: var(--color-page-bg);
    color: var(--color-text-body);
  }

  /* ── Wave ── */
  .wave {
    line-height: 0;
    margin-top: -2px;
  }
  .wave svg {
    width: 100%;
    height: 80px;
    display: block;
  }

  /* ── Body grid ── */
  .body {
    max-width: var(--site-max-w);
    margin: 0 auto;
    padding: 3.5rem var(--site-px) 2.5rem;
    display: grid;
    grid-template-columns: 1.6fr 1fr 1.4fr;
    gap: 3rem;
  }

  /* ── Brand column ── */
  .logo {
    font-family: "Anton", sans-serif;
    font-size: 2rem;
    letter-spacing: 0.08em;
    color: var(--color-brand);
    margin: 0 0 0.35rem;
    line-height: 1;
  }
  .logo span {
    color: var(--color-text-heading);
  }
  .sub {
    font-size: var(--font-size-small);
    color: var(--color-text-muted, #888);
    margin: 0 0 1.25rem;
    letter-spacing: 0.04em;
  }

  /* ── Nav column ── */
  .title {
    font-size: 0.7rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    font-weight: 700;
    color: var(--color-brand);
    margin: 0 0 1rem;
  }
  nav {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  nav a {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: var(--font-size-small);
    color: var(--color-text-body);
    text-decoration: none;
    transition: color 0.2s, gap 0.2s;
  }
  nav a:hover {
    color: var(--color-brand);
    gap: 0.75rem;
  }
  .link-icon {
    font-size: 0.7rem;
    color: var(--color-brand);
    transition: transform 0.2s;
  }
  nav a:hover .link-icon {
    transform: translateX(3px);
  }

  /* ── Info column ── */
  .info-block {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    font-size: var(--font-size-small);
    color: var(--color-text-body);
    margin-bottom: 0.6rem;
  }
  .info-icon {
    flex-shrink: 0;
    color: var(--color-brand);
    margin-top: 1px;
  }
  .disclaimer {
    font-size: 0.72rem;
    color: var(--color-text-muted, #999);
    line-height: 1.6;
    margin: 1rem 0 0;
    border-top: 1px solid var(--color-brand-border);
    padding-top: 1rem;
  }

  /* ── Bottom bar ── */
  .bottom {
    border-top: 1px solid var(--color-brand-border);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    padding: 1.1rem var(--site-px);
    font-size: 0.72rem;
    color: var(--color-text-muted, #999);
    letter-spacing: 0.03em;
  }
  .separator {
    opacity: 0.4;
  }

  /* ── Responsive ── */
  @media (max-width: 860px) {
    .body {
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
    .brand-col {
      grid-column: 1 / -1;
      border-bottom: 1px solid var(--color-brand-border);
      padding-bottom: 1.5rem;
    }
  }

  @media (max-width: 480px) {
    .body {
      grid-template-columns: 1fr;
      gap: 1.75rem;
      padding: 2.5rem var(--site-px) 2rem;
    }
    .brand-col {
      border-bottom: 1px solid var(--color-brand-border);
      padding-bottom: 1.25rem;
    }
    .bottom {
      flex-direction: column;
      gap: 0.25rem;
      text-align: center;
    }
    .separator {
      display: none;
    }
  }
</style>