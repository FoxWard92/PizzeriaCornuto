<script lang="ts">
  import "../../app.css";
  
  // Importiamo tutte le costanti generate dallo scraper nel file menu.js
  import * as menu from '$lib/menu.js';

  // Stato per la ricerca e per la categoria selezionata
  let searchTarget = "";
  let categoriaSelezionata = "tutti"; 

  // Struttura fissa ordinata a mano
  const categorieBase = [
    { id: 'pizze_classiche', defaultTitolo: '🍕Pizze Classiche', lista: menu.pizze_classiche || [] },
    { id: 'pizze_fritte', defaultTitolo: '🍟Pizze Fritte', lista: menu.pizze_fritte },
    { id: 'pizze_con_cornicione_ripieno', defaultTitolo: '🍕Pizze con Cornicione Ripieno', lista: menu.pizze_con_cornicione_ripieno },
    { id: 'pizze_vegane', defaultTitolo: '🥬 Pizze Vegane', lista: menu.pizze_vegane || [] },
    { id: 'panuozzi', defaultTitolo: '🌯Panuozzi', lista: menu.panuozzi || [] },
    { id: 'calzoni', defaultTitolo: '🥙Calzoni', lista: menu.calzoni || [] },
    { id: 'fritti', defaultTitolo: '🍟I Fritti e gli Sfizi', lista: menu.fritti || [] },
    { id: 'chiacchere', defaultTitolo: '🍕 Le Nostre Chiacchere', lista: menu.chiacchere || [] },
    { id: 'farinate', defaultTitolo: '🍕 Farinate', lista: menu.farinate || [] },
    { id: 'focacce', defaultTitolo: '🫓 Focacce', lista: menu.focacce || [] },
    { id: 'dolci', defaultTitolo: '🍰 Dolci', lista: menu.dolci || [] },
    { id: 'bevande', defaultTitolo: '🧋 Le Bevande', lista: menu.bevande || [] },
    { id: 'birre', defaultTitolo: '🍺 Le Birre', lista: menu.birre || []},
  ];

  // Elenco dei soli bottoni filtro da mostrare (esclude le categorie vuote)
  $: bottoniFiltro = [
    { id: 'tutti', titolo: '🍕 Mostra Tutto' },
    ...categorieBase
      .filter(cat => cat.lista && cat.lista.length > 0)
      .map(cat => ({ id: cat.id, titolo: cat.defaultTitolo }))
  ];

  // Blocco reattivo incrociato (Ricerca + Filtro Categoria)
  $: categorieOrdinate = categorieBase
    .map(cat => {
      const listaPiatti = cat.lista || [];
      
      if (categoriaSelezionata !== "tutti" && cat.id !== categoriaSelezionata) {
        return { ...cat, lista: [] }; 
      }

      const query = searchTarget.toLowerCase().trim();
      const listaFiltrata = listaPiatti.filter(item => {
        if (!query) return true;
        return item.name?.toLowerCase().includes(query) || 
               item.description?.toLowerCase().includes(query);
      });

      return { ...cat, lista: listaFiltrata };
    })
    .filter(cat => cat.lista.length > 0);
</script>

<head>
  <meta name="color-scheme" content="light only">
</head>

<section class="page-section">
  <div class="section-head">
    <span class="eyebrow">Menu</span>
    <h1>La Nostra Cucina</h1>
    <p>
      Una selezione semplice, genuina e immediata per gustare il meglio della
      nostra cucina.
    </p>

    <div class="search-container">
      <div class="search-wrapper">
        <span class="search-icon">🔍</span>
        <input 
          type="text" 
          placeholder="Cerca un piatto o un ingrediente..." 
          bind:value={searchTarget} 
          aria-label="Cerca nel menu"
        />
        {#if searchTarget}
          <button class="clear-button" on:click={() => searchTarget = ""} aria-label="Cancella testo">✕</button>
        {/if}
      </div>
    </div>

    <div class="filters-container">
      
      <div class="desktop-filters">
        {#each bottoniFiltro as bottone}
          <button 
            class="filter-btn" 
            class:active={categoriaSelezionata === bottone.id}
            on:click={() => categoriaSelezionata = bottone.id}
          >
            {bottone.titolo}
          </button>
        {/each}
      </div>

      <div class="mobile-filters">
        <label for="category-select" class="visual-hidden">Scegli una categoria</label>
        <div class="select-wrapper">
          <select 
            id="category-select" 
            bind:value={categoriaSelezionata}
          >
            {#each bottoniFiltro as bottone}
              <option value={bottone.id}>{bottone.titolo}</option>
            {/each}
          </select>
          <span class="select-arrow">▼</span>
        </div>
      </div>

    </div>
  </div>

  {#each categorieOrdinate as categoria (categoria.id)}
    <div class="category-block">
      <h2 class="category-title">{categoria.defaultTitolo}</h2>
      
      <div class="menu-grid">
        {#each categoria.lista as item}
          <article class="menu-card">
            
            <div class="card-bg-fade" style="background-image: url('{item.thumb}');"></div>

            <div class="item-content">
              <div class="item-header">
                <span class="item-icon">{item.icon}</span>
                <h3>{item.name}</h3>
              </div>
              <p>{item.description}</p>
            </div>
            
            <strong class="item-price">{item.price}</strong>
          </article>
        {/each}
      </div>
    </div>
  {:else}
    <div class="no-results">
      <span class="no-results-icon">🍕❌</span>
      <h3>Nessun piatto trovato</h3>
      <p>Nessun elemento corrisponde ai criteri impostati. Prova a modificare la ricerca.</p>
    </div>
  {/each}
</section>

<style>
  .page-section {
    max-width: var(--site-max-w);
    margin: 0 auto;
    padding: 6rem var(--site-px) 2rem;
  }

  .section-head {
    margin-bottom: 4rem;
    text-align: center;
  }

  .eyebrow {
    display: inline-flex;
    margin-bottom: 1rem;
    letter-spacing: var(--tracking-widest);
    text-transform: uppercase;
    font-size: var(--font-size-label);
    color: var(--color-brand);
  }

  h1 {
    margin: 0;
    font-size: clamp(2rem, 3.5vw, 3.4rem);
    color: var(--color-text-heading);
  }

  p {
    margin: 1rem auto 0;
    max-width: 640px;
    color: var(--color-text-body);
    line-height: var(--line-height-relaxed);
  }

  /* BARRA DI RICERCA */
  .search-container {
    margin-top: 2.5rem;
    display: flex;
    justify-content: center;
  }

  .search-wrapper {
    position: relative;
    width: 100%;
    max-width: 550px;
    display: flex;
    align-items: center;
  }

  .search-icon {
    position: absolute;
    left: 1.2rem;
    font-size: 1.2rem;
    color: var(--color-text-muted);
    pointer-events: none;
  }

  .search-wrapper input {
    width: 100%;
    padding: 1.1rem 3rem 1.1rem 3.2rem;
    font-size: var(--font-size-body);
    color: var(--color-text-heading);
    background-color: var(--color-surface);
    border: 2px solid var(--color-brand-border);
    border-radius: var(--radius-pill);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.03);
    outline: none;
    transition: var(--transition-base);
  }

  .search-wrapper input:focus {
    border-color: var(--color-brand);
    box-shadow: 0 10px 30px var(--color-brand-subtle);
    background-color: var(--color-surface-hover);
  }

  .clear-button {
    background: none;
    border: none;
    color: var(--color-text-muted);
    cursor: pointer;
    position: absolute;
    right: 1.2rem;
  }

  /* FILTRI PER CATEGORIA */
  .filters-container {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
  }

  .desktop-filters {
    display: flex;
    justify-content: center;
    gap: 0.6rem;
    flex-wrap: wrap;
    max-width: 900px;
  }

  .mobile-filters {
    display: none;
    width: 100%;
    max-width: 340px;
    padding: 0 1rem;
  }

  .filter-btn {
    background-color: var(--color-surface);
    color: var(--color-text-body);
    border: 1px solid var(--color-brand-border);
    padding: 0.6rem 1.2rem;
    font-size: var(--font-size-body);
    font-weight: 600;
    border-radius: var(--radius-pill);
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
    transition: var(--transition-base);
  }

  .filter-btn:hover {
    background-color: var(--color-surface-hover);
    border-color: var(--color-brand);
    color: var(--color-brand);
  }

  .filter-btn.active {
    background-color: var(--color-brand);
    color: var(--hero-text);
    border-color: var(--color-brand);
    box-shadow: var(--shadow-menu-btn-active);
  }

  .select-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
  }

  .select-wrapper select {
    width: 100%;
    padding: 1rem 2.5rem 1rem 1.2rem;
    font-size: var(--font-size-body);
    font-weight: 600;
    color: var(--color-text-heading);
    background-color: var(--color-surface);
    border: 2px solid var(--color-brand-border);
    border-radius: var(--radius-sm);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.04);
    appearance: none;
    -webkit-appearance: none;
    outline: none;
    cursor: pointer;
    transition: var(--transition-base);
  }

  .select-wrapper select:focus {
    border-color: var(--color-brand);
    box-shadow: 0 8px 24px var(--color-brand-subtle);
  }

  .select-arrow {
    position: absolute;
    right: 1.2rem;
    font-size: 0.75rem;
    color: var(--color-brand);
    pointer-events: none;
  }

  .visual-hidden {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }

  /* GRIGLIA E CARD DEL MENU */
  .category-block {
    margin-bottom: 5rem;
  }

  .category-title {
    font-size: clamp(1.5rem, 2.5vw, 2.2rem);
    color: var(--color-text-heading);
    margin-bottom: 2.5rem;
    padding-bottom: 0.6rem;
    border-bottom: 2px solid var(--color-brand-border);
  }

  .menu-grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .menu-card {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 1.5rem;
    background: var(--color-surface);
    border: 1px solid var(--color-brand-border);
    border-radius: var(--radius-card);
    padding: 1.8rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
    transition: var(--transition-card);
    overflow: hidden;
  }

  .card-bg-fade {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    background-size: cover;
    background-position: center;
    filter: blur(3px) opacity(0.30);
    mask-image: radial-gradient(circle at center, black 20%, transparent 75%);
    -webkit-mask-image: radial-gradient(circle at center, black 20%, transparent 75%);
    transition: filter var(--duration-slow) var(--ease-base), transform var(--duration-slow) var(--ease-base);
  }

  .menu-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px var(--color-brand-subtle);
    background-color: var(--color-surface-hover);
  }

  .menu-card:hover .card-bg-fade {
    filter: blur(1px) opacity(0.45);
    transform: scale(1.05);
  }

  .item-content {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .item-header {
    display: flex;
    align-items: center;
    gap: 0.7rem;
  }

  .item-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    flex-shrink: 0;
  }

  .menu-card h3 {
    margin: 0;
    font-size: 1.2rem;
    color: var(--color-text-heading);
    font-weight: 700;
  }

  .menu-card p {
    margin: 0;
    color: var(--color-text-muted);
    font-size: var(--font-size-body);
    line-height: 1.5;
  }

  .item-price {
    font-size: 1.15rem;
    color: var(--color-brand);
    font-weight: 700;
    white-space: nowrap;
    align-self: center;
  }

  .no-results {
    text-align: center;
    padding: 4rem 2rem;
    background: var(--color-surface);
    border-radius: var(--radius-card);
    border: 1px dashed var(--color-brand-border);
    max-width: 600px;
    margin: 2rem auto;
  }

  .no-results-icon {
    font-size: 3rem;
    display: block;
    margin-bottom: 1rem;
  }

  /* MEDIA QUERIES */
  @media (max-width: 820px) {
    .desktop-filters { display: none; }
    .mobile-filters { display: block; }

    .menu-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .menu-card { padding: 1.5rem; }

    .search-wrapper input {
      padding: 0.9rem 2.5rem 0.9rem 2.8rem;
      font-size: var(--font-size-body);
    }

    .search-icon { left: 1rem; }
  }
</style>