/* Fitness News Component - News Feed */
export default {
    template: `
        <section id="fitness-news" class="py-16 bg-white">
            <div class="container">
                <header class="mb-12">
                    <h2 class="text-3xl font-bold text-blue-900 mb-2">Fitness News</h2>
                    <p class="text-gray-600">Mantente actualizado con las últimas tendencias y noticias del fitness</p>
                </header>
                
                <div class="news__grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <article 
                        v-for="news in newsItems" 
                        :key="news.id"
                        class="news__card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition"
                    >
                        <img 
                            :src="news.image" 
                            :alt="news.title"
                            class="w-full h-40 object-cover"
                        >
                        <div class="p-4">
                            <h3 class="text-lg font-bold text-blue-900 mb-2">{{ news.title }}</h3>
                            <p class="text-gray-600 text-sm mb-4">{{ news.excerpt }}</p>
                            <footer class="flex justify-between items-center">
                                <span class="text-xs text-gray-500">{{ news.category }}</span>
                                <button 
                                    @click="readMore(news.id)"
                                    class="text-green-500 font-bold hover:text-green-600"
                                    :aria-label="'Leer artículo: ' + news.title"
                                >
                                    Leer Artículo →
                                </button>
                            </footer>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    `,
    data() {
        return {
            newsItems: [
                {
                    id: 1,
                    title: 'Noticias Fitness',
                    category: 'Tendencias',
                    excerpt: 'Las nuevas tendencias de 2025 que dominan el fitness moderno.',
                    image:'https://images.pexels.com/photos/13088863/pexels-photo-13088863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'   
                },
                {
                    id: 2,
                    title: 'Tendencias',
                    category: 'Novedad',
                    excerpt: 'Las nuevas tendencias de fitness que dominarán en 2025.',
                    image: 'https://images.pexels.com/photos/31869045/pexels-photo-31869045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                },
                {
                    id: 3,
                    title: 'Estudios Científicos',
                    category: 'Ciencia',
                    excerpt: 'Últimos estudios sobre los impactos del ejercicio en el músculo.',
                    image: 'https://images.pexels.com/photos/35419772/pexels-photo-35419772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                },
                {
                    id: 4,
                    title: 'Mitos vs. Realidad',
                    category: 'Educación',
                    excerpt: 'Desmintiendo mitos sobre el fitness y la salud.',
                    image: 'https://images.pexels.com/photos/4944975/pexels-photo-4944975.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                }
            ]
        };
    },
    methods: {
        readMore(id) {
            console.log('Lee el artículo:', id);
            // Navigate to article detail
        }
    }
};
