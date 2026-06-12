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
                        <figure class="relative">
                            <img 
                                :src="podcast.image"
                                :alt="podcast.title"
                                class="w-full h-40 object-cover"
                            >
                            <figcaption class="sr-only">{{ podcast.title }}</figcaption>
                        </figure>
                        
                        <div class="p-4">
                            <h3 class="text-lg font-bold text-blue-900 mb-2">{{ podcast.title }}</h3>
                            <p class="text-gray-600 text-sm mb-3">{{ podcast.host }}</p>
                            <p class="text-gray-700 text-sm mb-4">{{ podcast.description }}</p>
                            
                            <p class="text-xs text-gray-500 mb-4">⏱️ {{ podcast.duration }}</p>
                            
                            <button 
                                @click="listenPodcast(podcast)"
                                class="w-full bg-blue-900 text-white py-2 rounded font-bold hover:bg-blue-800 transition"
                                :aria-label="'Escuchar podcast: ' + podcast.title"
                            >
                                Escuchar
                            </button>
                        </div>
                    </article>
                </div>
            </div>

            <div 
                v-if="isModalOpen && selectedPodcast" 
                class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 transition-opacity"
                @click.self="closeModal"
            >
                <div class="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden p-6 relative">
                    
                    <button 
                        @click="closeModal" 
                        class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold focus:outline-none"
                    >
                        &times;
                    </button>

                    <header class="mb-4 pr-6">
                        <h3 class="text-xl font-bold text-blue-900 leading-tight">
                            {{ selectedPodcast.title }}
                        </h3>
                        <p class="text-gray-500 text-xs mt-1">Con {{ selectedPodcast.host }}</p>
                    </header>

                    <div class="mb-6 rounded-lg overflow-hidden shadow-inner bg-gray-100">
                        <img 
                            :src="selectedPodcast.image" 
                            :alt="selectedPodcast.title" 
                            class="w-full h-56 object-cover"
                        >
                    </div>

                    <div class="flex flex-col items-center gap-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
                        
                        <audio 
                            ref="audioPlayer"
                            :src="selectedPodcast.audioUrl" 
                            controls 
                            class="w-full mt-2"
                        ></audio>

                        <a 
                            v-if="selectedPodcast.audioUrl"
                            :href="selectedPodcast.audioUrl" 
                            target="_blank"
                            class="w-full inline-flex justify-center items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-bold py-2.5 px-4 rounded transition-colors text-center text-sm shadow"
                        >
                            <span class="text-base">▶</span> Abrir enlace directo de Audio
                        </a>
                    </div>
                    
                </div>
            </div>
        </section>
    `,
    data() {
        return {
            isModalOpen: false,       
            selectedPodcast: null,     
            podcasts: [
                {
                    id: 1,
                    title: 'Potencia tus Genes',
                    host: 'Fitness Revolucionario',
                    description: 'Entiende tus Genes: Salud, Nutrición, Deporte',
                    image: 'https://images.pexels.com/photos/12932526/pexels-photo-12932526.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                    duration: '45 min',
                    category: 'Semanal',
                    audioUrl: 'https://github.com/Daniel-Loaiza/TuMundoFitness_assets/raw/refs/heads/main/Audio_Genes.mp3'
                },
                {
                    id: 2,
                    title: 'Mitos e Realidades del Deporte',
                    host: 'Fitness Revolucionario',
                    description: 'Desmintiendo mitos sobre fitness y salud',
                    image: 'https://images.pexels.com/photos/8376296/pexels-photo-8376296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                    duration: '30 min',
                    category: 'Educación',
                    audioUrl: 'https://github.com/Daniel-Loaiza/TuMundoFitness_assets/raw/refs/heads/main/AudioEntrenoAyunas.mp3'
                },
                {
                    id: 3,
                    title: 'Entrevista con Expertos',
                    host: 'Fitness Revolucionario',
                    description: 'Conversaciones con profesionales del fitness',
                    image: 'https://images.pexels.com/photos/23625648/pexels-photo-23625648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                    duration: '60 min',
                    category: 'Entrevista',
                    audioUrl: 'https://github.com/Daniel-Loaiza/TuMundoFitness_assets/raw/refs/heads/main/AudioHorariosSueno.mp3'
                },
                {
                    id: 4,
                    title: 'Tatuajes y Cáncer',
                    host: 'Fitness Revolucionario',
                    description: 'Tatuajes y cáncer de piel: lo que sabemos',
                    image: 'https://images.pexels.com/photos/5714308/pexels-photo-5714308.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                    duration: '35 min',
                    category: 'Técnico',
                    audioUrl: 'https://github.com/Daniel-Loaiza/TuMundoFitness_assets/raw/refs/heads/main/AudioTatuajesCancer.mp3'
                }
            ]
        };
    },
    methods: {
        listenPodcast(podcast) {
            this.selectedPodcast = podcast;
            this.isModalOpen = true;
            
            // Forzar la carga del nuevo track de audio en el DOM
            this.$nextTick(() => {
                if (this.$refs.audioPlayer && podcast.audioUrl) {
                    this.$refs.audioPlayer.load();
                }
            });
        },
        closeModal() {
            // Pausar el audio inmediatamente para evitar que siga sonando de fondo
            if (this.$refs.audioPlayer) {
                this.$refs.audioPlayer.pause();
            }
            this.isModalOpen = false;
            this.selectedPodcast = null;
        }
    }
};