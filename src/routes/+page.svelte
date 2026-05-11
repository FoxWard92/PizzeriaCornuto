<script lang="ts">

  /**
   * Tipo che descrive una pizza nel menu.
   * Modificare qui se si aggiungono campi (es. allergeni, categoria).
   */
  type Pizza = {
    name: string;
    description: string;
    price: string;
    image: string;
    rotate: number /* gradi di rotazione decorativa dell'immagine */;
    filter: string /* CSS filter per variare il look visivo */;
  };

  const pizzas: Pizza[] = [
    {
      name: "Mortadella",
      description: "Fior di latte, mortadella IGP e granella di pistacchio.",
      price: "13€",
      image: `/asset/pizze/diavola.jpeg`,
      rotate: -10,
      filter: "contrast(1.05) saturate(1.1)",
    },
    {
      name: "Bufala e Datterini",
      description: "Bufala DOP, datterini rossi e gialli, basilico fresco.",
      price: "14€",
      image: `/asset/pizze/diavola.jpeg`,
      rotate: 12,
      filter: "sepia(0.08) saturate(1.2)",
    },
    {
      name: "Diavola",
      description: "Salame piccante, mozzarella, pomodoro e peperoncino.",
      price: "12€",
      image: `/asset/pizze/diavola.jpeg`,
      rotate: -16,
      filter: "brightness(1.05) contrast(1.08)",
    },
  ];

  let selectedPizza = $state(pizzas[0]);

  function selectPizza(pizza: Pizza): void {
    selectedPizza = pizza;
  }
</script>

<!--
  ═══════════════════════════════════════════════════════════
  HERO
  ───────────────────────────────────────────────────────────
  Struttura a due livelli:
    <header class="hero">   → vincola larghezza e sfondo
      <div class="hero__bg"> → immagine reale con object-fit
      <div class="hero__inner"> → griglia del contenuto
  ═══════════════════════════════════════════════════════════
-->
<header class="hero" aria-label="Benvenuto in Pizzeria Dal Cornuto">
  <!--
    Sfondo come <img> reale anziché background-image CSS:
    object-fit: cover funziona come background-size: cover
    ma è vincolato al box del contenitore (.hero con max-width),
    quindi su monitor ultrawide non si stira oltre --site-max-w.
  -->
  <div class="hero__bg" aria-hidden="true">
    <img
      src="/asset/icon/home.jpeg"
      alt=""
      width="1920"
      height="1080"
      loading="eager"
      decoding="async"
      fetchpriority="high"
    />
  </div>

  <div class="hero__inner">
    <!-- Colonna sinistra: testo e CTA -->
    <div class="hero__copy">
      <p class="hero__eyebrow">Pizzeria Dal Cornuto · Torino</p>

      <h1 class="hero__title">
        Pizza artigianale,
        <em class="hero__title-em">sapore vero</em>
      </h1>

      <p class="hero__description">
        Impasti lenti, ingredienti freschi e servizio veloce: da noi ordini e
        ritiri o ricevi a domicilio con un solo squillo.
      </p>

      <!-- <nav> perché sono link di navigazione, non azioni di form -->
      <nav class="hero__actions" aria-label="Azioni principali">
        <a class="btn btn--primary" href="/menu">Scopri il menu</a>
        <a class="btn btn--outline" href="/contatti">Chiama per asporto</a>
      </nav>

      <p class="hero__note">
        Chiama ora per prenotare: asporto, ritiro in negozio o consegna a
        domicilio a Torino.
      </p>
    </div>

    <!-- Colonna destra: card pizza in evidenza -->
    <aside class="hero__panel" aria-label="Pizza in evidenza">
      <article class="panel-card">
        <!--
          <figure> per immagine decorativa della pizza.
          aria-hidden perché è solo ornamentale rispetto
          al testo descrittivo della card.
        -->
        <figure class="panel-card__thumb" aria-hidden="true">
          <img
            src="/asset/pizze/diavola.jpeg"
            alt="Margherita classica"
            width="200"
            height="200"
            loading="eager"
            decoding="async"
          />
        </figure>

        <p class="panel-card__tag">Specialità</p>
        <h2 class="panel-card__name">Margherita classica</h2>
        <p class="panel-card__description">
          Pomodoro, mozzarella fresca, basilico e un filo d'olio extravergine.
        </p>
        <p class="panel-card__price">9€</p>
      </article>
    </aside>
  </div>
  <!-- /hero__inner -->

  <!-- Onda SVG decorativa: separa visivamente hero dalla sezione successiva -->
  <div class="hero__wave" aria-hidden="true">
    <svg
      viewBox="0 0 1440 88"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      focusable="false"
      role="presentation"
    >
      <path
        d="M0,44 C360,88 720,0 1080,44 C1260,66 1380,22 1440,44 L1440,88 L0,88 Z"
        fill="var(--color-page-bg)"
      />
    </svg>
  </div>
</header>

<!--
  ═══════════════════════════════════════════════════════════
  BENEFITS
  Ogni .section usa il pattern:
    .section      → sfondo pieno, padding verticale
    .section__inner → max-width centrato, padding orizzontale
  ═══════════════════════════════════════════════════════════
-->
<section class="section benefits">
  <div class="section__inner">
    <header class="section-head">
      <span class="eyebrow">Perché noi</span>
      <h2>Un'esperienza semplice e affidabile</h2>
      <p>
        Una pizzeria orientata al gusto autentico, con un design pulito e una
        navigazione chiara.
      </p>
    </header>

    <ul class="benefit-grid" role="list">
      <li>
        <article class="experience-card experience-card--impasto">
          <div class="experience-card__layer" aria-hidden="true"></div>
          <div class="experience-card__copy">
            <strong>Impasto naturale</strong>
            <p>48 ore di lievitazione con farine selezionate.</p>
          </div>
          <span class="experience-card__label">Impasto</span>
        </article>
      </li>
      <li>
        <article class="experience-card experience-card--forno">
          <div class="experience-card__layer" aria-hidden="true"></div>
          <div class="experience-card__copy">
            <strong>Forno a legna</strong>
            <p>Cottura perfetta per una pizza croccante e morbida.</p>
          </div>
          <span class="experience-card__label">Forno</span>
        </article>
      </li>
      <li>
        <article class="experience-card experience-card--asporto">
          <div class="experience-card__layer" aria-hidden="true"></div>
          <div class="experience-card__copy">
            <strong>Asporto facile</strong>
            <p>Chiama e ordina la tua pizza da ritirare in negozio.</p>
          </div>
          <span class="experience-card__label">Asporto</span>
        </article>
      </li>
    </ul>
  </div>
</section>

<!--
  ═══════════════════════════════════════════════════════════
  MENU PREVIEW
  ═══════════════════════════════════════════════════════════
-->
<section class="section menu-preview">
  <div class="section__inner">
    <header class="section-head">
      <span class="eyebrow">Menu</span>
      <h2>Le pizze che amiamo</h2>
    </header>

    <div class="menu-interactive">
      <!-- Lista pizze selezionabili -->
      <ul class="menu-list" role="list">
        {#each pizzas as pizza}
          <li>
            <button
              type="button"
              class="menu-card-button"
              class:active={selectedPizza.name === pizza.name}
              aria-pressed={selectedPizza.name === pizza.name}
              onclick={() => selectPizza(pizza)}
            >
              <div class="menu-card-button__text">
                <strong>{pizza.name}</strong>
                <p>{pizza.description}</p>
              </div>
              <span class="menu-card-button__price">{pizza.price}</span>
            </button>
          </li>
        {/each}
      </ul>

      <!-- Anteprima visiva della pizza selezionata -->
      <div
        class="menu-image-panel"
        aria-live="polite"
        aria-label="Immagine pizza selezionata"
      >
        <div class="menu-image-frame">
          <img
            src={selectedPizza.image}
            alt={selectedPizza.name}
            style="transform: rotate({selectedPizza.rotate}deg); filter: {selectedPizza.filter};"
          />
        </div>
        <footer class="menu-image-caption">
          <strong>{selectedPizza.name}</strong>
          <span>{selectedPizza.price}</span>
        </footer>
      </div>
    </div>
  </div>
</section>

<style>
  :root {
    /* ── Layout ───────────────────────────────────────────
       --site-max-w : larghezza massima del contenuto.
                      Cambia qui per allargare/restringere tutto.
       --site-px    : padding orizzontale fluido (mobile → desktop).
       --section-py : padding verticale delle sezioni.
    ──────────────────────────────────────────────────── */
    --site-max-w: 1500px;
    --site-px: clamp(1rem, 5vw, 3rem);
    --section-py: 4rem;

    /* ── Brand ────────────────────────────────────────────
       Cambia --color-brand per ridipingere l'intero sito.
    ──────────────────────────────────────────────────── */
    --color-brand: #b20d0d;
    --color-brand-hover: #d23535;
    --color-brand-subtle: rgba(178, 13, 13, 0.08);
    --color-brand-glow: rgba(178, 13, 13, 0.35);
    --color-brand-border: rgba(178, 13, 13, 0.12);

    /* ── Superfici ────────────────────────────────────────
       Sfondo pagina e card bianche.
    ──────────────────────────────────────────────────── */
    --color-page-bg: #faf7f4;
    --color-surface: #ffffff;
    --color-surface-hover: #fff9f7;
    --color-surface-active: #fff3f0;

    /* ── Testo ────────────────────────────────────────────
       Tre livelli: titoli, corpo, secondario.
    ──────────────────────────────────────────────────── */
    --color-text-heading: #1b1210;
    --color-text-body: #4a372f;
    --color-text-muted: #6f3c35;

    /* ── Hero ─────────────────────────────────────────────
       Token isolati: cambiano solo l'hero, non il resto.
       --hero-overlay-*: i tre stop del gradiente scuro sopra la foto.
    ──────────────────────────────────────────────────── */
    --hero-overlay-from: rgba(10, 4, 2, 0.72);
    --hero-overlay-mid: rgba(30, 8, 5, 0.52);
    --hero-overlay-to: rgba(10, 4, 2, 0.68);
    --hero-overlay: linear-gradient(
      135deg,
      var(--hero-overlay-from) 0%,
      var(--hero-overlay-mid) 50%,
      var(--hero-overlay-to) 100%
    );

    --hero-text: #ffffff;
    --hero-text-muted: rgba(255, 240, 235, 0.85);
    --hero-text-note: rgba(255, 210, 200, 0.78);
    --hero-accent: #f87171;
    --hero-eyebrow-bg: rgba(178, 13, 13, 0.22);
    --hero-eyebrow-border: rgba(255, 150, 120, 0.25);
    --hero-eyebrow-color: rgba(255, 200, 180, 0.92);
    --hero-blob-color: rgba(178, 13, 13, 0.1);
    --hero-wave-h: 80px;

    /* ── Tipografia ───────────────────────────────────────
       Usa clamp() per fluid type senza media query aggiuntive.
    ──────────────────────────────────────────────────── */
    --font-size-hero: clamp(2.4rem, 4vw, 4.5rem);
    --font-size-section-h2: clamp(2rem, 4vw, 3rem);
    --font-size-card-title: 1.9rem;
    --font-size-label: 0.75rem;
    --font-size-body: 0.95rem;
    --font-size-small: 0.85rem;

    --line-height-tight: 1.05;
    --line-height-body: 1.75;
    --line-height-relaxed: 1.7;

    --tracking-wide: 0.1em;
    --tracking-wider: 0.22em;
    --tracking-widest: 0.25em;

    /* ── Raggi ────────────────────────────────────────────
       --radius-pill: per badge e bottoni
       --radius-card: per card grandi
       --radius-sm:   per card piccole (menu button)
    ──────────────────────────────────────────────────── */
    --radius-pill: 999px;
    --radius-card: 28px;
    --radius-card-inner: 26px;
    --radius-sm: 24px;
    --radius-img: 32px;

    /* ── Ombre ────────────────────────────────────────────
       Definite una volta, applicate via variabile.
    ──────────────────────────────────────────────────── */
    --shadow-card-rest: 0 20px 60px rgba(0, 0, 0, 0.28),
      0 0 0 1px rgba(178, 13, 13, 0.06);
    --shadow-card-hover: 0 32px 80px rgba(0, 0, 0, 0.36),
      0 0 0 1px rgba(178, 13, 13, 0.08);
    --shadow-thumb: 0 16px 32px rgba(178, 13, 13, 0.22);
    --shadow-btn-primary: 0 10px 28px var(--color-brand-glow);
    --shadow-btn-primary-hover: 0 16px 36px var(--color-brand-glow);
    --shadow-section-card: 0 30px 80px rgba(0, 0, 0, 0.12);
    --shadow-menu-frame: 0 28px 60px rgba(0, 0, 0, 0.06);
    --shadow-menu-btn-active: 0 22px 46px rgba(178, 13, 13, 0.25);

    /* ── Animazioni ───────────────────────────────────────
       Tutte le transition usano queste variabili.
       Per ridurre il moto (accessibilità): ridefinisci a 0s in
       @media (prefers-reduced-motion: reduce).
    ──────────────────────────────────────────────────── */
    --duration-fast: 0.2s;
    --duration-medium: 0.25s;
    --duration-slow: 0.35s;
    --ease-base: ease;
    --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);

    --transition-base: transform var(--duration-fast) var(--ease-base),
      box-shadow var(--duration-fast) var(--ease-base),
      background var(--duration-fast) var(--ease-base),
      border-color var(--duration-fast) var(--ease-base);
    --transition-card: transform var(--duration-medium) var(--ease-base),
      box-shadow var(--duration-medium) var(--ease-base);
    --transition-thumb: transform var(--duration-slow) var(--ease-base);
  }

  /* Rispetta la preferenza utente per il moto ridotto */
  @media (prefers-reduced-motion: reduce) {
    :root {
      --duration-fast: 0s;
      --duration-medium: 0s;
      --duration-slow: 0s;
    }
  }

  .section__inner,
  .hero__inner {
    max-width: var(--site-max-w);
    margin-inline: auto;
    padding-inline: var(--site-px);
  }

  .hero {
    position: relative;
    overflow: hidden;
    max-width: var(--site-max-w);
    margin-inline: auto;
  }

  /* Overlay scuro sopra la foto (z-index 1, sotto il contenuto) */
  .hero::after {
    content: "";
    position: absolute;
    inset: 0;
    background: var(--hero-overlay);
    pointer-events: none;
    z-index: 1;
  }

  /* Immagine di sfondo come elemento reale —
     si ferma esattamente ai bordi di .hero */
  .hero__bg {
    position: absolute;
    inset: 0;
    z-index: 0;
  }

  .hero__bg img {
    inline-size: 100%;
    block-size: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
  }

  /* Griglia del contenuto — z-index 2, sopra l'overlay */
  .hero__inner {
    position: relative;
    z-index: 2;
    padding-block: 8rem 6rem;
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    align-items: center;
    gap: 2rem;
  }

  /* ── Copy ──────────────────────────────────────────── */
  .hero__copy {
    position: relative;
    max-width: 56ch;
  }

  /* Blob decorativo sfumato — solo visivo */
  .hero__copy::before {
    content: "";
    position: absolute;
    inset-block-start: -4rem;
    inset-inline-start: -5rem;
    inline-size: 28rem;
    block-size: 28rem;
    border-radius: 30% 70% 60% 40% / 40% 30% 70% 60%;
    background: var(--hero-blob-color);
    filter: blur(48px);
    pointer-events: none;
    z-index: -1;
  }

  .hero__eyebrow {
    display: inline-block;
    margin-block-end: 1rem;
    padding-block: 0.3rem;
    padding-inline: 0.9rem;
    border-radius: var(--radius-pill);
    border: 1px solid var(--hero-eyebrow-border);
    background: var(--hero-eyebrow-bg);
    color: var(--hero-eyebrow-color);
    font-size: var(--font-size-label);
    font-weight: 600;
    letter-spacing: var(--tracking-wider);
    text-transform: uppercase;
  }

  .hero__title {
    margin: 0;
    font-size: var(--font-size-hero);
    line-height: var(--line-height-tight);
    color: var(--hero-text);
    text-shadow: 0 2px 20px rgba(0, 0, 0, 0.4);
  }

  .hero__title-em {
    display: block;
    font-style: normal;
    color: var(--hero-accent);
  }

  .hero__description {
    margin-block: 1.5rem 0;
    max-width: 44ch;
    color: var(--hero-text-muted);
    line-height: var(--line-height-body);
  }

  .hero__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-block-start: 2.5rem;
  }

  .hero__note {
    margin-block-start: 1.25rem;
    margin-block-end: 0;
    color: var(--hero-text-note);
    font-size: var(--font-size-small);
    font-weight: 600;
  }

  /* ── Panel ─────────────────────────────────────────── */
  .hero__panel {
    display: grid;
    place-items: center;
  }

  /* ── Panel card ────────────────────────────────────── */
  .panel-card {
    position: relative;
    width: min(100%, 400px);
    padding: 2rem;
    border-radius: var(--radius-card);
    background: rgba(255, 252, 250, 0.93);
    border: 1px solid rgba(255, 255, 255, 0.72);
    box-shadow: var(--shadow-card-rest);
    transition: var(--transition-card);
    overflow: visible;
  }

  .panel-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-card-hover);
  }

  .panel-card__thumb {
    position: absolute;
    inset-block-start: -3.5rem;
    inset-inline-end: -2.5rem;
    inline-size: 180px;
    block-size: 180px;
    margin: 0;
    border-radius: 50%;
    overflow: hidden;
    border: 2.5px solid rgba(255, 255, 255, 0.85);
    box-shadow: var(--shadow-thumb);
    transform: rotate(-18deg);
    transition: var(--transition-thumb);
    z-index: 1;
  }

  .panel-card__thumb:hover {
    transform: rotate(0deg) scale(1.06);
  }

  .panel-card__thumb img {
    inline-size: 100%;
    block-size: 100%;
    object-fit: cover;
    display: block;
  }

  .panel-card__tag {
    margin: 0 0 0.4rem;
    color: var(--color-brand);
    font-size: var(--font-size-label);
    font-weight: 700;
    letter-spacing: var(--tracking-wider);
    text-transform: uppercase;
  }

  .panel-card__name {
    margin: 0.5rem 0 0.75rem;
    font-size: var(--font-size-card-title);
    line-height: var(--line-height-tight);
    color: var(--color-text-heading);
  }

  .panel-card__description {
    margin: 0;
    color: var(--color-text-body);
    line-height: var(--line-height-body);
    font-size: var(--font-size-body);
  }

  .panel-card__price {
    margin-block-start: 1.5rem;
    margin-block-end: 0;
    color: var(--color-brand);
    font-size: 1.15rem;
    font-weight: 700;
  }

  /* ── Onda SVG separatrice ──────────────────────────── */
  .hero__wave {
    position: absolute;
    inset-block-end: -1px;
    inset-inline: 0;
    z-index: 3;
    line-height: 0;
    pointer-events: none;
  }

  .hero__wave svg {
    display: block;
    inline-size: 100%;
    block-size: var(--hero-wave-h);
  }

  /*
  ═══════════════════════════════════════════════════════════════
  BOTTONI
  ═══════════════════════════════════════════════════════════════
  */
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding-block: 0.95rem;
    padding-inline: 2rem;
    border-radius: var(--radius-pill);
    font-size: 0.875rem;
    font-weight: 700;
    letter-spacing: var(--tracking-wide);
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;
    transition: var(--transition-base);
  }

  .btn:hover {
    transform: translateY(-2px);
  }

  .btn--primary {
    background: var(--color-brand);
    color: var(--hero-text);
    box-shadow: var(--shadow-btn-primary);
  }

  .btn--primary:hover {
    background: var(--color-brand-hover);
    box-shadow: var(--shadow-btn-primary-hover);
  }

  .btn--outline {
    background: rgba(255, 255, 255, 0.08);
    border: 1.5px solid rgba(255, 255, 255, 0.6);
    color: var(--hero-text);
  }

  .btn--outline:hover {
    background: rgba(255, 255, 255, 0.16);
    border-color: var(--hero-text);
  }

  /*
  ═══════════════════════════════════════════════════════════════
  SEZIONI GENERICHE
  ═══════════════════════════════════════════════════════════════
  */
  .section {
    background: var(--color-page-bg);
  }

  .section .section__inner {
    padding-block: var(--section-py);
  }

  /* Intestazione di sezione — tag <header> semantico */
  .section-head {
    margin-block-end: 2.5rem;
  }

  .section-head h2 {
    margin: 0.6rem 0 0;
    font-size: var(--font-size-section-h2);
    line-height: var(--line-height-tight);
    color: var(--color-text-heading);
  }

  .section-head p {
    margin-block-start: 0.75rem;
    color: var(--color-text-body);
    line-height: var(--line-height-body);
    max-width: 60ch;
  }

  .eyebrow {
    display: inline-block;
    color: var(--color-brand);
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: var(--tracking-widest);
    text-transform: uppercase;
  }

  /*
  ═══════════════════════════════════════════════════════════════
  BENEFIT GRID
  ═══════════════════════════════════════════════════════════════
  */

  /* <ul role="list"> — reset stile lista */
  .benefit-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.75rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .experience-card {
    position: relative;
    overflow: hidden;
    min-block-size: 280px;
    border-radius: 30px;
    background-size: cover;
    background-position: center;
    box-shadow: var(--shadow-section-card);
    transition:
      transform var(--duration-slow) var(--ease-base),
      box-shadow var(--duration-slow) var(--ease-base);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 1.8rem;
  }

  .experience-card::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.16),
      rgba(16, 8, 5, 0.92)
    );
    pointer-events: none;
  }

  .experience-card::after {
    content: "";
    position: absolute;
    inset: 6px;
    border-radius: var(--radius-card-inner);
    border: 1px solid rgba(255, 255, 255, 0.45);
    pointer-events: none;
  }

  .experience-card:hover {
    transform: translateY(-6px) perspective(1000px) rotateX(3deg);
    box-shadow: 0 38px 100px rgba(0, 0, 0, 0.18);
  }

  .experience-card__layer {
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at top left,
      rgba(255, 255, 255, 0.35),
      transparent 25%
    );
    pointer-events: none;
  }

  .experience-card__copy {
    position: relative;
    z-index: 1;
  }

  .experience-card__copy strong {
    display: block;
    margin-block-end: 0.75rem;
    font-size: 1.25rem;
    color: var(--hero-text);
  }

  .experience-card__copy p {
    margin: 0;
    color: rgba(255, 255, 255, 0.92);
    line-height: var(--line-height-relaxed);
  }

  .experience-card__label {
    position: relative;
    z-index: 1;
    display: inline-flex;
    margin-block-start: 1.4rem;
    padding-block: 0.6rem;
    padding-inline: 1rem;
    border-radius: var(--radius-pill);
    background: rgba(255, 255, 255, 0.14);
    color: var(--hero-text);
    font-size: 0.8rem;
    letter-spacing: var(--tracking-wide);
    text-transform: uppercase;
    border: 1px solid rgba(255, 255, 255, 0.25);
  }

  /* Immagini di sfondo delle card — usa il colore brand come overlay */
  .experience-card--impasto {
    background-image: linear-gradient(
        rgba(178, 13, 13, 0.28),
        rgba(0, 0, 0, 0.35)
      ),
      url("/asset/pizze/diavola.jpeg");
  }

  .experience-card--forno {
    background-image: linear-gradient(
        rgba(178, 13, 13, 0.22),
        rgba(0, 0, 0, 0.44)
      ),
      url("/asset/pizze/diavola.jpeg");
  }

  .experience-card--asporto {
    background-image: linear-gradient(
        rgba(178, 13, 13, 0.16),
        rgba(0, 0, 0, 0.38)
      ),
      url("/asset/pizze/diavola.jpeg");
  }

  /*
  ═══════════════════════════════════════════════════════════════
  MENU PREVIEW
  ═══════════════════════════════════════════════════════════════
  */
  .menu-interactive {
    display: grid;
    grid-template-columns: minmax(240px, 1fr) minmax(320px, 1.4fr);
    gap: 2rem;
    align-items: start;
    margin-block-start: 1.5rem;
  }

  /* <ul role="list"> — reset stile lista */
  .menu-list {
    display: grid;
    gap: 1rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .menu-card-button {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    inline-size: 100%;
    padding-block: 1.25rem;
    padding-inline: 1.5rem;
    background: var(--color-surface);
    border: 1px solid var(--color-brand-border);
    border-radius: var(--radius-sm);
    box-shadow: 0 18px 34px rgba(0, 0, 0, 0.04);
    color: var(--color-text-heading);
    text-align: start;
    cursor: pointer;
    transition: var(--transition-base);
    min-block-size: 106px;
  }

  .menu-card-button:hover {
    transform: translateY(-2px);
    background: var(--color-surface-hover);
  }

  .menu-card-button.active {
    border-color: var(--color-brand);
    box-shadow: var(--shadow-menu-btn-active);
    background: var(--color-surface-active);
  }

  .menu-card-button__text strong {
    display: block;
    margin-block-end: 0.6rem;
    font-size: 1.05rem;
    color: var(--color-text-heading);
  }

  .menu-card-button__text p {
    margin: 0;
    color: var(--color-text-body);
    line-height: 1.6;
    max-inline-size: 280px;
  }

  .menu-card-button__price {
    color: var(--color-brand);
    font-weight: 700;
    white-space: nowrap;
    margin-inline-start: 1rem;
  }

  .menu-image-panel {
    display: grid;
    gap: 1.25rem;
  }

  .menu-image-frame {
    position: relative;
    border-radius: var(--radius-img);
    overflow: hidden;
    background: var(--color-surface);
    border: 1px solid var(--color-brand-border);
    box-shadow: var(--shadow-menu-frame);
    min-block-size: 360px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
  }

  .menu-image-frame::before {
    content: "";
    position: absolute;
    inset: 14px;
    border-radius: var(--radius-card-inner);
    background: radial-gradient(
      circle at top left,
      var(--color-brand-subtle),
      transparent 58%
    );
    pointer-events: none;
  }

  .menu-image-frame img {
    max-inline-size: 100%;
    block-size: auto;
    display: block;
    transition:
      transform 0.4s var(--ease-base),
      filter 0.4s var(--ease-base);
  }

  /* <footer> semantico come didascalia della card */
  .menu-image-caption {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-inline: 0.75rem;
    color: var(--color-text-heading);
    font-weight: 700;
  }

  .menu-image-caption strong {
    font-size: 1rem;
  }

  .menu-image-caption span {
    color: var(--color-brand);
  }

  /*
  ═══════════════════════════════════════════════════════════════
  RESPONSIVE — CSS Media Queries Level 4 (range syntax)
  ═══════════════════════════════════════════════════════════════
  */

  /* Tablet landscape */
  @media (width <= 980px) {
    .hero__inner {
      grid-template-columns: 1fr;
    }

    .benefit-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  /* Tablet portrait */
  @media (width <= 768px) {
    .hero__inner {
      padding-block: 6rem 4rem;
      gap: 1.5rem;
    }

    .hero__copy {
      max-width: none;
    }

    /* La card pizza va sopra il testo su mobile */
    .hero__panel {
      order: -1;
    }

    .hero__actions {
      flex-direction: column;
    }

    .btn {
      inline-size: 100%;
      text-align: center;
    }

    .hero__wave svg {
      block-size: calc(var(--hero-wave-h) * 0.6);
    }

    .benefit-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .experience-card {
      min-block-size: 240px;
    }

    .menu-interactive {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .menu-list {
      order: 2;
    }
    .menu-image-panel {
      order: 1;
    }
  }

  /* Mobile piccolo */
  @media (width <= 480px) {
    .hero__inner {
      padding-block: 5rem 3rem;
    }

    .panel-card__thumb {
      inline-size: 140px;
      block-size: 140px;
      inset-block-start: -2.5rem;
      inset-inline-end: -1.5rem;
    }

    .experience-card {
      min-block-size: 200px;
      padding: 1.5rem;
    }

    .menu-card-button {
      padding-block: 1rem;
      padding-inline: 1.25rem;
      min-block-size: 90px;
    }

    .menu-image-frame {
      min-block-size: 300px;
      padding: 1rem;
    }

    .menu-image-caption {
      padding-inline: 0.5rem;
    }
  }
</style>
