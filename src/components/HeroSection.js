/* Hero Section Component - Main Banner */
export default {
    name: 'HeroSection',
    template: `
        <section id="home" class="bg-gradient-to-b from-gray-50 to-white py-16">
            <div class="container">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <article class="hero__content">
                        <h2 class="text-4xl font-bold text-blue-900 mb-4">
                            Transforma tu cuerpo y tu vida
                        </h2>
                        <p class="text-lg text-gray-600 mb-6">
                            Accede a entrenamientos personalizados, planes de nutrición y una comunidad 
                            de apoyo que te motivará cada día.
                        </p>
                        <div class="flex gap-4">
                            <button 
                                @click="scrollToTraining"
                                class="btn-primary bg-green-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-600 transition"
                            >
                                Comenzar Ahora
                            </button>
                            
                            <button 
                                @click="openModal"
                                class="btn-secondary bg-gray-200 text-gray-900 px-8 py-3 rounded-lg font-bold hover:bg-gray-300 transition"
                            >
                                Ver Demo
                            </button>
                        </div>
                    </article>
                    
                    <figure class="hero__media">
                        <img 
                            src="https://images.pexels.com/photos/6392825/pexels-photo-6392825.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                            alt="Entrenamiento de fitness en el gym"
                            class="rounded-lg shadow-lg w-full object-cover"
                        >
                        <figcaption class="sr-only">Imagen del hero mostrando un entrenamiento</figcaption>
                    </figure>
                </div>
            </div>

            <div 
                v-if="isVideoModalOpen" 
                class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 transition-opacity"
                @click.self="closeModal"
            >
                <div class="bg-white rounded-xl shadow-2xl max-w-3xl w-full overflow-hidden p-6 relative">
                    <button 
                        @click="closeModal" 
                        class="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-3xl font-bold focus:outline-none z-10"
                        aria-label="Cerrar modal"
                    >
                        &times;
                    </button>
                    <header class="mb-4 pr-8">
                        <h3 class="text-2xl font-bold text-blue-900 leading-tight">
                            Transforma tu cuerpo y tu vida
                        </h3>
                    </header>
                    <div class="relative w-full aspect-video rounded-lg overflow-hidden shadow-md bg-black">
                        <iframe 
                            v-if="isVideoModalOpen"
                            class="absolute top-0 left-0 w-full h-full"
                            :src="youtubeEmbedUrl" 
                            title="Transforma tu cuerpo y tu vida - Video Demo"
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            allowfullscreen
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    `,
    data() {
        return {
            isVideoModalOpen: false,
            youtubeEmbedUrl: 'https://www.youtube.com/embed/j6yeoMShMfg?autoplay=1&rel=0'
        };
    },
    methods: {
        openModal() {
            this.isVideoModalOpen = true;
        },
        closeModal() {
            this.isVideoModalOpen = false;
        },
        // Método encargado de llevar al usuario a la sección de entrenamiento interactivo
        scrollToTraining() {
            const trainingSection = document.getElementById('training');
            if (trainingSection) {
                trainingSection.scrollIntoView({ 
                    behavior: 'smooth', // Desplazamiento fluido visualmente estético
                    block: 'start'      // Alinea la parte superior del componente con la pantalla
                });
            }
        }
    }
};