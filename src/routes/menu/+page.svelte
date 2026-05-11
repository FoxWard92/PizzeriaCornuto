<script lang="ts">
  import { base } from "$app/paths";

  const menu = [
    {
      icon: "🍕",
      name: "Margherita",
      description: "Pomodoro, fior di latte, basilico, olio EVO",
      price: "9€",
      thumb: `${base}/asset/pizze/diavola.jpeg`,
    },
    {
      icon: "🥓",
      name: "Mortadella",
      description: "Fior di latte, mortadella IGP, granella di pistacchio",
      price: "13€",
      thumb: `${base}/asset/pizze/diavola.jpeg`,
    },
    {
      icon: "🧀",
      name: "Bufala e Datterini",
      description: "Bufala DOP, datterini gialli e rossi, basilico",
      price: "14€",
      thumb: `${base}/asset/pizze/diavola.jpeg`,
    },
    {
      icon: "🌶️",
      name: "Diavola",
      description: "Salame piccante, pomodoro, mozzarella, peperoncino",
      price: "12€",
      thumb: `${base}/asset/pizze/diavola.jpeg`,
    },
    {
      icon: "🧀",
      name: "Quattro Formaggi",
      description: "Mozzarella, gorgonzola, taleggio, parmigiano",
      price: "13€",
      thumb: `${base}/asset/pizze/diavola.jpeg`,
    },
    {
      icon: "🥬",
      name: "Vegetariana",
      description: "Verdure grigliate, fior di latte, pesto leggero",
      price: "11€",
      thumb: `${base}/asset/pizze/diavola.jpeg`,
    },
  ];
</script>

<section class="page-section">
  <div class="section-head">
    <span class="eyebrow">Menu</span>
    <h1>Le nostre pizze</h1>
    <p>
      Una selezione semplice, genuina e immediata per gustare il meglio della
      nostra cucina.
    </p>
  </div>

  <div class="menu-grid">
    {#each menu as item}
      <article class="menu-card">
        <div
          class="item-thumb"
          style="background-image: url('{item.thumb}');"
        ></div>

        <div class="item-content">
          <div class="item-icon">{item.icon}</div>
          <h2>{item.name}</h2>
          <p>{item.description}</p>
        </div>
        <strong>{item.price}</strong>
      </article>
    {/each}
  </div>
</section>

<style>
  .page-section {
    max-width: 1080px;
    margin: 0 auto;
    padding: 6rem 2rem 2rem;
  }

  .section-head {
    margin-bottom: 3rem;
    text-align: center;
  }

  .eyebrow {
    display: inline-flex;
    margin-bottom: 1rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    font-size: 0.75rem;
    color: #b20d0d;
  }

  h1 {
    margin: 0;
    font-size: clamp(2rem, 3.5vw, 3.4rem);
    color: #1b1210;
  }

  p {
    margin: 1rem auto 0;
    max-width: 640px;
    color: #5f443b;
    line-height: 1.7;
  }

  .menu-grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .menu-card {
    position: relative;
    z-index: 0;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: flex-start;
    gap: 1rem;
    background: #fff;
    border: 1px solid rgba(178, 13, 13, 0.12);
    border-radius: 20px;
    padding: 2rem 1.6rem 1.6rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
    transition: all 0.2s ease;
    overflow: visible;
    margin-top: 10px; /* Spazio per la thumb che esce fuori */
  }

  .item-thumb {
    position: absolute;
    top: -18px;
    left: -18px;
    width: 110px;
    height: 110px;
    border-radius: 50%;
    background-color: #fbe8e3;
    box-shadow: 0 28px 40px rgba(178, 13, 13, 0.18);
    border: 1px solid rgba(178, 13, 13, 0.18);
    background-size: cover;
    background-position: center;
    transform: rotate(-6deg);
    overflow: hidden;
    transition: transform 0.3s ease;
    z-index: 10;
  }

  .item-thumb:hover {
    transform: rotate(0deg) scale(1.1);
  }

  .item-thumb::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at 20% 20%,
      rgba(255, 255, 255, 0.55),
      transparent 38%
    );
    pointer-events: none;
  }

  .item-content {
    padding-left: 4.6rem;
    min-width: 0;
  }

  .menu-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 22px 50px rgba(0, 0, 0, 0.08);
    background: #fff7f3;
  }

  .item-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 12px;
    background: rgba(178, 13, 13, 0.08);
    color: #b20d0d;
    font-size: 1.2rem;
    margin-bottom: 0.7rem;
  }

  .menu-card h2 {
    margin: 0 0 0.35rem;
    font-size: 1.15rem;
    color: #1b1210;
  }

  .menu-card p {
    margin: 0;
    color: #6d5349;
    line-height: 1.6;
  }

  .menu-card strong {
    font-size: 1rem;
    color: #b20d0d;
  }

  @media (max-width: 820px) {
    .menu-grid {
      grid-template-columns: 1fr;
      gap: 2.5rem; /* Aumentato per via delle thumb che sporgono */
    }
  }
</style>
