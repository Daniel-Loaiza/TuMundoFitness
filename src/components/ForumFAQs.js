/* Forum Page Component - Preguntas Frecuentes */
export default {
    template: `
        <section id="forum-page" class="py-16 bg-slate-50 min-h-screen">
            <div class="container">
                <div class="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-10">
                    <div>
                        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-700 mb-2">Consultas Técnicas</p>
                        <h1 class="text-4xl font-semibold text-slate-900">Preguntas Frecuentes</h1>
                        <p class="mt-3 text-slate-600 max-w-2xl">
                            Resuelve tus dudas científicas o metodológicas directamente. Consulta el historial verificado por nuestros expertos en fitness y nutrición.
                        </p>
                    </div>
                    <button
                        class="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                        @click="addPost"
                    >
                        Dejar una Pregunta
                    </button>
                </div>

                <div class="grid gap-8 lg:grid-cols-[1fr_320px]">
                    <div class="space-y-6">
                        <div class="relative">
                            <label for="forum-search" class="sr-only">Buscar posts</label>
                            <input
                                id="forum-search"
                                type="search"
                                v-model="searchQuery"
                                placeholder="Buscar en preguntas frecuentes..."
                                class="w-full rounded-3xl border border-slate-200 bg-white px-5 py-4 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                            >
                        </div>

                        <div class="space-y-6">
                            <article
                                v-for="post in filteredPosts"
                                :key="post.id"
                                class="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm"
                            >
                                <div class="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                    <div>
                                        <h2 class="text-2xl font-semibold text-slate-900">❓ {{ post.title }}</h2>
                                        <p class="mt-2 text-sm text-slate-500">{{ post.description }}</p>
                                    </div>
                                    <span class="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                                        {{ formatDateTag(post.createdAt) }}
                                    </span>
                                </div>
                                <p class="text-slate-600 mb-6">
                                    {{ post.content }}
                                </p>
                                <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <button
                                        @click="openReplyModal(post.id)"
                                        class="inline-flex items-center justify-center rounded-full border border-blue-600 px-5 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
                                    >
                                        Aportar a la duda
                                    </button>
                                    <button
                                        type="button"
                                        @click="toggleResponses(post.id)"
                                        class="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-200"
                                    >
                                        Respuestas de Expertos <span class="rounded-full bg-blue-600 px-2 py-1 text-xs text-white">{{ post.comments }}</span>
                                    </button>
                                </div>

                                <div v-if="post.showResponses" class="mt-6 space-y-3 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                                    <h3 class="text-sm font-semibold text-slate-900">Respuestas del Staff y Expertos</h3>
                                    <div v-if="post.responses.length === 0" class="text-sm text-slate-600">
                                        Pregunta en revisión. Nuestro coach asignado responderá pronto.
                                    </div>
                                    <div v-for="(response, index) in post.responses" :key="index" class="rounded-3xl bg-white p-4 border border-l-4 border-l-blue-500 border-slate-200">
                                        <div class="flex items-center gap-2 mb-2">
                                            <span class="text-xs bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">Staff Experto</span>
                                        </div>
                                        <p class="text-sm text-slate-700">{{ response.text }}</p>
                                        <p class="mt-2 text-xs text-slate-500">{{ formatDateTag(response.createdAt) }}</p>
                                    </div>
                                </div>
                            </article>

                            <div v-if="filteredPosts.length === 0" class="rounded-[28px] border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
                                No se encontraron publicaciones para "{{ searchQuery }}".
                            </div>
                        </div>
                    </div>

                    <aside class="space-y-6 rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
                        <div>
                            <h3 class="text-xl font-semibold text-slate-900 mb-4">Categorías Clínicas</h3>
                            <div class="flex flex-wrap gap-3">
                                <span class="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm text-slate-700">Lesiones</span>
                                <span class="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm text-slate-700">Ayuno Intermitente</span>
                                <span class="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm text-slate-700">Descanso/Sueño</span>
                                <span class="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm text-slate-700">Ciencia Aplicada</span>
                            </div>
                        </div>

                        <div>
                            <h3 class="text-xl font-semibold text-slate-900 mb-4">Aviso Legal</h3>
                            <p class="text-slate-500 text-xs leading-5">
                                La información aquí compartida es educativa y orientativa. Ninguna respuesta reemplaza la prescripción médica o el diagnóstico de un profesional de la salud individualizado.
                            </p>
                        </div>
                    </aside>
                </div>
            </div>

            <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-8">
                <div class="w-full max-w-2xl rounded-[32px] bg-white p-8 shadow-2xl">
                    <div class="mb-6 flex items-center justify-between">
                        <div>
                            <h2 class="text-3xl font-semibold text-slate-900">Hacer una pregunta</h2>
                            <p class="text-slate-600">Sé claro y conciso para que los expertos entiendan tu caso.</p>
                        </div>
                        <button class="text-slate-400 transition hover:text-slate-700" @click="closeModal" aria-label="Cerrar modal">✕</button>
                    </div>

                    <form @submit.prevent="submitPost" class="space-y-5">
                        <div>
                            <label for="new-post-title" class="block text-sm font-semibold text-slate-700 mb-2">Tu Duda Principal</label>
                            <input
                                id="new-post-title"
                                type="text"
                                v-model="newPostTitle"
                                class="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                placeholder="Ej: ¿Es malo hacer ejercicio cardiovascular en ayunas?"
                            >
                        </div>
                        <div>
                            <label for="new-post-content" class="block text-sm font-semibold text-slate-700 mb-2">Detalles contextuales</label>
                            <textarea
                                id="new-post-content"
                                v-model="newPostContent"
                                rows="6"
                                class="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                placeholder="Añade tu edad, objetivo o problemas médicos relevantes si los hay..."
                            ></textarea>
                        </div>
                        <div class="flex flex-col gap-3 sm:flex-row sm:justify-end">
                            <button type="button" @click="closeModal" class="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">Cancelar</button>
                            <button type="submit" class="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">Enviar Pregunta</button>
                        </div>
                    </form>
                </div>
            </div>

            <div v-if="showReplyModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-8">
                <div class="w-full max-w-2xl rounded-[32px] bg-white p-8 shadow-2xl">
                    <div class="mb-6 flex items-center justify-between">
                        <p class="text-slate-600">Añadir información a la duda</p>
                        <button class="text-slate-400 transition hover:text-slate-700" @click="closeReplyModal" aria-label="Cerrar modal">✕</button>
                    </div>

                    <form @submit.prevent="submitReply" class="space-y-5">
                        <div>
                            <textarea
                                id="reply-content"
                                v-model="replyText"
                                rows="6"
                                class="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                placeholder="Escribe tu observación o respuesta técnica..."
                            ></textarea>
                        </div>
                        <div class="flex flex-col gap-3 sm:flex-row sm:justify-end">
                            <button type="button" @click="closeReplyModal" class="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">Cancelar</button>
                            <button type="submit" class="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">Enviar Comentario</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    `,
    data() {
        return {
            searchQuery: '',
            showModal: false,
            showReplyModal: false,
            replyPostId: null,
            replyText: '',
            newPostTitle: '',
            newPostContent: '',
            posts: [
                {
                    id: 1,
                    title: '¿La ventana anabólica real es de solo 30 minutos post-entreno?',
                    description: 'Mito vs Realidad respaldado por la ciencia científica reciente',
                    content: 'He leído en varios artículos que si no consumo proteína inmediatamente al terminar de entrenar, pierdo las ganancias del gimnasio. ¿Qué tan estricto es?',
                    createdAt: '2026-06-08T16:00:00.000Z',
                    comments: 1,
                    responses: [
                        {
                            text: 'Totalmente un mito clásico del culturismo. La ventana anabólica existe pero es mucho más amplia (de 3 a 5 horas repartidas alrededor del entrenamiento). Lo verdaderamente crítico es alcanzar tu meta de macronutrientes totales al final del día.',
                            createdAt: '2026-06-08T18:20:00.000Z'
                        }
                    ],
                    showResponses: true
                }
            ]
        };
    },
    computed: {
        sortedPosts() {
            return this.posts.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        },
        filteredPosts() {
            const query = this.searchQuery.trim().toLowerCase();
            const posts = this.sortedPosts;
            if (!query) return posts;
            return posts.filter(post =>
                post.title.toLowerCase().includes(query) ||
                post.description.toLowerCase().includes(query) ||
                post.content.toLowerCase().includes(query)
            );
        }
    },
    methods: {
        addPost() { this.showModal = true; },
        closeModal() {
            this.showModal = false;
            this.newPostTitle = '';
            this.newPostContent = '';
        },
        openReplyModal(postId) {
            this.replyPostId = postId;
            this.replyText = '';
            this.showReplyModal = true;
        },
        closeReplyModal() {
            this.showReplyModal = false;
            this.replyPostId = null;
            this.replyText = '';
        },
        submitPost() {
            if (!this.newPostTitle.trim() || !this.newPostContent.trim()) {
                alert('Por favor completa el título y el contenido del post.');
                return;
            }
            const now = new Date();
            const newPost = {
                id: this.posts.length ? Math.max(...this.posts.map(post => post.id)) + 1 : 1,
                title: this.newPostTitle.trim(),
                description: this.newPostContent.trim().slice(0, 80) + '...',
                content: this.newPostContent.trim(),
                createdAt: now.toISOString(),
                comments: 0,
                responses: [],
                showResponses: false
            };
            this.posts.unshift(newPost);
            this.closeModal();
        },
        toggleResponses(postId) {
            const post = this.posts.find(item => item.id === postId);
            if (!post) return;
            post.showResponses = !post.showResponses;
        },
        submitReply() {
            if (!this.replyText.trim() || this.replyPostId === null) {
                alert('Por favor escribe una respuesta antes de enviar.');
                return;
            }
            const post = this.posts.find(item => item.id === this.replyPostId);
            if (!post) return;

            post.responses.push({
                text: this.replyText.trim(),
                createdAt: new Date().toISOString()
            });
            post.comments += 1;
            post.showResponses = true;
            this.closeReplyModal();
        },
        formatDateTag(createdAt) {
            const date = new Date(createdAt);
            const month = date.toLocaleString('en-US', { month: 'long' });
            const day = String(date.getDate()).padStart(2, '0');
            const year = String(date.getFullYear()).slice(-2);
            return `${month}-${day}-${year}`;
        }
    }
};