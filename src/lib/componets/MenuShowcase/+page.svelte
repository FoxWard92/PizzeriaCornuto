<script lang="ts">
  import { base } from "$app/paths";
  import menuData from "$lib/menu_strutturato.json";

  type PizzaUI = {
    name: string;
    description: string;
    price: number;
    image: string;
  };

  // Genera il percorso immagine dalla categoria:
  // "Pizze classiche" → /asset/menushowcase/pizze_classiche.jpeg
  // "Calzoni"         → /asset/menushowcase/calzoni.jpeg
  const categoryToImage = (categoria: string): string => {
    const filename = categoria
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "_");
    return `${base}/asset/menushowcase/${filename}.jpeg`;
  };

  // Immagine di fallback globale se la categoria non è mappata
  const fallbackImage = `${base}/asset/menushowcase/default.jpeg`;

  const getAllPizzas = (): PizzaUI[] => {
    const allItems: PizzaUI[] = [];
    for (const categoria of Object.keys(menuData) as Array<keyof typeof menuData>) {
      const lista = menuData[categoria];
      if (!Array.isArray(lista)) continue;
      const image = categoryToImage(categoria);
      for (const item of lista) {
        if (!item.nome || item.prezzo === undefined) continue;
        allItems.push({
          name: item.nome,
          description: item.descrizione ?? "Descrizione non disponibile",
          price: item.prezzo,
          image,
        });
      }
    }
    return allItems;
  };

  const getRandomPizzas = (pool: PizzaUI[], n: number): PizzaUI[] =>
    [...pool].sort(() => Math.random() - 0.5).slice(0, Math.min(n, pool.length));

  const formatPrice = (price: number): string =>
    price % 1 === 0
      ? `€${price}`
      : `€${price.toFixed(2).replace(".", ",")}`;

  const allPizzas = getAllPizzas();
  const isValid = allPizzas.length > 0;
  const pizzas: PizzaUI[] = getRandomPizzas(allPizzas, 4);

  let selectedPizza = $state<PizzaUI>(pizzas[0]);

  function selectPizza(pizza: PizzaUI): void {
    selectedPizza = pizza;
  }
</script>

{#if isValid}
  <section class="menu-section">
    <div class="menu-inner">
      <header class="menu-head">
        <span class="menu-eyebrow">Menu</span>
        <h2 class="menu-title">Le pizze che amiamo</h2>
      </header>

      <!-- ul + li + button: semantica corretta, nessun conflitto di ruoli ARIA -->
      <ul class="menu-showcase" aria-label="Anteprima menu">
        {#each pizzas as pizza, i}
          <li class="showcase-item">
            <!-- svelte-ignore event_directive_deprecated -->
            <!-- svelte-ignore a11y_no_interactive_element_to_noninteractive_role -->
            <button
              type="button"
              class="showcase-card"
              class:showcase-card--active={selectedPizza.name === pizza.name}
              aria-pressed={selectedPizza.name === pizza.name}
              aria-label="{pizza.name} – {pizza.description}"
              on:click={() => selectPizza(pizza)}
            >
              <img
                src={pizza.image}
                alt=""
                aria-hidden="true"
                class="showcase-card__bg"
                loading="lazy"
                decoding="async"
              />
              <div class="showcase-card__overlay" aria-hidden="true"></div>
              <span class="showcase-card__index" aria-hidden="true">{i + 1}</span>
              <div class="showcase-card__info" aria-hidden={selectedPizza.name !== pizza.name}>
                <strong class="showcase-card__name">{pizza.name}</strong>
                <p class="showcase-card__desc">{pizza.description}</p>
                <span class="showcase-card__price">{formatPrice(pizza.price)}</span>
              </div>
            </button>
          </li>
        {/each}
      </ul>
    </div>
  </section>
{/if}

<style>
  /* ============================================================
     WRAPPER SEZIONE
  ============================================================ */

  .menu-section {
    background: var(--color-page-bg);
  }

  .menu-inner {
    max-width: var(--site-max-w);
    margin-inline: auto;
    padding-inline: var(--site-px);
    padding-block: var(--section-py);
  }

  /* ============================================================
     INTESTAZIONE
  ============================================================ */

  .menu-head {
    margin-block-end: 2.5rem;
  }

  .menu-eyebrow {
    display: inline-block;
    color: var(--color-brand);
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: var(--tracking-widest);
    text-transform: uppercase;
  }

  .menu-title {
    margin: 0.6rem 0 0;
    font-size: var(--font-size-section-h2);
    line-height: var(--line-height-tight);
    color: var(--color-text-heading);
  }

  /* ============================================================
     SHOWCASE — layout orizzontale (desktop)
  ============================================================ */

  .menu-showcase {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: stretch;
    block-size: 380px;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  /* Il <li> si comporta come il vecchio flex-item */
  .showcase-item {
    display: flex;
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 72px;
    transition:
      flex-grow 0.55s cubic-bezier(0.4, 0, 0.2, 1),
      flex-basis 0.55s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Li attivo si espande */
  .showcase-item:has(.showcase-card--active) {
    flex-grow: 1;
    flex-basis: 0;
  }

  .showcase-card {
    position: relative;
    overflow: hidden;
    border-radius: 28px;
    width: 100%;
    cursor: pointer;
    border: none;
    padding: 0;
    background: none;
  }

  /* ============================================================
     CARD — contenuto interno
  ============================================================ */

  .showcase-card__bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    pointer-events: none;
  }

  .showcase-card__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.72) 0%,
      rgba(0, 0, 0, 0.18) 55%,
      rgba(0, 0, 0, 0.08) 100%
    );
    pointer-events: none;
  }

  .showcase-card__index {
    position: absolute;
    top: 1rem;
    left: 1rem;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.55);
    color: #fff;
    font-size: 0.8rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    border: 1.5px solid rgba(255, 255, 255, 0.4);
  }

  .showcase-card__info {
    position: absolute;
    bottom: 1.5rem;
    left: 1.5rem;
    right: 1.5rem;
    z-index: 2;
    color: #fff;
    opacity: 0;
    transform: translateY(8px);
    transition:
      opacity 0.3s ease 0.2s,
      transform 0.3s ease 0.2s;
    pointer-events: none;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
  }

  .showcase-card--active .showcase-card__info {
    opacity: 1;
    transform: translateY(0);
    white-space: normal;
    overflow: visible;
  }

  .showcase-card__name {
    display: block;
    font-size: 1.25rem;
    font-weight: 700;
    margin-block-end: 0.4rem;
    line-height: 1.2;
  }

  .showcase-card__desc {
    margin: 0 0 0.75rem;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.85);
    line-height: 1.5;
    max-width: 42ch;
  }

  .showcase-card__price {
    display: inline-block;
    background: var(--color-brand);
    color: #fff;
    font-size: 0.9rem;
    font-weight: 700;
    padding: 0.3rem 0.9rem;
    border-radius: var(--radius-pill);
  }

  /* ============================================================
     MEDIA QUERIES — tablet
  ============================================================ */

  @media (max-width: 800px) {
    .menu-showcase {
      block-size: 300px;
      gap: 0.65rem;
    }

    .showcase-item {
      flex-basis: 52px;
    }

    .showcase-card {
      border-radius: 20px;
    }

    .showcase-card__name {
      font-size: 1rem;
    }

    .showcase-card__desc {
      display: none;
    }
  }

  /* ============================================================
     MEDIA QUERIES — mobile: layout verticale
     Le card passano da strisce orizzontali a strisce verticali.
     La card attiva si espande in altezza invece che in larghezza.
  ============================================================ */

  @media (max-width: 580px) {
    .menu-showcase {
      flex-direction: column;
      block-size: auto;         /* altezza automatica: cresce con le card */
      gap: 0.6rem;
    }

    /* In verticale il li gestisce l'altezza invece della larghezza */
    .showcase-item {
      flex-basis: 60px;         /* altezza di default della card chiusa */
      flex-grow: 0;
      flex-shrink: 0;
      /* La transizione ora anima block-size tramite flex-basis */
      transition:
        flex-grow 0.55s cubic-bezier(0.4, 0, 0.2, 1),
        flex-basis 0.55s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .showcase-item:has(.showcase-card--active) {
      flex-grow: 0;
      flex-basis: 260px;        /* altezza della card aperta su mobile */
    }

    .showcase-card {
      border-radius: 16px;
      height: 100%;             /* riempie l'altezza data dal li */
    }

    /* Su mobile il numero è in alto a sinistra, le info in basso */
    .showcase-card__index {
      width: 1.6rem;
      height: 1.6rem;
      font-size: 0.7rem;
      top: 0.85rem;
      left: 0.85rem;
    }

    .showcase-card__info {
      bottom: 1rem;
      left: 1rem;
      right: 1rem;
    }

    .showcase-card__name {
      font-size: 1rem;
    }

    /* La descrizione è nascosta su mobile per spazio */
    .showcase-card__desc {
      display: none;
    }
  }
</style>