/* Header Component - Semantic Navigation */
export default {
    template: `
        <header class="bg-gradient-to-r from-blue-900 to-blue-800 shadow-lg sticky top-0 z-50">
            <div class="container">
                <nav class="flex items-center justify-between py-4" aria-label="Navegación principal">
                    <!-- Logo/Brand -->
                    <div class="flex items-center gap-3">
                        <img src="src/assets/images/icono.png" alt="Icono Fitness" class="w-20 h-20 object-contain rounded-lg">
                        <div>
                            <h1 class="text-white text-xl font-bold m-0">TU MUNDO FITNESS</h1>
                            <p class="text-blue-100 text-sm m-0">Entrena, Nutre, Vive.</p>
                        </div>
                    </div>
                    
                    <!-- Navigation Menu -->
                    <ul class="hidden md:flex gap-6 list-none m-0 p-0">
                        <li><a href="#home" class="text-white hover:text-green-400 transition">Inicio</a></li>
                        <li><a href="#fitness-news" class="text-white hover:text-green-400 transition">Noticias</a></li>                        
                        <li><a href="#games" class="text-white hover:text-green-400 transition">Games</a></li>
                        <li><a href="#podcast" class="text-white hover:text-green-400 transition">Podcast</a></li>
                        <li><a href="#guides" class="text-white hover:text-green-400 transition">Guías</a></li>
                        <li><a href="#training" class="text-white hover:text-green-400 transition">Entrenamientos</a></li>
                        <li><a href="#community" class="text-white hover:text-green-400 transition">Comunidad</a></li>
                        <li><a href="#about" @click="$emit('navigate', 'about')" class="text-white hover:text-green-400 transition">Sobre nosotros</a></li>
                        <li><a href="#contact" @click="$emit('navigate', 'contact')" class="text-white hover:text-green-400 transition">Contactos</a></li>
                    </ul>
                    
                    <!-- Search and User Icon -->
                    <div class="flex items-center gap-3">
                    </div>
                </nav>
                
                <!-- Mobile Menu Button -->
                <button 
                    @click="toggleMobileMenu" 
                    class="md:hidden text-white text-2xl mb-4"
                    aria-label="Abrir menú"
                    :aria-expanded="mobileMenuOpen"
                >
                    ☰
                </button>
            </div>
        </header>
    `,
    data() {
        return {
            mobileMenuOpen: false
        };
    },
    methods: {
        toggleMobileMenu() {
            this.mobileMenuOpen = !this.mobileMenuOpen;
        }
    }
};
