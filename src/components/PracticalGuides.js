/* Practical Guides Component - Training Guides */
export default {
    template: `
        <section id="guides" class="py-16 bg-gray-50">
            <div class="container">
                <header class="mb-12">
                    <h2 class="text-3xl font-bold text-blue-900 mb-2">Guías Prácticas</h2>
                    <p class="text-gray-600">Aprende paso a paso cómo lograr tus objetivos de fitness</p>
                </header>
                
                <div class="guides__grid grid grid-cols-1 md:grid-cols-3 gap-8">
                    <article 
                        v-for="guide in guides"
                        :key="guide.id"
                        class="guide__card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
                    >
                        <figure class="relative">
                            <img 
                                :src="guide.image"
                                :alt="guide.title"
                                class="w-full h-48 object-cover"
                            >
                            <figcaption class="sr-only">{{ guide.title }}</figcaption>
                        </figure>
                        
                        <div class="p-6">
                            <h3 class="text-xl font-bold text-blue-900 mb-3">{{ guide.title }}</h3>
                            
                            <!-- Steps List -->
                            <ol class="list-decimal list-inside space-y-2 mb-4 text-gray-700">
                                <li v-for="step in guide.steps" :key="step">
                                    {{ step }}
                                </li>
                            </ol>
                            
                            <button 
                                @click="viewGuide(guide.id)"
                                class="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-800 transition font-bold"
                                :aria-label="'Ver guía completa: ' + guide.title"
                            >
                                Ver Guía Completa
                            </button>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    `,
    data() {
        return {
            guides: [
                {
                    id: 1,
                    title: 'Cómo bajar de peso',
                    image: 'https://images.pexels.com/photos/11254665/pexels-photo-11254665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                    steps: [
                        'Establece tu meta realista',
                        'Implementa una dieta balanceada',
                        'Ejercita 3-4 veces por semana',
                        'Duerme 7-8 horas cada noche'
                    ]
                },
                {
                    id: 2,
                    title: 'Rutinas según tu objetivo',
                    image: 'https://images.pexels.com/photos/7721988/pexels-photo-7721988.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                    steps: [
                        'Define tu objetivo',
                        'Elige ejercicios apropiados',
                        'Establece frecuencia y duración',
                        'Incrementa intensidad gradualmente'
                    ]
                },
                {
                    id: 3,
                    title: 'Errores comunes',
                    image: 'https://images.pexels.com/photos/14623668/pexels-photo-14623668.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                    steps: [
                        'Evita sobrentrenamiento',
                        'Mantén buena forma',
                        'No saltes calentamiento',
                        'Descansa adecuadamente'
                    ]
                }
            ]
        };
    },
    methods: {
        viewGuide(id) {
            console.log('Ver guía:', id);
        }
    }
};
