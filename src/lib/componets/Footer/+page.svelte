<script>
  import { base } from '$app/paths';
</script>
<footer>
  <div class="wave">
    <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#fff"/>
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
      <p class="title">Dove siamo</p>
      <p>Via Ragusa, 5g, 10137 Torino TO</p>
      <p><a href="tel:+390111234567">0115858822</a></p>
      <p>Lun–Dom · 18:00–22:30</p>
    </div>
  </div>

  <div class="bottom">
    © 2026 Pizzeria Dal Cornuto · Torino
  </div>
</footer>

<style>
  footer {
    background: #f7efe5;
    color: #4a372f;
  }

  .wave { line-height: 0; margin-top: -2px; }
  .wave svg { width: 100%; height: 80px; display: block; }

  .body {
    max-width: 1500px;
    margin: 0 auto;
    padding: 3rem 2rem 2rem;
    display: grid;
    grid-template-columns: 1.4fr 1fr 1fr;
    gap: 2rem;
  }

  .logo {
    font-family: 'Anton', sans-serif;
    font-size: 1.7rem;
    letter-spacing: 0.05em;
    color: #b20d0d;
    margin: 0 0 0.4rem;
  }

  .logo span { color: #1b1210; }
  .sub { font-size: 0.88rem; color: #6d5349; margin: 0; }

  .title {
    font-size: 0.75rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #b20d0d;
    margin: 0 0 0.8rem;
  }

  p,
  a {
    font-size: 0.92rem;
    margin: 0.3rem 0;
    color: #4a372f;
    text-decoration: none;
  }

  a:hover {
    color: #b20d0d;
  }

  .bottom {
    border-top: 1px solid rgba(178, 13, 13, 0.12);
    text-align: center;
    padding: 1rem 2rem;
    font-size: 0.78rem;
    color: #80645a;
  }

  @media (max-width: 680px) {
    .body { grid-template-columns: 1fr; }
  }
</style>