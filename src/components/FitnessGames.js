/* Fitness Games Component - Gaming Section */
export default {
    template: `
        <section id="games" class="py-16 bg-white">
            <div class="container">
                <header class="mb-12">
                    <h2 class="text-3xl font-bold text-blue-900 mb-2">Fitness Video Games</h2>
                    <p class="text-gray-600">Aprende fitness de una forma divertida y gamificada</p>
                </header>
                
                <div class="games__grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <article 
                        v-for="game in games"
                        :key="game.id"
                        class="game__card bg-gradient-to-br from-blue-50 to-green-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
                    >
                        <!-- Game Image/Icon -->
                        <figure class="relative bg-gradient-to-b from-blue-400 to-blue-600 h-32 flex items-center justify-center">
                            <span class="text-5xl">{{ game.icon }}</span>
                            <figcaption class="sr-only">{{ game.title }}</figcaption>
                        </figure>
                        
                        <!-- Game Info -->
                        <div class="p-4">
                            <h3 class="text-lg font-bold text-blue-900 mb-2">{{ game.title }}</h3>
                            <p class="text-gray-600 text-sm mb-4">{{ game.description }}</p>
                            
                            <!-- Difficulty Level -->
                            <div class="mb-4">
                                <p class="text-xs text-gray-500 mb-2">Dificultad:</p>
                                <div class="difficulty-bars flex gap-1">
                                    <span 
                                        v-for="i in 5"
                                        :key="i"
                                        :class="[
                                            'h-2 w-2 rounded-full transition',
                                            i <= game.difficulty ? 'bg-green-500' : 'bg-gray-300'
                                        ]"
                                    ></span>
                                </div>
                            </div>
                            
                            <!-- Play Button -->
                            <button 
                                @click="playGame(game.id)"
                                class="w-full bg-green-500 text-white py-2 rounded font-bold hover:bg-green-600 transition"
                                :aria-label="'Jugar ' + game.title"
                            >
                                Jugar
                            </button>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    `,
    data() {
        return {
            games: [
                {
                    id: 1,
                    title: 'Juego de Nutrición',
                    icon: '🍎',
                    description: 'Aprende a identificar alimentos saludables',
                    difficulty: 2
                },
                {
                    id: 2,
                    title: 'Juego de Técnica',
                    icon: '💪',
                    description: 'Domina la técnica correcta de ejercicios',
                    difficulty: 3
                },
                {
                    id: 3,
                    title: 'Simulador de progreso',
                    icon: '📈',
                    description: 'Visualiza tu progreso a largo plazo',
                    difficulty: 2
                },
                {
                    id: 4,
                    title: 'Simulador de progreso físico',
                    icon: '🏋️',
                    description: 'Entrena virtualmente y gana logros',
                    difficulty: 4
                }
            ]
        };
    },
    methods: {
        playGame(id) {
            console.log('Jugando game:', id);
            // Navigate to game
        }
    }
};
