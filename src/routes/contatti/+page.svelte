<script lang="ts">
  import { base } from '$app/paths';
</script>

<section class="page-section">
    <div class="container">
        <div class="section-head">
            <span class="eyebrow">Contatti</span>
            <h1>
                Ordina la tua pizza per asporto, ritiro o consegna a domicilio
            </h1>
            <p>
                Chiama il nostro locale per prenotare il ritiro dal vivo o
                richiedere la consegna a casa a Torino.
            </p>
        </div>

        <div class="contact-grid">
            <div class="contact-card">
                <div class="matrix-image-wrapper">
                    <div
                        class="matrix-card-img"
                        style="background-image: url('{base}/asset/icon/justeat.jpeg');"
                    ></div>
                </div>
                <div class="item-content">
                    <h2>Ordini e consegna</h2>
                    <p>
                        WhatsApp: <a href="https://wa.me/393701507305" target="_blank">370 150 7305</a>
                    </p>
                    <p>
                        Telefono: <a href="tel:+390115858822">011 585 8822</a>
                    </p>
                    <p>
                        Ordina la tua pizza per asporto o consegna a domicilio.
                    </p>
                    <p>
                        Disponibile a Torino con prenotazione telefonica o via messaggio.
                    </p>
                </div>
            </div>

            <div class="contact-card">
                <div class="matrix-image-wrapper">
                    <div
                        class="matrix-card-img"
                        style="background-image: url('{base}/asset/icon/location.jpeg');"
                    ></div>
                </div>
                <div class="item-content">
                    <h2>Dove siamo</h2>
                    <p><strong>Indirizzo:</strong> Via Ragusa, 5g, 10137 Torino TO</p>
                    <p class="hours-title"><strong>Orari:</strong></p>
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

            <div class="contact-card">
                <div class="matrix-image-wrapper">
                    <div
                        class="matrix-card-img"
                        style="background-image: url('{base}/asset/icon/google-play.jpeg');"
                    ></div>
                </div>
                <div class="item-content">
                    <h2>La nostra App</h2>
                    <p>
                        Scarica e installa l'app per avere sconti e pizze in omaggio!
                    </p>
                    <p>
                        Ordina in totale comodità dal tuo smartphone, consulta il menu completo e resta aggiornato sulle novità.
                    </p>
                    <p class="app-action">
                        <a href="https://play.google.com/store/apps/details?id=it.pizzeriaRoxy.pizzaRoxy" target="_blank" class="btn-link">
                            Scarica su Google Play
                        </a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
  .page-section {
    width: 100%;
    margin: 0 auto;
    max-width: var(--site-max-w);
    padding: 8rem 0;
  }

  .container {
    padding: 0 var(--site-px);
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
  }

  p {
    margin: 1rem auto 0;
    max-width: 640px;
    color: var(--color-text-body);
    line-height: var(--line-height-relaxed);
  }

  .contact-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 6rem;
    padding-left: 100px;
  }

  .contact-card {
    background: var(--color-surface);
    border: 1px solid var(--color-brand-border);
    border-radius: var(--radius-card);
    padding: 2.5rem;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.03);
    position: relative;
    display: flex;
    align-items: flex-start;
    text-align: justify;
    gap: 2rem;
    overflow: visible;
    perspective: 1000px;
    transition: var(--transition-card);
  }

  .matrix-image-wrapper {
    position: relative;
    left: -100px;
    flex-shrink: 0;
    width: 200px;
    height: 250px;
    top: -50px;
    z-index: 5;
    margin-right: -80px;
  }

  .matrix-card-img {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    border-radius: var(--radius-sm);
    transform: matrix3d(
      0.85, 0.15, 0, 0.0005,
      -0.05, 0.9, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    );
    box-shadow: var(--shadow-card-rest);
    border: 1px solid rgba(255, 255, 255, 0.5);
    transition: all 0.8s var(--ease-spring);
    position: relative;
    z-index: 2;
  }

  .contact-card:hover .matrix-card-img {
    transform: matrix3d(
      1.05, 0, 0, 0,
      0, 1.05, 0, 0,
      0, 0, 1, 0,
      20, 0, 50, 1
    );
    box-shadow: var(--shadow-card-hover);
    filter: brightness(1.1);
  }

  .item-content {
    flex-grow: 1;
    text-align: left;
  }

  .contact-card h2 {
    margin: 0 0 0.8rem;
    font-size: 1.4rem;
    color: var(--color-text-heading);
    text-align: left;
  }

  .contact-card p {
    margin: 0.5rem 0;
    color: var(--color-text-body);
    font-size: var(--font-size-body);
    line-height: var(--line-height-body);
    text-align: justify;
  }

  .contact-card a {
    color: var(--color-brand);
    text-decoration: none;
    font-weight: 600;
  }

  .contact-card a:hover {
    text-decoration: underline;
  }

  .hours-list {
    list-style: none;
    padding: 0;
    margin: 0.5rem 0;
    text-align: left;
    max-width: 300px;
  }

  .hours-list li {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;
    font-size: var(--font-size-body);
    color: var(--color-text-body);
  }

  .hours-list span {
    font-weight: 600;
  }

  .app-action {
    margin-top: 1.2rem !important;
  }

  .btn-link {
    background: var(--color-brand);
    color: var(--hero-text) !important;
    padding: 0.6rem 1.2rem;
    border-radius: var(--radius-sm);
    font-size: var(--font-size-small);
    box-shadow: var(--shadow-btn-primary);
    transition: var(--transition-base);
    display: inline-block;
  }

  .btn-link:hover {
    background: var(--color-brand-hover);
    box-shadow: var(--shadow-btn-primary-hover);
    text-decoration: none !important;
  }

  @media (min-width: 1100px) {
    .contact-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8rem 10rem;
    }
  }

  @media (max-width: 820px) {
    .contact-grid {
      grid-template-columns: 1fr;
      gap: 4rem;
      padding-left: 0;
    }

    .contact-card {
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 2.5rem 2rem;
      margin-top: 40px;
    }

    .contact-card h2,
    .contact-card p,
    .item-content,
    .hours-list {
      text-align: center;
    }

    .hours-list {
      margin: 0 auto;
    }

    .matrix-image-wrapper {
      top: 0px;
      left: 0px;
      width: 120px;
      height: 140px;
      margin-bottom: 1.5rem;
      margin-right: 0;
    }

    .matrix-card-img {
      transform: rotateX(10deg) rotateY(0deg);
    }
  }
</style>