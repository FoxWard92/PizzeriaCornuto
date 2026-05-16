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
    <div>
      <p class="logo">DAL <span>CORNUTO</span></p>
      <p class="sub">Pizzeria artigianale · Torino</p>
    </div>

    <div>
      <p class="title">Scopri</p>
      <a href="{base}/">Home</a>
      <a href="{base}/menu">Menu</a>
      <a href="{base}/contatti">Contatti</a>
    </div>

    <div>
      <p class="title">info</p>
      <p class="disclaimer">
        Le immagini dei prodotti sono a scopo illustrativo e potrebbero non
        rappresentare fedelmente il prodotto finale. Prezzi e disponibilità sono
        soggetti a variazioni senza preavviso
      </p>
    </div>
  </div>

  <div class="bottom">© 2026 Pizzeria Dal Cornuto · Torino</div>
</footer>

<style>
  footer {
    background: var(--color-page-bg);
    color: var(--color-text-body);
  }

  .wave {
    line-height: 0;
    margin-top: -2px;
  }
  .wave svg {
    width: 100%;
    height: 80px;
    display: block;
  }

  .body {
    max-width: var(--site-max-w);
    margin: 0 auto;
    padding: 3rem var(--site-px) 2rem;
    display: grid;
    grid-template-columns: 1.4fr 1fr 1fr;
    gap: 2rem;
  }

  .logo {
    font-family: "Anton", sans-serif;
    font-size: 1.7rem;
    letter-spacing: var(--tracking-wide);
    color: var(--color-brand);
    margin: 0 0 0.4rem;
  }

  .logo span {
    color: var(--color-text-heading);
  }

  .sub {
    font-size: var(--font-size-small);
    color: var(--color-text-muted);
    margin: 0;
  }

  .title {
    font-size: var(--font-size-label);
    letter-spacing: var(--tracking-wider);
    text-transform: uppercase;
    color: var(--color-brand);
    margin: 0 0 0.8rem;
  }

  p,
  a {
    font-size: var(--font-size-small);
    margin: 0.3rem 0;
    color: var(--color-text-body);
    text-decoration: none;
  }

  a:hover {
    color: var(--color-brand);
  }

  .bottom {
    border-top: 1px solid var(--color-brand-border);
    text-align: center;
    padding: 1rem var(--site-px);
    font-size: var(--font-size-label);
    color: var(--color-text-muted);
  }

  @media (max-width: 680px) {
    .body {
      grid-template-columns: 1fr;
    }
  }
</style>
