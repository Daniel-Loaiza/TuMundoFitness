/* Interactive Training Component - Training Calculator */
export default {
    template: `
        <section id="training" class="py-16 bg-gradient-to-r from-blue-900 to-blue-800">
            <div class="container">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <!-- Interactive Calculator -->
                    <article class="training__calculator bg-white rounded-lg p-8 shadow-xl">
                        <h2 class="text-2xl font-bold text-blue-900 mb-6">Entrenamiento Interactivo</h2>
                        <p class="text-gray-600 mb-6">(Tu diferenciador)</p>
                        
                        <form class="space-y-6">
                            <!-- Age Input -->
                            <div class="form__group">
                                <label for="age" class="block text-gray-700 font-bold mb-2">
                                    ¿Cuál es tu edad?
                                </label>
                                <input 
                                    id="age"
                                    v-model.number="form.age"
                                    type="number"
                                    min="13"
                                    max="100"
                                    placeholder="Ingresa tu edad"
                                    class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
                                    @change="calculateCalories"
                                >
                            </div>
                            
                            <!-- Weight Input -->
                            <div class="form__group">
                                <label for="weight" class="block text-gray-700 font-bold mb-2">
                                    Peso (kg)
                                </label>
                                <input 
                                    id="weight"
                                    v-model.number="form.weight"
                                    type="number"
                                    min="20"
                                    placeholder="Ingresa tu peso"
                                    class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
                                    @change="calculateCalories"
                                >
                            </div>
                            
                            <!-- Difficulty Level -->
                            <div class="form__group">
                                <label class="block text-gray-700 font-bold mb-3">Dificultad</label>
                                <div class="space-y-2">
                                    <label class="flex items-center">
                                        <input 
                                            type="radio" 
                                            v-model="form.difficulty"
                                            value="low"
                                            name="difficulty"
                                            class="mr-2"
                                        >
                                        <span class="text-gray-700">Baja</span>
                                    </label>
                                    <label class="flex items-center">
                                        <input 
                                            type="radio" 
                                            v-model="form.difficulty"
                                            value="medium"
                                            name="difficulty"
                                            class="mr-2"
                                        >
                                        <span class="text-gray-700">Media</span>
                                    </label>
                                    <label class="flex items-center">
                                        <input 
                                            type="radio" 
                                            v-model="form.difficulty"
                                            value="high"
                                            name="difficulty"
                                            class="mr-2"
                                        >
                                        <span class="text-gray-700">Alta</span>
                                    </label>
                                </div>
                            </div>
                            
                            <!-- Calculate Button -->
                            <button 
                                type="button"
                                @click="calculateCalories"
                                class="w-full bg-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600 transition"
                            >
                                Calcular
                            </button>
                        </form>
                        
                        <!-- Results -->
                        <div v-if="results" class="mt-6 p-4 bg-green-50 rounded-lg">
                            <p class="text-gray-700">
                                <strong>Calorías recomendadas:</strong> {{ results.calories }} cal/día
                            </p>
                        </div>
                    </article>
                    
                    <!-- Info Section -->
                    <article class="training__info text-white">
                        <h3 class="text-3xl font-bold mb-6 text-white">Generador de rutinas (IA)</h3>
                        <p class="text-blue-100 mb-6">
                            Utiliza inteligencia artificial para generar rutinas de entrenamiento 
                            personalizadas según tus objetivos, nivel y disponibilidad.
                        </p>
                        
                        <div class="bg-white bg-opacity-10 rounded-lg p-6">
                            <h4 class="font-bold mb-4">Características:</h4>
                            <ul class="space-y-2 text-blue-100">
                                <li>✓ Rutinas personalizadas por IA</li>
                                <li>✓ Adapta a tu nivel de fitness</li>
                                <li>✓ Incluye ejercicios alternativos</li>
                                <li>✓ Progresión automática de intensidad</li>
                            </ul>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    `,
    data() {
        return {
            form: {
                age: null,
                weight: null,
                difficulty: 'medium'
            },
            results: null
        };
    },
    methods: {
        calculateCalories() {
            if (!this.form.age || !this.form.weight) return;
            
            // Simple calorie calculation based on weight
            let baseCalories = this.form.weight * 25;
            
            // Adjust by difficulty
            const multipliers = {
                low: 0.9,
                medium: 1,
                high: 1.2
            };
            
            const totalCalories = Math.round(baseCalories * multipliers[this.form.difficulty]);
            
            this.results = {
                calories: totalCalories
            };
        }
    }
};
