/* Guide Page Component - Practical Guide Detail */
export default {
    props: {
        guideId: {
            type: Number,
            required: true
        }
    },
    template: `
        <section class="py-16 bg-slate-50 min-h-screen">
            <div class="container">
                <div v-if="selectedGuide" class="space-y-8">
                    <div class="overflow-hidden rounded-3xl bg-white shadow-lg">
                        <img
                            :src="selectedGuide.image"
                            :alt="selectedGuide.title"
                            class="w-full h-[420px] object-cover"
                        >
                    </div>

                    <div class="rounded-[32px] bg-white p-8 shadow-lg">
                        <h1 class="text-4xl font-bold text-slate-900 mb-4">{{ selectedGuide.title }}</h1>
                        <p class="text-slate-600 mb-8">
                            Esta guía completa amplía los primeros pasos para ayudarte a avanzar con seguridad y resultados.
                        </p>

                        <ol class="space-y-6 list-decimal list-inside text-slate-700">
                            <li v-for="step in selectedGuide.fullSteps" :key="step" class="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                                {{ step }}
                            </li>
                        </ol>
                    </div>
                </div>

                <div v-else class="rounded-[32px] bg-white p-8 shadow-lg text-center">
                    <p class="text-lg text-slate-700">No se encontró la guía solicitada.</p>
                    <a href="#home" class="inline-flex mt-6 rounded-full bg-blue-900 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-800">
                        Volver a inicio
                    </a>
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
    computed: {
        selectedGuide() {
            return this.guides.find(guide => guide.id === this.guideId) || null;
        }
    }
};
