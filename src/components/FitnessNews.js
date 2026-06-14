/* Fitness News Component - News Feed */
export default {
    template: `
        <section id="fitness-news" class="py-16 bg-white">
            <div class="container">
                <header class="mb-12">
                    <h2 class="text-3xl font-bold text-blue-900 mb-2">Fitness News</h2>
                    <p class="text-gray-600">Mantente actualizado con las últimas tendencias y noticias del fitness</p>
                </header>
                
                <div class="relative mb-6">
                    <a
                        href="#fitness-news"
                        @click.prevent="prevNews"
                        class="carousel-control-prev absolute left-2 top-1/2 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 shadow transition hover:bg-slate-100"
                        aria-label="Ver card anterior"
                    >
                        <span class="carousel-control-prev-icon text-lg">‹</span>
                    </a>
                    <a
                        href="#fitness-news"
                        @click.prevent="nextNews"
                        class="carousel-control-next absolute right-2 top-1/2 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 shadow transition hover:bg-slate-100"
                        aria-label="Ver siguiente card"
                    >
                        <span class="carousel-control-next-icon text-lg">›</span>
                    </a>

                    <div class="news__grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <article 
                            v-for="news in carouselNews" 
                            :key="news.id"
                            class="news__card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition flex flex-col h-full"
                        >
                            <img 
                                :src="news.image" 
                                :alt="news.title"
                                class="w-full h-40 object-cover"
                            >
                            <div class="p-4 flex flex-col flex-grow">
                                <h3 class="text-lg font-bold text-blue-900 mb-2">{{ news.title }}</h3>
                                <p class="text-gray-600 text-sm mb-4 flex-grow">{{ news.excerpt }}</p>
                                <footer class="flex justify-between items-center mt-auto">
                                    <span class="text-xs text-gray-500">{{ news.category }}</span>
                                    <button 
                                        type="button"
                                        @click="readMore(news.id)"
                                        class="text-green-500 font-bold hover:text-green-600 text-sm"
                                        :aria-label="'Leer artículo: ' + news.title"
                                    >
                                        Leer Artículo →
                                    </button>
                                </footer>
                            </div>
                        </article>
                    </div>
                </div>
            </div>

            <!-- MODAL DE NOTICIA OPTIMIZADO -->
            <div 
                v-if="showModal" 
                class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-8 backdrop-blur-sm"
                @click.self="closeModal"
            >
                <div class="w-full max-w-3xl overflow-hidden rounded-[32px] bg-white shadow-2xl max-h-[90vh] flex flex-col">
                    
                    <!-- Encabezado del Modal -->
                    <div class="border-b border-slate-200 bg-slate-50 px-6 py-4">
                        <div class="flex items-start justify-between gap-4">
                            <div>
                                <h2 class="text-2xl font-bold text-slate-900">{{ modalArticle.title }}</h2>
                                <p class="mt-1 text-sm text-slate-500">{{ modalArticle.excerpt }}</p>
                            </div>
                            <button
                                type="button"
                                @click="closeModal"
                                class="text-slate-400 transition hover:text-slate-900 font-bold text-xl p-1"
                                aria-label="Cerrar modal"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                    
                    <!-- Cuerpo con Scroll Interno Seguro -->
                    <div class="overflow-y-auto p-6 space-y-6">
                        <div>
                            <img
                                :src="modalArticle.image"
                                :alt="modalArticle.title"
                                class="h-64 sm:h-80 w-full object-cover rounded-2xl"
                            >
                        </div>
                        <!-- Muestra el contenido extendido en lugar de repetir el excerpt -->
                        <div class="text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                            {{ modalArticle.content }}
                        </div>
                    </div>

                    <!-- Botón Inferior de Cierre -->
                    <div class="border-t border-slate-100 p-4 bg-slate-50 flex justify-end">
                        <button 
                            type="button"
                            @click="closeModal"
                            class="rounded-full bg-slate-200 px-6 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-300 transition"
                        >
                            Cerrar
                        </button>
                    </div>

                </div>
            </div>
        </section>
    `,
    data() {
        return {
            showModal: false,
            modalArticle: null,
            currentIndex: 0,
            newsItems: [
                {
                    id: 1,
                    title: 'Noticias Fitness',
                    category: 'Tendencias',
                    excerpt: 'Las nuevas tendencias de 2025 que dominan el fitness moderno.',
                    image: 'https://images.pexels.com/photos/13088863/pexels-photo-13088863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                    content: 'El panorama del fitness ha cambiado drásticamente. Actualmente, los usuarios priorizan los entrenamientos híbridos que combinan la fuerza presencial con el seguimiento biométrico digital. Las rutinas ya no se miden solo en sudor, sino en variabilidad de la frecuencia cardíaca (VFC) y optimización de la recuperación activa mediante tecnologías cotidianas.'
                },
                {
                    id: 2,
                    title: 'Tendencias',
                    category: 'Novedad',
                    excerpt: 'Las nuevas tendencias de fitness que dominarán en 2025.',
                    image: 'https://images.pexels.com/photos/31869045/pexels-photo-31869045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                    content: 'La gamificación del entrenamiento y los espacios de bienestar holístico están liderando la industria. Los gimnasios comerciales se están transformando en centros de longevidad, ofreciendo no solo máquinas de carga guiada, sino también zonas específicas para crioterapia, terapia de luz roja y asesoramiento nutricional personalizado basado en el ADN.'
                },
                {
                    id: 3,
                    title: 'Estudios Científicos',
                    category: 'Ciencia',
                    excerpt: 'Últimos estudios sobre los impactos del ejercicio en el músculo.',
                    image: 'https://images.pexels.com/photos/35419772/pexels-photo-35419772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                    content: 'Investigaciones publicadas recientemente confirman que el entrenamiento de fuerza de alta intensidad intermitente tiene un impacto directo en la salud mitocondrial celular, retrasando los marcadores biológicos del envejecimiento. Además, se descubrió que entrenar la fuerza al menos tres veces por semana mejora la plasticidad sináptica del cerebro.'
                },
                {
                    id: 4,
                    title: 'Mitos vs. Realidad',
                    category: 'Educación',
                    excerpt: 'Desmintiendo mitos sobre el fitness y la salud.',
                    image: 'https://images.pexels.com/photos/4944975/pexels-photo-4944975.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                    content: 'Es falso que sudar más implique quemar más grasa; el sudor es solo un mecanismo termorregulador para enfriar el cuerpo compuesto por agua y sales minerales. Del mismo modo, la ciencia del deporte ha demostrado de manera concluyente que la grasa no se oxida de forma localizada, sino de manera generalizada y sistémica a través de un déficit calórico controlado.'
                }
            ]
        };
    },
    computed: {
        carouselNews() {
            const count = this.newsItems.length;
            if (!count) return [];
            return Array.from({ length: count }, (_, index) => this.newsItems[(this.currentIndex + index) % count]);
        }
    },
    methods: {
        prevNews() {
            const count = this.newsItems.length;
            this.currentIndex = (this.currentIndex - 1 + count) % count;
        },
        nextNews() {
            const count = this.newsItems.length;
            this.currentIndex = (this.currentIndex + 1) % count;
        },
        readMore(id) {
            const article = this.newsItems.find(item => item.id === id);
            if (!article) return;
            this.modalArticle = article;
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
            this.modalArticle = null;
        }
    }
};