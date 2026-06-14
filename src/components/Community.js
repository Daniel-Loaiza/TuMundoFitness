import ForumPage from './ForumPage.js';
import ForumEntrenamiento from './ForumEntrenamiento.js';
import ForumHistorias from './ForumHistorias.js';
import ForumFAQs from './ForumFAQs.js';

export default {
    components: {
        ForumPage,
        ForumEntrenamiento,
        ForumHistorias,
        ForumFAQs
    },
    template: `
        <section id="community" class="py-16 bg-white">
            <div class="container">
                
                <div v-if="activeForumId !== null">
                    <button 
                        @click="activeForumId = null" 
                        class="mb-6 flex items-center text-blue-900 font-bold hover:text-blue-700"
                    >
                        ← Volver a la Comunidad
                    </button>

                    <ForumPage v-if="activeForumId === 1" :forum="selectedForumData" />
                    <ForumEntrenamiento v-if="activeForumId === 2" :forum="selectedForumData" />
                    <ForumHistorias v-if="activeForumId === 3" :forum="selectedForumData" />
                    <ForumFAQs v-if="activeForumId === 4" :forum="selectedForumData" />
                </div>

                <div v-else-if="viewingAllComments">
                    <button 
                        @click="viewingAllComments = false" 
                        class="mb-6 flex items-center text-blue-900 font-bold hover:text-blue-700"
                    >
                        ← Volver a la Comunidad
                    </button>

                    <header class="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h2 class="text-3xl font-bold text-blue-900 mb-2">Comentarios Recientes</h2>
                            <p class="text-gray-600">Revisa e interactúa con los últimos aportes de nuestros miembros activos.</p>
                        </div>
                        <button 
                            @click="openNewCommentModal"
                            class="bg-green-500 hover:bg-green-600 text-white font-bold py-2.5 px-5 rounded-lg shadow transition text-sm self-start sm:self-auto"
                        >
                            + Agregar comentario
                        </button>
                    </header>

                    <div class="max-w-3xl space-y-4 mb-8">
                        <div 
                            v-for="comment in allComments"
                            :key="comment.id"
                            class="comment__item border-l-4 border-green-500 pl-4 py-4 bg-gray-50 rounded shadow-sm hover:bg-gray-100 transition"
                        >
                            <div class="flex items-start gap-4">
                                <span class="text-3xl bg-white p-1.5 rounded shadow-sm">{{ comment.avatar }}</span>
                                <div class="flex-1">
                                    <h4 class="font-bold text-gray-900 text-base">{{ comment.user }}</h4>
                                    <p class="text-gray-700 text-sm mt-1 mb-2 leading-relaxed">{{ comment.text }}</p>
                                    <p class="text-xs text-gray-400 font-medium">{{ comment.date }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else>
                    <header class="mb-12">
                        <h2 class="text-3xl font-bold text-blue-900 mb-2">Community</h2>
                        <p class="text-gray-600">Únete a miles de personas en su viaje de fitness</p>
                    </header>
                    
                    <div class="community__grid grid grid-cols-1 lg:grid-cols-2 gap-12">
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
                                class="mt-6 text-green-500 font-bold hover:text-green-600 flex items-center gap-1"
                                @click="viewAllComments"
                            >
                                Ver todos los comentarios →
                            </button>
                        </article>
                        
                        <article class="community__forums">
                            <h3 class="text-2xl font-bold text-blue-900 mb-6">Foros de Discusión</h3>
                            <div class="space-y-4">
                                <div 
                                    v-for="forum in forums"
                                    :key="forum.id"
                                    class="forum__item border border-gray-200 rounded-lg p-4 hover:border-green-500 transition cursor-pointer"
                                    @click="openForum(forum)"
                                >
                                    <div class="flex justify-between items-start mb-2">
                                        <h4 class="font-bold text-gray-900">{{ forum.title }}</h4>
                                        <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                            {{ forum.posts }} posts
                                        </span>
                                    </div>
                                    <p class="text-gray-600 text-sm mb-2">{{ forum.description }}</p>
                                    <p class="text-xs text-gray-500">Último: {{ forum.lastUpdate }}</p>
                                </div>
                            </div>
                        </article>
                    </div>
                    
                    <div class="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <article class="rankings__section">
                            <h3 class="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-2">
                                🏆 Rankings y Retos
                            </h3>
                            <details class="mb-4" open>
                                <summary class="cursor-pointer font-bold text-blue-900 hover:text-blue-800">
                                    Top 5 Miembros Activos
                                </summary>
                                <ol class="mt-4 list-decimal list-inside space-y-2 text-gray-700">
                                    <li v-for="(member, idx) in sortedTopMembers" :key="idx">
                                        <span class="font-bold">{{ member.name }}</span> - {{ member.points }} puntos
                                    </li>
                                </ol>
                            </details>
                        </article>
                        
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
                                            @click="openChallengeModal(challenge)"
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

                <div 
                    v-if="isCommentModalOpen" 
                    class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
                    @click.self="closeCommentModal"
                >
                    <div class="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden p-6 relative">
                        <header class="mb-4 pb-2 border-b border-gray-100">
                            <h3 class="text-xl font-bold text-blue-900">Nuevo comentario</h3>
                        </header>
                        <form @submit.prevent="submitComment" class="space-y-4">
                            <div>
                                <label for="commentUser" class="block text-sm font-bold text-gray-700 mb-1">Tu Nombre</label>
                                <input id="commentUser" v-model="newComment.user" type="text" required placeholder="Ej. Juan Pérez" class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500 text-sm">
                            </div>
                            <div>
                                <label for="commentText" class="block text-sm font-bold text-gray-700 mb-1">Contenido del Comentario</label>
                                <textarea id="commentText" v-model="newComment.text" rows="4" required placeholder="Escribe tu comentario..." class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500 text-sm"></textarea>
                            </div>
                            <div class="flex justify-end gap-3 pt-2">
                                <button type="button" @click="closeCommentModal" class="px-4 py-2 border border-gray-300 text-gray-700 rounded font-bold hover:bg-gray-100 transition text-sm">Cancelar</button>
                                <button type="submit" class="px-4 py-2 bg-green-500 text-white rounded font-bold hover:bg-green-600 transition text-sm">Enviar</button>
                            </div>
                        </form>
                    </div>
                </div>

                <div 
                    v-if="isChallengeModalOpen" 
                    class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
                    @click.self="closeChallengeModal"
                >
                    <div class="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden p-6 relative">
                        <header class="mb-4 pb-2 border-b border-gray-100">
                            <h3 class="text-xl font-bold text-blue-900">
                                Reto: {{ selectedChallengeData?.title }}
                            </h3>
                        </header>

                        <form @submit.prevent="submitChallengeRegistration" class="space-y-4">
                            <div>
                                <label for="challengeUser" class="block text-sm font-bold text-gray-700 mb-1">Nombre de Usuario</label>
                                <input 
                                    id="challengeUser"
                                    v-model="challengeForm.user"
                                    type="text" 
                                    required 
                                    placeholder="Ej. Carlos M. o tu nuevo usuario"
                                    class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500 text-sm"
                                >
                            </div>
                            <div>
                                <label for="challengeEmail" class="block text-sm font-bold text-gray-700 mb-1">Correo Electrónico</label>
                                <input 
                                    id="challengeEmail"
                                    v-model="challengeForm.email"
                                    type="email" 
                                    required 
                                    placeholder="ejemplo@correo.com"
                                    class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500 text-sm"
                                >
                            </div>

                            <div class="flex justify-end gap-3 pt-2">
                                <button 
                                    type="button" 
                                    @click="closeChallengeModal"
                                    class="px-4 py-2 border border-gray-300 text-gray-700 rounded font-bold hover:bg-gray-100 transition text-sm"
                                >
                                    Cancelar
                                </button>
                                <button 
                                    type="submit" 
                                    class="px-4 py-2 bg-green-500 text-white rounded font-bold hover:bg-green-600 transition text-sm"
                                >
                                    Enviar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </section>
    `,
    data() {
        return {
            activeForumId: null,     
            selectedForumData: null, 
            viewingAllComments: false,
            isCommentModalOpen: false, 
            isChallengeModalOpen: false, // Control del nuevo modal de retos
            selectedChallengeData: null, // Guarda el objeto del reto al que se le dio clic
            newComment: { user: '', text: '' },
            // Estructura del formulario del reto
            challengeForm: { user: '', email: '' },
            recentComments: [
                { id: 1, avatar: '👤', user: 'Sebastián López', text: 'Excelente artículo sobre la nutrición aplicada', date: 'Hace 2 horas' },
                { id: 2, avatar: '👥', user: 'Emilio García', text: 'Exio entrenamiento de la incohonda', date: 'Hace 5 horas' },
                { id: 3, avatar: '💪', user: 'Mariana Rodríguez', text: 'Esta es la mejor comunidad de fitness que conozco', date: 'Hace 1 día' }
            ],
            allComments: [
                { id: 1, avatar: '👤', user: 'Sebastián López', text: 'Excelente artículo sobre la nutrición aplicada', date: 'Hace 2 horas' },
                { id: 2, avatar: '👥', user: 'Emilio García', text: 'Exio entrenamiento de la incohonda', date: 'Hace 5 horas' },
                { id: 3, avatar: '💪', user: 'Mariana Rodríguez', text: 'Esta es la mejor comunidad de fitness que conozco', date: 'Hace 1 día' },
                { id: 4, avatar: '🏃‍♂️', user: 'Andrés Mendoza', text: 'Hoy completé el reto de los 10k pasos, ¡se siente genial!', date: 'Hace 1 día' },
                { id: 5, avatar: '🥗', user: 'Camila Torres', text: '¿Alguien tiene sustitutos limpios para el aderezo César?', date: 'Hace 2 días' },
                { id: 6, avatar: '🏋️‍♀️', user: 'Laura Beltrán', text: 'Las rutinas cargadas por el calculador dinámico me ahorran mucho tiempo.', date: 'Hace 2 días' },
                { id: 7, avatar: '🔥', user: 'Diego Rincón', text: 'Llevo una semana sin azúcar refinada y la energía ya es otra.', date: 'Hace 3 días' },
                { id: 8, avatar: '🎯', user: 'Paula Hoyos', text: 'Busco compañero/a en Medellín para entrenar calistenia.', date: 'Hace 3 días' },
                { id: 9, avatar: '🧠', user: 'Ricardo Sanz', text: 'Buenísimo el último podcast de Potencia tus Genes, aclara demasiadas dudas.', date: 'Hace 4 días' },
                { id: 10, avatar: '⚡', user: 'Natalia Vélez', text: '¿Recomiendan entrenar pierna 2 o 3 veces por semana para hipertrofia?', date: 'Hace 5 días' }
            ],
            forums: [
                { id: 1, title: 'Nutrición y Dieta', description: 'Discute tus dudas sobre nutrición y planes de comida', posts: 234, lastUpdate: 'Hace 30 min' },
                { id: 2, title: 'Rutinas de Entrenamiento', description: 'Comparte y pide feedback sobre tus rutinas', posts: 456, lastUpdate: 'Hace 1 hora' },
                { id: 3, title: 'Historias de Éxito', description: 'Celebra tus logros con la comunidad', posts: 189, lastUpdate: 'Hace 2 horas' },
                { id: 4, title: 'Preguntas Frecuentes', description: 'Resuelve tus dudas con expertos', posts: 567, lastUpdate: 'Hace 20 min' }
            ],
            // Base completa de miembros (se usa para calcular el Top 5 ordenado)
            topMembers: [
                { name: 'Carlos M.', points: 2500 },
                { name: 'María G.', points: 2300 },
                { name: 'Juan P.', points: 2100 },
                { name: 'Sofia R.', points: 1950 },
                { name: 'Antonio L.', points: 1850 }
            ],
            challenges: [
                { id: 1, title: '30 días sin azúcar', description: 'Desafío de eliminar azúcar refinada por 30 días', participants: 1250 },
                { id: 2, title: 'Reto de abdominales', description: 'Completa 100 abdominales diarios durante 21 días', participants: 890 },
                { id: 3, title: 'Caminata diaria', description: '10,000 pasos al día durante todo el mes', participants: 2100 }
            ]
        };
    },
    computed: {
        // Propiedad computada que procesa la ordenación de mayor a menor y extrae estrictamente el Top 5
        sortedTopMembers() {
            return [...this.topMembers]
                .sort((a, b) => b.points - a.points)
                .slice(0, 5);
        }
    },
    methods: {
        viewAllComments() { this.viewingAllComments = true; },
        openForum(forum) {
            this.activeForumId = forum.id;
            this.selectedForumData = forum;
        },
        openNewCommentModal() {
            this.newComment.user = '';
            this.newComment.text = '';
            this.isCommentModalOpen = true;
        },
        closeCommentModal() { this.isCommentModalOpen = false; },
        submitComment() {
            if (!this.newComment.user || !this.newComment.text) return;
            const createdComment = {
                id: this.allComments.length + 1,
                avatar: '💬',
                user: this.newComment.user,
                text: this.newComment.text,
                date: 'Hace un momento'
            };
            this.allComments.unshift(createdComment);
            if (this.recentComments.length >= 3) this.recentComments.pop();
            this.recentComments.unshift(createdComment);
            this.closeCommentModal();
        },
        
        // MÉTODOS DEL NUEVO SISTEMA DE RETOS
        openChallengeModal(challenge) {
            this.selectedChallengeData = challenge;
            this.challengeForm.user = '';
            this.challengeForm.email = '';
            this.isChallengeModalOpen = true;
        },
        closeChallengeModal() {
            this.isChallengeModalOpen = false;
            this.selectedChallengeData = null;
        },
        submitChallengeRegistration() {
            const username = this.challengeForm.user.trim();
            if (!username || !this.challengeForm.email) return;

            // 1. Incrementar el contador visual de participantes del reto específico
            if (this.selectedChallengeData) {
                this.selectedChallengeData.participants++;
            }

            // 2. Buscar si el miembro ya existe en el listado para acumular sus puntos
            const existingMember = this.topMembers.find(
                member => member.name.toLowerCase() === username.toLowerCase()
            );

            if (existingMember) {
                existingMember.points += 1000;
            } else {
                // Si es un usuario nuevo, lo registramos con sus primeros 1000 puntos
                this.topMembers.push({
                    name: username,
                    points: 1000
                });
            }

            // 3. Ejecutar flujos de salida requeridos
            this.closeChallengeModal();
            alert('¡Te has unido al desafío!');
        }
    }
};