/* Fitness Podcast Component - Podcast Section */
export default {
    template: `
        <section id="podcast" class="py-16 bg-gray-50">
            <div class="container">
                <header class="mb-12">
                    <h2 class="text-3xl font-bold text-blue-900 mb-2">
                        <span aria-label="podcast">🎧</span> Fitness Podcast
                    </h2>
                    <p class="text-gray-600">Escucha historias y consejos de expertos en fitness</p>
                </header>
                
                <div class="podcast__grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <article 
                        v-for="podcast in podcasts"
                        :key="podcast.id"
                        class="podcast__card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
                    >
                        <!-- Podcast Image -->
                        <figure class="relative">
                            <img 
                                :src="podcast.image"
                                :alt="podcast.title"
                                class="w-full h-40 object-cover"
                            >
                            <figcaption class="sr-only">{{ podcast.title }}</figcaption>
                        </figure>
                        
                        <!-- Podcast Info -->
                        <div class="p-4">
                            <h3 class="text-lg font-bold text-blue-900 mb-2">{{ podcast.title }}</h3>
                            <p class="text-gray-600 text-sm mb-3">{{ podcast.host }}</p>
                            <p class="text-gray-700 text-sm mb-4">{{ podcast.description }}</p>
                            
                            <!-- Duration -->
                            <p class="text-xs text-gray-500 mb-4">⏱️ {{ podcast.duration }}</p>
                            
                            <!-- Listen Button -->
                            <button 
                                @click="listenPodcast(podcast.id)"
                                class="w-full bg-blue-900 text-white py-2 rounded font-bold hover:bg-blue-800 transition"
                                :aria-label="'Escuchar podcast: ' + podcast.title"
                            >
                                Escuchar
                            </button>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    `,
    data() {
        return {
            podcasts: [
                {
                    id: 1,
                    title: 'Chería Fitness Semanal',
                    host: 'Chería',
                    description: 'Consejos prácticos y motivación diaria para tu fitness',
                    image: 'https://images.pexels.com/photos/12932526/pexels-photo-12932526.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                    duration: '45 min',
                    category: 'Semanal'
                },
                {
                    id: 2,
                    title: 'Mitos e Realidades del Deporte',
                    host: 'Dr. Martínez',
                    description: 'Desmintiendo mitos sobre fitness y salud',
                    image: 'https://images.pexels.com/photos/8376296/pexels-photo-8376296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                    duration: '30 min',
                    category: 'Educación'
                },
                {
                    id: 3,
                    title: 'Entrevista con Expertos',
                    host: 'Diversos expertos',
                    description: 'Conversaciones con profesionales del fitness',
                    image: 'https://images.pexels.com/photos/23625648/pexels-photo-23625648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                    duration: '60 min',
                    category: 'Entrevista'
                },
                {
                    id: 4,
                    title: 'Simulador de progreso físico',
                    host: 'Coach Diego',
                    description: 'Monitorea y optimiza tu progreso físico',
                    image: 'https://images.pexels.com/photos/5714308/pexels-photo-5714308.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                    duration: '35 min',
                    category: 'Técnico'
                }
            ]
        };
    },
    methods: {
        listenPodcast(id) {
            console.log('Escuchando podcast:', id);
            // Navigate to podcast player
        }
    }
};
