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
                        <div class="social__links flex gap-3">
                            <a href="#" aria-label="Instagram" class="text-pink-400 hover:text-pink-300">📱</a>
                            <a href="#" aria-label="TikTok" class="text-black hover:text-gray-400">🎵</a>
                            <a href="#" aria-label="YouTube" class="text-red-500 hover:text-red-400">📺</a>
                        </div>
                    </section>
                    
                    <!-- Quick Links -->
                    <section class="footer__links">
                        <h3 class="text-white font-bold mb-4">Enlaces Rápidos</h3>
                        <nav aria-label="Footer navigation">
                            <ul class="space-y-2 text-sm list-none p-0">
                                <li><a href="#home" class="hover:text-white transition">Inicio</a></li>
                                <li><a href="#fitness-news" class="hover:text-white transition">Noticias</a></li>
                                <li><a href="#guides" class="hover:text-white transition">Guías</a></li>
                                <li><a href="#training" class="hover:text-white transition">Entrenamientos</a></li>
                            </ul>
                        </nav>
                    </section>
                    
                    <!-- Resources -->
                    <section class="footer__resources">
                        <h3 class="text-white font-bold mb-4">Recursos</h3>
                        <nav aria-label="Resources navigation">
                            <ul class="space-y-2 text-sm list-none p-0">
                                <li><a href="#" class="hover:text-white transition">Blog</a></li>
                                <li><a href="#" class="hover:text-white transition">FAQ</a></li>
                                <li><a href="#" class="hover:text-white transition">Contacto</a></li>
                                <li><a href="#" class="hover:text-white transition">Soporte</a></li>
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
                    <nav class="flex gap-4 justify-center md:justify-end">
                        <a href="#" class="text-gray-500 hover:text-white transition">Privacidad</a>
                        <a href="#" class="text-gray-500 hover:text-white transition">Términos</a>
                        <a href="#" class="text-gray-500 hover:text-white transition">Cookies</a>
                    </nav>
                </div>
                
                <!-- Factores Footer -->
                <div class="mt-6 text-xs text-gray-600 space-y-1">
                    <p>Factores</p>
                    <ul class="grid grid-cols-2 md:grid-cols-5 gap-2">
                        <li><a href="#" class="hover:text-gray-400">Home</a></li>
                        <li><a href="#" class="hover:text-gray-400">Privacidad</a></li>
                        <li><a href="#" class="hover:text-gray-400">Recetas de Fitness</a></li>
                        <li><a href="#" class="hover:text-gray-400">Eventos</a></li>
                        <li><a href="#" class="hover:text-gray-400">Tienda Recomendada</a></li>
                    </ul>
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
