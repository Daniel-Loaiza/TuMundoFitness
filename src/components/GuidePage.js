/* Guide Page Component - Practical Guide Detail (Local Modal Implementation) */
export default {
    template: `
        <section id="guides" class="py-16 bg-slate-50">
            <div class="container">
                <header class="mb-12">
                    <h2 class="text-3xl font-bold text-slate-900 mb-2">Guías Prácticas</h2>
                    <p class="text-slate-600">Aprende paso a paso cómo optimizar tus entrenamientos, nutrición y hábitos.</p>
                </header>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <article 
                        v-for="guide in guides" 
                        :key="guide.id"
                        class="rounded-3xl bg-white overflow-hidden shadow-md hover:shadow-xl transition flex flex-col h-full border border-slate-100"
                    >
                        <img 
                            :src="guide.image" 
                            :alt="guide.title"
                            class="w-full h-52 object-cover"
                        >
                        <div class="p-6 flex flex-col flex-grow">
                            <h3 class="text-xl font-bold text-slate-900 mb-3">{{ guide.title }}</h3>
                            <p class="text-slate-600 text-sm mb-6 flex-grow">
                                Amplía los primeros pasos de esta temática para ayudarte a avanzar con seguridad y resultados.
                            </p>
                            <footer class="flex justify-end mt-auto">
                                <button 
                                    type="button"
                                    @click="openGuide(guide.id)"
                                    class="rounded-full bg-blue-900 px-5 py-2 text-xs font-semibold text-white hover:bg-blue-800 transition shadow-sm"
                                >
                                    Ver Guía Completa →
                                </button>
                            </footer>
                        </div>
                    </article>
                </div>
            </div>

            <div 
                v-if="showModal" 
                class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-8 backdrop-blur-sm"
                @click.self="closeModal"
            >
                <div class="w-full max-w-3xl overflow-hidden rounded-[32px] bg-white shadow-2xl max-h-[90vh] flex flex-col">
                    
                    <div class="border-b border-slate-200 bg-slate-50 px-6 py-4">
                        <div class="flex items-start justify-between gap-4">
                            <div>
                                <h2 class="text-2xl font-bold text-slate-900">{{ selectedGuide.title }}</h2>
                                <p class="mt-1 text-sm text-slate-500">Guía de pasos oficiales</p>
                            </div>
                            <button
                                type="button"
                                @click="closeModal"
                                class="text-slate-400 transition hover:text-slate-900 font-bold text-xl p-1"
                                aria-label="Cerrar guía"
                            >
                                ✕
                            </button>
                        </div>
                    </div>

                    <div class="overflow-y-auto p-6 space-y-6">
                        <div>
                            <img
                                :src="selectedGuide.image"
                                :alt="selectedGuide.title"
                                class="h-64 sm:h-80 w-full object-cover rounded-2xl"
                            >
                        </div>
                        
                        <div>
                            <p class="text-slate-600 mb-6 text-sm sm:text-base leading-relaxed">
                                Esta guía completa amplía los primeros pasos para ayudarte a avanzar con seguridad y resultados. Sigue las recomendaciones a continuación:
                            </p>

                            <ol class="space-y-3 list-decimal list-inside text-slate-700">
                                <li 
                                    v-for="(step, idx) in selectedGuide.fullSteps" 
                                    :key="idx" 
                                    class="rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm sm:text-base leading-relaxed"
                                >
                                    <span class="text-slate-800 font-medium">{{ step }}</span>
                                </li>
                            </ol>
                        </div>
                    </div>

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
            selectedGuide: null,
            guides: [
                {
                    id: 1,
                    title: 'Cómo bajar de peso',
                    image: 'https://images.pexels.com/photos/11254665/pexels-photo-11254665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                    fullSteps: [
                        'Establece tu meta realista.',
                        'Implementa una dieta balanceada.',
                        'Ejercita 3-4 veces por semana.',
                        'Duerme 7-8 horas cada noche.',
                        'Hidrátate antes, durante y después del ejercicio.',
                        'Registra tus comidas para mantener el control.',
                        'Aumenta el consumo de vegetales y fibra.',
                        'Escucha a tu cuerpo para evitar lesiones.',
                        'Ajusta tus porciones según tu progreso.',
                        'Evalúa tu avance cada dos semanas y ajusta la rutina.'
                    ]
                },
                {
                    id: 2,
                    title: 'Rutinas según tu objetivo',
                    image: 'https://images.pexels.com/photos/7721988/pexels-photo-7721988.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                    fullSteps: [
                        'Define tu objetivo con claridad.',
                        'Elige ejercicios apropiados para tu nivel.',
                        'Establece frecuencia y duración realistas.',
                        'Incrementa intensidad gradualmente.',
                        'Incluye calentamiento y enfriamiento.',
                        'Cambia tu rutina cada 4-6 semanas.',
                        'Mezcla cardio con fuerza y movilidad.',
                        'Respeta los días de descanso activo.',
                        'Controla la técnica antes de aumentar peso.',
                        'Registra tus sesiones para mantener la constancia.'
                    ]
                },
                {
                    id: 3,
                    title: 'Errores comunes',
                    image: 'https://images.pexels.com/photos/14623668/pexels-photo-14623668.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                    fullSteps: [
                        'Evita sobrentrenamiento.',
                        'Mantén buena forma en cada ejercicio.',
                        'No saltes el calentamiento.',
                        'Descansa adecuadamente entre sesiones.',
                        'No compares tu progreso con el de otros.',
                        'No ignores señales de dolor agudo.',
                        'No confíes solo en ejercicios de moda.',
                        'No tomes suplementos sin asesoría.',
                        'No olvides balancear fuerza y flexibilidad.',
                        'No dejes de revisar tu técnica periódicamente.'
                    ]
                }
            ]
        };
    },
    methods: {
        openGuide(id) {
            const guide = this.guides.find(item => item.id === id);
            if (!guide) return;
            this.selectedGuide = guide;
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
            this.selectedGuide = null;
        }
    }
};