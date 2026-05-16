<script lang="ts">
  import { base } from "$app/paths";
  
  // Importiamo tutte le costanti generate dallo scraper nel file menu.js
  import * as menu from '$lib/menu.js';

  // Stato per la ricerca e per la categoria selezionata
  let searchTarget = "";
  let categoriaSelezionata = "tutti"; 

  // Struttura fissa ordinata a mano
  const categorieBase = [
    { id: 'pizze_classiche', defaultTitolo: 'Pizze Classiche', lista: menu.pizze_classiche || [] },
    { id: 'pizze_fritte', defaultTitolo: 'Pizze Fritte', lista: menu.pizze_fritte },
    { id: 'pizze_con_cornicione_ripieno', defaultTitolo: 'Pizze con Cornicione Ripieno', lista: menu.pizze_con_cornicione_ripieno },
    { id: 'pizze_vegane', defaultTitolo: 'Pizze Vegane', lista: menu.pizze_vegane || [] },
    { id: 'panuozzi', defaultTitolo: 'I Nostri Panuozzi', lista: menu.panuozzi || [] },
    { id: 'fritti', defaultTitolo: 'I Fritti e gli Sfizi', lista: menu.fritti || [] },
    { id: 'dolci', defaultTitolo: 'I Nostri Dolci', lista: menu.dolci || [] },
    { id: 'bevande', defaultTitolo: 'Le Bevande', lista: menu.bevande || [] },
    { id: 'birre', defaultTitolo: 'Le Birre', lista: menu.birre || []},
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
    max-width: 1500px;
    margin: 0 auto;
    padding: 6rem 2rem 2rem;
  }

  .section-head {
    margin-bottom: 4rem;
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
    color: #6d5349;
    pointer-events: none;
  }

  .search-wrapper input {
    width: 100%;
    padding: 1.1rem 3rem 1.1rem 3.2rem;
    font-size: 1.05rem;
    color: #1b1210;
    background-color: #ffffff;
    border: 2px solid rgba(178, 13, 13, 0.15);
    border-radius: 50px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.03);
    outline: none;
    transition: all 0.25s ease;
  }

  .search-wrapper input:focus {
    border-color: #b20d0d;
    box-shadow: 0 10px 30px rgba(178, 13, 13, 0.08);
    background-color: #fffbfb;
  }

  .clear-button {
    background: none;
    border: none;
    color: #a38c84;
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
    background-color: #ffffff;
    color: #5f443b;
    border: 1px solid rgba(178, 13, 13, 0.15);
    padding: 0.6rem 1.2rem;
    font-size: 0.95rem;
    font-weight: 600;
    border-radius: 30px;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
    transition: all 0.2s ease;
  }

  .filter-btn:hover {
    background-color: #fffaf8;
    border-color: #b20d0d;
    color: #b20d0d;
  }

  .filter-btn.active {
    background-color: #b20d0d;
    color: #ffffff;
    border-color: #b20d0d;
    box-shadow: 0 6px 18px rgba(178, 13, 13, 0.25);
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
    font-size: 1rem;
    font-weight: 600;
    color: #1b1210;
    background-color: #ffffff;
    border: 2px solid rgba(178, 13, 13, 0.18);
    border-radius: 16px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.04);
    appearance: none;
    -webkit-appearance: none;
    outline: none;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .select-wrapper select:focus {
    border-color: #b20d0d;
    box-shadow: 0 8px 24px rgba(178, 13, 13, 0.1);
  }

  .select-arrow {
    position: absolute;
    right: 1.2rem;
    font-size: 0.75rem;
    color: #b20d0d;
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
    color: #1b1210;
    margin-bottom: 2.5rem;
    padding-bottom: 0.6rem;
    border-bottom: 2px solid rgba(178, 13, 13, 0.1);
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
    background: #ffffff;
    border: 1px solid rgba(178, 13, 13, 0.1);
    border-radius: 20px;
    padding: 1.8rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
    transition: transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease;
    overflow: hidden;
  }

  /* MODIFICATO: Incrementata opacità iniziale al 30% (0.30) e ridotto il blur a 3px */
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
    transition: filter 0.3s ease, transform 0.3s ease;
  }

  .menu-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(178, 13, 13, 0.08);
    background-color: #fffaf8;
  }

  /* MODIFICATO: In hover sale al 45% (0.45) e il blur scende a 1px per renderla quasi nitida */
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
    color: #1b1210;
    font-weight: 700;
  }

  .menu-card p {
    margin: 0;
    color: #6d5349;
    font-size: 0.95rem;
    line-height: 1.5;
  }

  .item-price {
    font-size: 1.15rem;
    color: #b20d0d;
    font-weight: 700;
    white-space: nowrap;
    align-self: center;
  }

  .no-results {
    text-align: center;
    padding: 4rem 2rem;
    background: #ffffff;
    border-radius: 20px;
    border: 1px dashed rgba(178, 13, 13, 0.2);
    max-width: 600px;
    margin: 2rem auto;
  }

  .no-results-icon {
    font-size: 3rem;
    display: block;
    margin-bottom: 1rem;
  }

  /* MEDIA QUERIES PER LOGICA MOBILE */
  @media (max-width: 820px) {
    .desktop-filters {
      display: none;
    }
    
    .mobile-filters {
      display: block;
    }

    .menu-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    
    .menu-card {
      padding: 1.5rem;
    }

    .search-wrapper input {
      padding: 0.9rem 2.5rem 0.9rem 2.8rem;
      font-size: 1rem;
    }
    
    .search-icon {
      left: 1rem;
    }
  }
</style>