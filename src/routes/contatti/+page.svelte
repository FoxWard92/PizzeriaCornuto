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
                        style="background-image: url('/asset/icon/glovo.jpeg');"
                    ></div>
                </div>
                <div class="item-content">
                    <h2>Ordini e consegna</h2>
                    <p>
                        Telefono: <a href="tel:+390111234567">011 123 4567</a>
                    </p>
                    <p>
                        Ordina la tua pizza per asporto o consegna a domicilio.
                    </p>
                    <p>
                        Disponibile a Torino con prenotazione telefonica rapida.
                    </p>
                </div>
            </div>

            <div class="contact-card">
                <div class="matrix-image-wrapper">
                    <div
                        class="matrix-card-img"
                        style="background-image: url('/asset/icon/location.jpeg');"
                    ></div>
                </div>
                <div class="item-content">
                    <h2>Dove siamo</h2>
                    <p>Via Ragusa, 14 · Torino</p>
                    <p>Orari consegna e asporto</p>
                    <p>19:00 – 23:30 tutti i giorni</p>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    .page-section {
        width: 100%;
        padding: 8rem 0; /* Solo padding verticale */
        background-color: #ffffff;
    }

    .container {
        max-width: 1280px;
        margin: 0 auto;
        padding: 0 2rem; /* Padding orizzontale per evitare che il testo tocchi i bordi su mobile */
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
        font-weight: bold;
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

    .contact-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 10rem;
    }

    .contact-card {
        background: #fff;
        border: 1px solid rgba(178, 13, 13, 0.1);
        border-radius: 24px;
        padding: 2.5rem;
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.03);
        position: relative;
        display: flex;
        align-items: flex-start;
        gap: 2rem;
        overflow: visible;
        perspective: 1000px;
        transition: transform 0.3s ease;
    }

    .matrix-image-wrapper {
        position: relative;
        left: -100px;
        flex-shrink: 0;
        width: 200px;
        height: 250px;
        top: -50px;
        z-index: 5;
    }

    .matrix-card-img {
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
        border-radius: 12px;
        transform: matrix3d(
            0.85,
            0.15,
            0,
            0.0005,
            -0.05,
            0.9,
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            1
        );
        box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.15);
        border: 1px solid rgba(255, 255, 255, 0.5);
        transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        position: relative;
        z-index: 2;
    }

    .contact-card:hover .matrix-card-img {
        transform: matrix3d(
            1.05,
            0,
            0,
            0,
            0,
            1.05,
            0,
            0,
            0,
            0,
            1,
            0,
            20,
            0,
            50,
            1
        );
        box-shadow: 0 30px 60px rgba(178, 13, 13, 0.3);
        filter: brightness(1.1);
    }

    .contact-card:hover .matrix-image-wrapper::before {
        opacity: 0.5;
        filter: blur(30px);
        transform: rotateY(0deg) rotateX(0deg) scale(1.1);
    }

    .item-content {
        flex-grow: 1;
    }

    .contact-card h2 {
        margin: 0 0 0.8rem;
        font-size: 1.4rem;
        color: #1b1210;
    }

    .contact-card p {
        margin: 0.5rem 0;
        color: #5f443b;
        font-size: 0.95rem;
        line-height: 1.6;
    }

    .contact-card a {
        color: #b20d0d;
        text-decoration: none;
        font-weight: 600;
    }

    .contact-card a:hover {
        text-decoration: underline;
    }

    @media (max-width: 820px) {
        .contact-grid {
            grid-template-columns: 1fr;
        }

        .contact-card {
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 2.5rem 2rem;
        }

        .matrix-image-wrapper {
            top: 0px;
            left: 0px;
            width: 120px;
            height: 140px;
            margin-bottom: 1.5rem;
        }

        .matrix-card-img,
        .matrix-image-wrapper::before {
            transform: rotateX(10deg) rotateY(0deg);
        }
    }
</style>
