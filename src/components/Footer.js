/* Footer Component - Footer Section */
export default {
    template: `
        <footer class="bg-gray-900 text-gray-300 py-12">
            <div class="container">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <!-- About Section -->
                    <section class="footer__about">
                        <h3 class="text-white font-bold mb-4">Sobre Tu Mundo Fitness</h3>
                        <p class="text-sm mb-4">
                            Tu plataforma completa de fitness, nutrición y bienestar. 
                            Aquí encontrarás todo lo que necesitas para transformar tu vida.
                        </p>
                    </section>
                    
                    <!-- Quick Links -->
                    <section class="footer__links">
                        <h3 class="text-white font-bold mb-4">Enlaces Rápidos</h3>
                        <nav aria-label="Footer navigation">
                            <ul class="space-y-2 text-sm list-none p-0">
                                <li><a href="#home" class="hover:text-white transition">Inicio</a></li>
                                <li><a href="#fitness-news" class="hover:text-white transition">Noticias</a></li>
                                <li><a href="#games" class="hover:text-white transition">Games</a></li>
                                <li><a href="#podcast" class="hover:text-white transition">Podcast</a></li>
                                <li><a href="#guides" class="hover:text-white transition">Guías</a></li>
                                <li><a href="#training" class="hover:text-white transition">Entrenamientos</a></li>
                                <li><a href="#community" class="hover:text-white transition">Comunidad</a></li>
                            </ul>
                        </nav>
                    </section>
                    
                    <!-- Resources -->
                    <section class="footer__resources">
                        <h3 class="text-white font-bold mb-4">Recursos</h3>
                        <nav aria-label="Resources navigation">
                            <ul class="space-y-2 text-sm list-none p-0">
                                <li><a href="#about" @click="$emit('navigate', 'about')" class="hover:text-white transition">Sobre nosotros</a></li>
                                <li><a href="#contact" @click="$emit('navigate', 'contact')" class="hover:text-white transition">Contactos</a></li>
                            </ul>
                        </nav>
                    </section>
                    
                    <!-- Newsletter -->
                    <section class="footer__newsletter">
                        <h3 class="text-white font-bold mb-4">Newsletter</h3>
                        <p class="text-sm mb-3">Suscríbete para recibir consejos exclusivos</p>
                        <form @submit.prevent="subscribeNewsletter" class="space-y-2">
                            <input 
                                type="email" 
                                placeholder="Tu email"
                                v-model="email"
                                class="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:border-green-500 focus:outline-none"
                                aria-label="Email para newsletter"
                                required
                            >
                            <button 
                                type="submit"
                                class="w-full bg-green-500 text-white py-2 rounded font-bold hover:bg-green-600 text-sm"
                            >
                                Suscribirse
                            </button>
                        </form>
                    </section>
                </div>
                
                <!-- Divider -->
                <hr class="border-gray-700 mb-6">
                
                <!-- Footer Bottom -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <p class="text-gray-500">
                        &copy; 2026 Tu Mundo Fitness. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    `,
    data() {
        return {
            email: ''
        };
    },
    methods: {
        subscribeNewsletter() {
            if (this.email) {
                alert(`¡Gracias por suscribirse con ${this.email}!`);
                this.email = '';
            }
        }
    }
};
