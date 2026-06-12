/* Interactive Training Component - Training Calculator */
export default {
    name: 'InteractiveTraining',
    template: `
        <section id="training" class="py-16 bg-gradient-to-r from-blue-900 to-blue-800">
            <div class="container">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    
                    <article class="training__calculator bg-white rounded-lg p-8 shadow-xl">
                        <h2 class="text-2xl font-bold text-blue-900 mb-6">Entrenamiento Interactivo</h2>
                        <p class="text-gray-600 mb-6">(Tu diferenciador)</p>
                        
                        <form class="space-y-6" @submit.prevent="generateRoutine">
                            <div class="form__group">
                                <label for="age" class="block text-gray-700 font-bold mb-2">
                                    ¿Cuál es tu edad?
                                </label>
                                <input 
                                    id="age"
                                    v-model.number="form.age"
                                    type="number"
                                    min="1"
                                    max="100"
                                    placeholder="Ingresa tu edad"
                                    class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
                                    required
                                >
                            </div>
                            
                            <div class="form__group">
                                <label for="weight" class="block text-gray-700 font-bold mb-2">
                                    Peso (kg)
                                </label>
                                <input 
                                    id="weight"
                                    v-model.number="form.weight"
                                    type="number"
                                    min="10"
                                    placeholder="Ingresa tu peso"
                                    class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
                                    required
                                >
                            </div>
                            
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
                            
                            <button 
                                type="submit"
                                class="w-full bg-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600 transition"
                            >
                                Calcular Rutina Personalizada
                            </button>
                        </form>
                    </article>
                    
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

            <div 
                v-if="isModalOpen" 
                class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
                @click.self="closeModal"
            >
                <div class="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden p-6 relative max-h-[90vh] flex flex-col">
                    
                    <button 
                        @click="closeModal" 
                        class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold focus:outline-none"
                    >
                        &times;
                    </button>

                    <header class="mb-4 pb-3 border-b border-gray-100">
                        <h3 class="text-2xl font-bold text-blue-900">
                            📋 Tu Plan de Entrenamiento
                        </h3>
                        <p class="text-sm text-gray-500 mt-1">
                            Perfil detectado: Edad ({{ form.age }} años) | Peso ({{ form.weight }} kg) | Intensidad ({{ currentDifficultyLabel }})
                        </p>
                    </header>

                    <div class="overflow-y-auto flex-1 pr-2 space-y-4 my-2">
                        
                        <div class="grid grid-cols-2 gap-4 bg-blue-50 p-3 rounded-lg text-sm">
                            <div>
                                <span class="text-gray-600 block">Calorías Diarias Recomendadas:</span>
                                <strong class="text-blue-900 text-base">{{ calculatedCalories }} kcal</strong>
                            </div>
                            <div>
                                <span class="text-gray-600 block">Enfoque del Segmento:</span>
                                <strong class="text-blue-900 text-base">{{ routineResults.focus }}</strong>
                            </div>
                        </div>

                        <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <h4 class="font-bold text-gray-900 mb-3 text-lg border-b pb-1 flex items-center gap-2">
                                🏃‍♂️ {{ routineResults.title }}
                            </h4>
                            <p class="text-gray-700 text-sm mb-4 leading-relaxed whitespace-pre-line">
                                {{ routineResults.description }}
                            </p>
                            
                            <h5 class="font-bold text-xs uppercase tracking-wider text-gray-500 mb-2">Ejercicios Recomendados:</h5>
                            <ul class="space-y-2">
                                <li 
                                    v-for="(exercise, idx) in routineResults.exercises" 
                                    :key="idx"
                                    class="bg-white p-2.5 rounded border border-gray-100 text-sm flex justify-between items-center shadow-sm"
                                >
                                    <span class="text-gray-800 font-medium">💪 {{ exercise.name }}</span>
                                    <span class="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full font-bold">
                                        {{ exercise.sets }}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <footer class="mt-4 pt-3 border-t border-gray-100">
                        <button 
                            @click="closeModal"
                            class="w-full bg-blue-900 text-white py-2.5 rounded-lg font-bold hover:bg-blue-800 transition"
                        >
                            ¡Entendido, a Entrenar!
                        </button>
                    </footer>
                    
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
            isModalOpen: false,
            calculatedCalories: 0,
            routineResults: {
                title: '',
                focus: '',
                description: '',
                exercises: []
            }
        };
    },
    computed: {
        currentDifficultyLabel() {
            const labels = { low: 'Baja', medium: 'Media', high: 'Alta' };
            return labels[this.form.difficulty] || 'Media';
        }
    },
    methods: {
        generateRoutine() {
            // Validaciones de seguridad iniciales
            if (!this.form.age || !this.form.weight) return;

            // 1. Clasificación estricta de Rangos de Edad solicitados
            let ageGroup = '';
            if (this.form.age <= 21) {
                ageGroup = 'joven';
            } else if (this.form.age <= 60) {
                ageGroup = 'adulto';
            } else {
                ageGroup = 'senior';
            }

            // 2. Clasificación estricta de Rangos de Peso solicitados
            let weightGroup = '';
            if (this.form.weight < 45) {
                weightGroup = 'bajo';
            } else if (this.form.weight <= 75) {
                weightGroup = 'medio';
            } else {
                weightGroup = 'alto';
            }

            // 3. Cálculo matemático base de calorías de apoyo
            let baseCal = this.form.weight * 24;
            const difficultyMultipliers = { low: 0.9, medium: 1.0, high: 1.2 };
            this.calculatedCalories = Math.round(baseCal * difficultyMultipliers[this.form.difficulty]);

            // 4. Motor de Reglas para Rutinas Personalizadas por Segmentos Cruzados
            let targetRoutine = {
                title: 'Plan General Estándar',
                focus: 'Acondicionamiento Físico',
                description: 'Rutina balanceada adaptada para mantener un ritmo metabólico óptimo.',
                exercises: [{ name: 'Sentadillas libres', sets: '3 series de 12 rep' }]
            };

            // Matriz de decisiones de lógica física
            if (ageGroup === 'joven') {
                targetRoutine.focus = 'Desarrollo, Flexibilidad y Fuerza Base';
                
                if (this.form.difficulty === 'high') {
                    targetRoutine.title = 'Acondicionamiento Atlético Juvenil Pro';
                    targetRoutine.description = 'Diseñado para optimizar la densidad ósea y el rendimiento deportivo sin sobrecargar articulaciones en desarrollo rápido.';
                    targetRoutine.exercises = [
                        { name: 'Sentadillas con Goblet', sets: '4 series x 12 rep' },
                        { name: 'Flexiones de pecho declinadas', sets: '3 series x Max' },
                        { name: 'Dominadas o jalón al pecho', sets: '3 series x 10 rep' },
                        { name: 'Plancha dinámica abdominal', sets: '3 series de 45 seg' }
                    ];
                } else {
                    targetRoutine.title = 'Rutina de Resistencia Funcional Escolar';
                    targetRoutine.description = 'Plan de bajo impacto centrado en la higiene postural y el control de movimientos coordinados.';
                    targetRoutine.exercises = [
                        { name: 'Flexiones con apoyo en rodillas', sets: '3 series x 10 rep' },
                        { name: 'Zancadas invertidas alternas', sets: '3 series x 12 rep' },
                        { name: 'Puentes de glúteo', sets: '3 series x 15 rep' }
                    ];
                }
            } 
            else if (ageGroup === 'adulto') {
                if (weightGroup === 'alto') {
                    targetRoutine.focus = 'Recomposición Corporal e Hipertrofia';
                    
                    if (this.form.difficulty === 'high' || this.form.difficulty === 'medium') {
                        targetRoutine.title = 'Fuerza Total y Déficit Calórico Controlado';
                        targetRoutine.description = 'Entrenamiento pesado enfocado en preservar masa muscular mientras se eleva el gasto térmico residual debido al peso actual.';
                        targetRoutine.exercises = [
                            { name: 'Prensa de piernas o Sentadilla Pesada', sets: '4 series x 8-10 rep' },
                            { name: 'Press de Banca con mancuernas', sets: '4 series x 10 rep' },
                            { name: 'Remo con barra para espalda', sets: '3 series x 10 rep' },
                            { name: 'Elevación de piernas colgado', sets: '3 series x 12 rep' }
                        ];
                    } else {
                        targetRoutine.title = 'Circuito Metabólico de Bajo Impacto Articular';
                        targetRoutine.description = 'Movimientos adaptados orientados a la quema de energía cuidando rodillas y zona lumbar.';
                        targetRoutine.exercises = [
                            { name: 'Sentadillas a cajón alto', sets: '3 series x 12 rep' },
                            { name: 'Press militar sentado con mancuernas', sets: '3 series x 12 rep' },
                            { name: 'Pájaros de hombro (Vuelos)', sets: '3 series x 15 rep' }
                        ];
                    }
                } else {
                    // Peso Bajo / Medio Adulto
                    targetRoutine.focus = 'Tonificación y Resistencia muscular';
                    targetRoutine.title = 'Rutina Completa Estilo Full-Body';
                    targetRoutine.description = 'Esquema global multiarticular idóneo para optimizar tiempos y estimular todos los grupos musculares.';
                    targetRoutine.exercises = [
                        { name: 'Zancadas dinámicas', sets: '3 series x 12 por pierna' },
                        { name: 'Flexiones tradicionales en suelo', sets: '3 series x 12-15 rep' },
                        { name: 'Remo invertido en TRX / Barra', sets: '3 series x 10 rep' }
                    ];
                }
            } 
            else if (ageGroup === 'senior') {
                targetRoutine.focus = 'Preservación de Masa Magra (Sarcopenia) y Equilibrio';
                targetRoutine.description = 'Prioriza la movilidad articular total, fortalecimiento lumbar y estabilidad para el día a día.';
                
                if (this.form.difficulty === 'high') {
                    targetRoutine.title = 'Fuerza Activa Senior avanzada';
                    targetRoutine.exercises = [
                        { name: 'Sentadilla en pared (Wall sit)', sets: '3 series de 30 seg' },
                        { name: 'Remo bajo en polea fija', sets: '3 series x 12 rep' },
                        { name: 'Paseo del granjero con mancuernas ligeras', sets: '3 vueltas de 20 metros' }
                    ];
                } else {
                    targetRoutine.title = 'Movilidad Segura y Funcional';
                    targetRoutine.exercises = [
                        { name: 'Extensiones de rodilla en silla', sets: '3 series x 15 rep' },
                        { name: 'Elevaciones laterales de brazos', sets: '3 series x 12 rep' },
                        { name: 'Puntas de pie (Gemelos en escalón)', sets: '3 series x 20 rep' }
                    ];
                }
            }

            // Inyectar el resultado mapeado y desplegar el modal
            this.routineResults = targetRoutine;
            this.isModalOpen = true;
        },
        closeModal() {
            this.isModalOpen = false;
        }
    }
};