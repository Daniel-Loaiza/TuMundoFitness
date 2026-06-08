/* About Page Component - Team and Mission */
export default {
    template: `
        <section id="about-page" class="about-page" aria-labelledby="about-title">
            <div class="about-section">
                <div class="container about-section__content">
                    <p class="about-section__eyebrow">Sobre nosotros</p>
                    <h1 id="about-title">Tu Mundo Fitness</h1>
                    <p>
                        Somos una comunidad digital creada para acompanar a las personas que quieren
                        entrenar mejor, alimentarse con mas conciencia y construir habitos saludables
                        que se puedan sostener en la vida real.
                    </p>
                    <p>
                        Reunimos guias practicas, noticias, rutinas, recetas y experiencias interactivas
                        para que cada visita te acerque a una version mas fuerte, informada y activa de ti.
                    </p>
                </div>
            </div>

            <div class="container">
                <h2 class="about-team__title">Nuestro equipo</h2>
                <div class="about-team__row">
                    <article class="about-team__card">
                        <img
                            src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=900&q=80"
                            alt="Entrenadora del equipo Tu Mundo Fitness"
                            class="about-team__image"
                        >
                        <div class="about-team__container">
                            <h3>Valentina Gomez</h3>
                            <p class="about-team__role">CEO & Fundadora</p>
                            <p>
                                Lidera la vision editorial y de bienestar para que cada contenido sea claro,
                                responsable y util para nuestra comunidad.
                            </p>
                            <p class="about-team__email">valentina@tumundofitness.com</p>
                            <a class="about-team__button" href="mailto:valentina@tumundofitness.com">Contactar</a>
                        </div>
                    </article>

                    <article class="about-team__card">
                        <img
                            src="https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=900&q=80"
                            alt="Entrenador personal preparando una rutina"
                            class="about-team__image"
                        >
                        <div class="about-team__container">
                            <h3>Santiago Ruiz</h3>
                            <p class="about-team__role">Director de Entrenamiento</p>
                            <p>
                                Disena rutinas, retos y guias para distintos niveles, con foco en tecnica,
                                progresion y seguridad.
                            </p>
                            <p class="about-team__email">santiago@tumundofitness.com</p>
                            <a class="about-team__button" href="mailto:santiago@tumundofitness.com">Contactar</a>
                        </div>
                    </article>

                    <article class="about-team__card">
                        <img
                            src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80"
                            alt="Mesa con comida saludable para nutricion"
                            class="about-team__image"
                        >
                        <div class="about-team__container">
                            <h3>Camila Torres</h3>
                            <p class="about-team__role">Editora de Nutricion</p>
                            <p>
                                Convierte la informacion nutricional en consejos sencillos, recetas accesibles
                                y decisiones faciles de aplicar.
                            </p>
                            <p class="about-team__email">camila@tumundofitness.com</p>
                            <a class="about-team__button" href="mailto:camila@tumundofitness.com">Contactar</a>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    `
};
