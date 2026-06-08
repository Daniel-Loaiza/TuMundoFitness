/* Community Component - Community Section */
export default {
    template: `
        <section id="community" class="py-16 bg-white">
            <div class="container">
                <header class="mb-12">
                    <h2 class="text-3xl font-bold text-blue-900 mb-2">Community</h2>
                    <p class="text-gray-600">Únete a miles de personas en su viaje de fitness</p>
                </header>
                
                <div class="community__grid grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <!-- Recent Comments -->
                    <article class="community__comments">
                        <h3 class="text-2xl font-bold text-blue-900 mb-6">Comentarios Recientes</h3>
                        
                        <div class="space-y-4">
                            <div 
                                v-for="comment in recentComments"
                                :key="comment.id"
                                class="comment__item border-l-4 border-green-500 pl-4 py-3 hover:bg-gray-50 transition rounded"
                            >
                                <div class="flex items-start gap-3">
                                    <span class="text-2xl">{{ comment.avatar }}</span>
                                    <div class="flex-1">
                                        <h4 class="font-bold text-gray-900">{{ comment.user }}</h4>
                                        <p class="text-gray-600 text-sm mb-2">{{ comment.text }}</p>
                                        <p class="text-xs text-gray-500">{{ comment.date }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <button 
                            class="mt-6 text-green-500 font-bold hover:text-green-600"
                            @click="viewAllComments"
                        >
                            Ver todos los comentarios →
                        </button>
                    </article>
                    
                    <!-- Forums/Discussion -->
                    <article class="community__forums">
                        <h3 class="text-2xl font-bold text-blue-900 mb-6">Foros de Discusión</h3>
                        
                        <div class="space-y-4">
                            <div 
                                v-for="forum in forums"
                                :key="forum.id"
                                class="forum__item border border-gray-200 rounded-lg p-4 hover:border-green-500 transition cursor-pointer"
                                @click="openForum(forum.id)"
                                role="button"
                                tabindex="0"
                                @keydown.enter.prevent="openForum(forum.id)"
                            >
                                <div class="flex justify-between items-start mb-2">
                                    <h4 class="font-bold text-gray-900">{{ forum.title }}</h4>
                                    <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                        {{ forum.posts }} posts
                                    </span>
                                </div>
                                <p class="text-gray-600 text-sm mb-2">{{ forum.description }}</p>
                                <p class="text-xs text-gray-500">
                                    Último: {{ forum.lastUpdate }}
                                </p>
                            </div>
                        </div>
                    </article>
                </div>
                
                <!-- Rankings Section -->
                <div class="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <!-- Rankings -->
                    <article class="rankings__section">
                        <h3 class="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-2">
                            🏆 Rankings y Retos
                        </h3>
                        
                        <details class="mb-4" open>
                            <summary class="cursor-pointer font-bold text-blue-900 hover:text-blue-800">
                                Top 5 Miembros Activos
                            </summary>
                            <ol class="mt-4 list-decimal list-inside space-y-2 text-gray-700">
                                <li v-for="(member, idx) in topMembers" :key="idx">
                                    <span class="font-bold">{{ member.name }}</span> - {{ member.points }} puntos
                                </li>
                            </ol>
                        </details>
                    </article>
                    
                    <!-- Retos -->
                    <article class="retos__section">
                        <h3 class="text-2xl font-bold text-blue-900 mb-6">🎯 Retos Actuales</h3>
                        
                        <div class="space-y-3">
                            <div 
                                v-for="challenge in challenges"
                                :key="challenge.id"
                                class="challenge__item bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg"
                            >
                                <h4 class="font-bold text-gray-900 mb-2">{{ challenge.title }}</h4>
                                <p class="text-sm text-gray-600 mb-2">{{ challenge.description }}</p>
                                <div class="flex justify-between items-center">
                                    <span class="text-xs text-gray-500">{{ challenge.participants }} participantes</span>
                                    <button 
                                        @click="joinChallenge(challenge.id)"
                                        class="text-green-500 font-bold hover:text-green-600"
                                    >
                                        Unirse
                                    </button>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    `,
    data() {
        return {
            recentComments: [
                {
                    id: 1,
                    avatar: '👤',
                    user: 'Etán',
                    text: 'Excelente artículo sobre la nutrición aplicada',
                    date: 'Hace 2 horas'
                },
                {
                    id: 2,
                    avatar: '👥',
                    user: 'Evio',
                    text: 'Exio entrenamiento de la incohonda',
                    date: 'Hace 5 horas'
                },
                {
                    id: 3,
                    avatar: '💪',
                    user: 'En la incohonda',
                    text: 'Esta es la mejor comunidad de fitness que conozco',
                    date: 'Hace 1 día'
                }
            ],
            forums: [
                {
                    id: 1,
                    title: 'Nutrición y Dieta',
                    description: 'Discute tus dudas sobre nutrición y planes de comida',
                    posts: 234,
                    lastUpdate: 'Hace 30 min'
                },
                {
                    id: 2,
                    title: 'Rutinas de Entrenamiento',
                    description: 'Comparte y pide feedback sobre tus rutinas',
                    posts: 456,
                    lastUpdate: 'Hace 1 hora'
                },
                {
                    id: 3,
                    title: 'Historias de Éxito',
                    description: 'Celebra tus logros con la comunidad',
                    posts: 189,
                    lastUpdate: 'Hace 2 horas'
                },
                {
                    id: 4,
                    title: 'Preguntas Frecuentes',
                    description: 'Resuelve tus dudas con expertos',
                    posts: 567,
                    lastUpdate: 'Hace 20 min'
                }
            ],
            topMembers: [
                { name: 'Carlos M.', points: 2500 },
                { name: 'María G.', points: 2300 },
                { name: 'Juan P.', points: 2100 },
                { name: 'Sofia R.', points: 1950 },
                { name: 'Antonio L.', points: 1850 }
            ],
            challenges: [
                {
                    id: 1,
                    title: '30 días sin azúcar',
                    description: 'Desafío de eliminar azúcar refinada por 30 días',
                    participants: 1250
                },
                {
                    id: 2,
                    title: 'Reto de abdominales',
                    description: 'Completa 100 abdominales diarios durante 21 días',
                    participants: 890
                },
                {
                    id: 3,
                    title: 'Caminata diaria',
                    description: '10,000 pasos al día durante todo el mes',
                    participants: 2100
                }
            ]
        };
    },
    methods: {
        viewAllComments() {
            console.log('Ver todos los comentarios');
        },
        openForum(id) {
            if (id === 1) {
                window.location.hash = '#forum';
            } else {
                window.location.hash = '#forum';
            }
        },
        joinChallenge(id) {
            console.log('Unirse al desafío:', id);
            alert('¡Te has unido al desafío!');
        }
    }
};
