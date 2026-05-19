<script lang="ts">
  import { base } from "$app/paths";
</script>

<section class="page-section">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">Contatti</span>
      <h1>Ordina la tua pizza per asporto, ritiro o consegna a domicilio</h1>
      <p>
        Chiama il nostro locale per prenotare il ritiro dal vivo o richiedere la
        consegna a casa a Torino.
      </p>
    </div>

    <div class="contact-grid">
      <div class="card">
        <div class="content">
          <div class="back">
            <div class="back-content">
              <div
                class="card-icon"
                style="background-image: url('{base}/asset/icon/justeat.jpeg');"
              ></div>
              <strong class="card-title-main">Ordini e consegna</strong>
              <span class="card-hint">Scopri di più &rarr;</span>
            </div>
          </div>
          <div class="front">
            <div class="img">
              <div class="circle"></div>
              <div class="circle" id="right"></div>
              <div class="circle" id="bottom"></div>
            </div>
            <div class="front-content" style="background-image: url({base}/asset/cards/forest_raider.jpeg);">
              <small class="badge">Contattaci</small>
              <div class="description">
                <div class="info-row">
                  <strong>WhatsApp:</strong>
                  <a href="https://wa.me/393701507305" target="_blank"
                    >370 150 7305</a
                  >
                </div>
                <div class="info-row">
                  <strong>Telefono:</strong>
                  <a href="tel:+390115858822">011 585 8822</a>
                </div>
                <p class="card-footer">
                  Ordina la tua pizza per asporto o consegna a domicilio a
                  Torino.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="content">
          <div class="back">
            <div class="back-content">
              <div
                class="card-icon"
                style="background-image: url('{base}/asset/icon/location.jpeg');"
              ></div>
              <strong class="card-title-main">Dove siamo</strong>
              <span class="card-hint">Scopri di più &rarr;</span>
            </div>
          </div>
          <div class="front">
            <div class="img">
              <div class="circle"></div>
              <div class="circle" id="right"></div>
              <div class="circle" id="bottom"></div>
            </div>
            <div class="front-content" style="background-image: url({base}/asset/cards/google_maps.jpeg);">
              <small class="badge">Vieni a trovarci</small>
              <div class="description">
                <div class="info-row align-start">
                  <strong>Indirizzo:</strong>
                  <span>Via Ragusa, 5g<br />10137 Torino TO</span>
                </div>
                <div class="info-row mt-10">
                  <strong>Orari:</strong>
                </div>
                <ul class="hours-list">
                  <li><span>Lunedì:</span> 18:00 – 22:30</li>
                  <li><span>Martedì:</span> 18:00 – 22:30</li>
                  <li><span>Mercoledì:</span> 18:00 – 22:30</li>
                  <li><span>Giovedì:</span> 18:00 – 22:30</li>
                  <li><span>Venerdì:</span> 18:00 – 22:30</li>
                  <li><span>Sabato:</span> 18:00 – 22:30</li>
                  <li><span>Domenica:</span> 18:00 – 22:30</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="content">
          <div class="back">
            <div class="back-content">
              <div
                class="card-icon"
                style="background-image: url('{base}/asset/icon/google-play.jpeg');"
              ></div>
              <strong class="card-title-main">La nostra App</strong>
              <span class="card-hint">Scopri di più &rarr;</span>
            </div>
          </div>
          <div class="front">
            <div class="img">
              <div class="circle"></div>
              <div class="circle" id="right"></div>
              <div class="circle" id="bottom"></div>
            </div>
            <div class="front-content" style="background-image: url({base}/asset/cards/google_play.jpeg);">
              <small class="badge">Scarica ora</small>
              <div class="description text-center">
                <p class="app-desc">
                  Scarica l'app per avere sconti e pizze in omaggio! Consulta il
                  menu e ordina comodamente.
                </p>
                <a
                  href="https://play.google.com/store/apps/details?id=it.pizzeriaRoxy.pizzaRoxy"
                  target="_blank"
                  class="btn-link"
                >
                  Google Play
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  /* === Struttura della Pagina === */
  .page-section {
    max-width: var(--site-max-w);
    margin: 0 auto;
    padding: var(--section-py) var(--site-px);
  }

  .container {
    width: 100%;
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
    font-weight: bold;
  }

  h1 {
    margin: 0;
    font-size: clamp(2rem, 3.5vw, 3.4rem);
    color: var(--color-text-heading);
    line-height: var(--line-height-tight);
  }

  .section-head p {
    margin: 1rem auto 0;
    max-width: 640px;
    color: var(--color-text-body);
    line-height: var(--line-height-relaxed);
    font-size: var(--font-size-body);
  }

  /* Griglia Layout Card */
  .contact-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 5rem;
    padding: 2rem 0;
  }

  /* === EFFETTO FLIP CARD === */
  .card {
    overflow: visible;
    width: 300px;
    height: 410px; /* Arrotondato per dare respiro */
    perspective: 1000px;
  }

  .content {
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform var(--duration-slow) var(--ease-base);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
    border-radius: var(--radius-card-inner);
  }

  .card:hover .content {
    transform: rotateY(180deg);
    box-shadow: 0 16px 32px rgba(178, 13, 13, 0.08);
  }

  .front,
  .back {
    background-color: #ffffff;
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    border-radius: var(--radius-card-inner);
    overflow: hidden;
    border: 1px solid rgba(0, 0, 0, 0.05);
  }

  /* --- BACK FACE (LATO INIZIALE CHIARO) --- */
  .back {
    justify-content: center;
    display: flex;
    align-items: center;
  }

  .back::before {
    position: absolute;
    content: " ";
    display: block;
    width: 160px;
    height: 160%;
    background: linear-gradient(
      90deg,
      transparent,
      var(--color-brand),
      var(--color-brand-hover),
      var(--color-brand),
      transparent
    );
    animation: rotation_481 5000ms infinite linear;
  }

  .back-content {
    position: absolute;
    width: 98%;
    height: 98%;
    background-color: #ffffff;
    border-radius: var(--radius-card-inner);
    color: var(--color-text-heading);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px; /* Ridotto leggermente per bilanciare la nuova scritta */
  }

  .card-icon {
    width: 95px;
    height: 95px;
    border-radius: 50%;
    background-size: cover;
    background-position: center;
    border: 3px solid var(--color-brand);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }

  .card-title-main {
    font-size: 1.2rem;
    letter-spacing: var(--tracking-wide);
    text-transform: uppercase;
    color: var(--color-text-heading);
    font-weight: 700;
  }

  /* Nuovo stile per il suggerimento d'azione (Clicca / Scopri di più) */
  .card-hint {
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: var(--tracking-wide, 1px);
    color: var(--color-brand);
    font-weight: 600;
    opacity: 0.7;
    transition:
      opacity 0.3s ease,
      transform 0.3s ease;
  }

  .card:hover .card-hint {
    opacity: 1;
    transform: translateX(3px);
  }

  /* --- FRONT FACE (LATO HOVER CHIARO) --- */
  .front {
    transform: rotateY(180deg);
    color: var(--color-text-body);
  }

  .front .front-content {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 2;
  }

  .front-content .badge {
    background-color: rgba(178, 13, 13, 0.06);
    border: 1px solid rgba(178, 13, 13, 0.15);
    padding: 4px 12px;
    border-radius: var(--radius-pill);
    backdrop-filter: blur(2px);
    width: fit-content;
    font-size: var(--font-size-label);
    letter-spacing: var(--tracking-wide);
    color: rgb(41, 41, 41);
    font-weight: 700;
    text-transform: uppercase;
  }

  .front-content {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }

  .description {
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.03);
    width: 100%;
    padding: 15px;
    background-color: rgba(232, 232, 232, 0.94);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border-radius: var(--radius-card-inner);
    border: 1px solid rgba(0, 0, 0, 0.04);
  }

  .info-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    font-size: var(--font-size-small);
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    padding-bottom: 4px;
  }

  .align-start {
    align-items: flex-start;
  }

  .info-row strong {
    color: #555555;
    font-weight: 600;
  }

  .info-row span {
    text-align: right;
    color: var(--color-text-heading);
  }

  .info-row a {
    color: var(--color-brand);
    text-decoration: none;
    font-weight: bold;
    transition: var(--transition-base);
  }

  .info-row a:hover {
    color: var(--color-brand-hover);
    text-decoration: underline;
  }

  .mt-10 {
    margin-top: 8px;
    border: none;
    margin-bottom: 2px;
    padding-bottom: 0;
  }

  .hours-list {
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: var(--font-size-small);
  }

  .hours-list li {
    display: flex;
    justify-content: space-between;
    color: var(--color-text-body);
    margin-bottom: 2px;
  }

  .hours-list span {
    color: #666666;
  }

  .card-footer {
    color: var(--color-text-body);
    opacity: 0.8;
    margin: 6px 0 0 0;
    font-size: 0.78rem;
    line-height: 1.4;
  }

  .text-center {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  .app-desc {
    font-size: var(--font-size-small);
    line-height: 1.4;
    margin: 0 0 4px 0;
    color: var(--color-text-body);
  }

  .btn-link {
    background: var(--color-brand);
    color: #ffffff !important;
    padding: 8px 16px;
    border-radius: var(--radius-pill);
    font-size: var(--font-size-small);
    font-weight: bold;
    text-decoration: none;
    box-shadow: var(--shadow-btn-primary);
    transition: var(--transition-base);
    display: inline-block;
    width: 100%;
  }

  .btn-link:hover {
    background: var(--color-brand-hover);
    box-shadow: var(--shadow-btn-primary-hover);
    transform: translateY(-1px);
  }

  /* --- Cerchi Fluttuanti Interni --- */
  .front .img {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 1;
  }

  .circle {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background-color: var(--color-brand);
    position: absolute;
    filter: blur(25px);
    animation: floating 2600ms infinite ease-in-out;
    opacity: 0.07;
  }

  #bottom {
    background-color: var(--color-brand-hover);
    left: 40px;
    top: 180px;
    width: 130px;
    height: 130px;
    animation-delay: -800ms;
  }

  #right {
    background-color: var(--color-brand);
    left: 160px;
    top: -40px;
    width: 60px;
    height: 60px;
    animation-delay: -1800ms;
  }

  /* === ANIMAZIONI === */
  @keyframes rotation_481 {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }

  @keyframes floating {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(10px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  @media (max-width: 600px) {
    .card {
      width: 100%;
      max-width: 280px;
    }
  }
</style>
