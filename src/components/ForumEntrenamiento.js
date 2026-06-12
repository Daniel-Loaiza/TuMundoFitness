/* Forum Page Component - Rutinas de Entrenamiento */
export default {
    template: `
        <section id="forum-page" class="py-16 bg-slate-50 min-h-screen">
            <div class="container">
                <div class="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-10">
                    <div>
                        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-700 mb-2">Foro de discusión</p>
                        <h1 class="text-4xl font-semibold text-slate-900">Rutinas de Entrenamiento</h1>
                        <p class="mt-3 text-slate-600 max-w-2xl">
                            Comparte y pide feedback sobre tus rutinas, optimiza tus distribuciones musculares y mejora tu técnica.
                        </p>
                    </div>
                    <button
                        class="inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                        @click="addPost"
                    >
                        Agregar post
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
                                placeholder="Buscar en Rutinas de Entrenamiento..."
                                class="w-full rounded-3xl border border-slate-200 bg-white px-5 py-4 text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
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
                                        <h2 class="text-2xl font-semibold text-slate-900">{{ post.title }}</h2>
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
                                        class="inline-flex items-center justify-center rounded-full border border-indigo-600 px-5 py-2 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50"
                                    >
                                        Responder
                                    </button>
                                    <button
                                        type="button"
                                        @click="toggleResponses(post.id)"
                                        class="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-2 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-200"
                                    >
                                        Comments <span class="rounded-full bg-indigo-600 px-2 py-1 text-xs text-white">{{ post.comments }}</span>
                                    </button>
                                </div>

                                <div v-if="post.showResponses" class="mt-6 space-y-3 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                                    <h3 class="text-sm font-semibold text-slate-900">Respuestas</h3>
                                    <div v-if="post.responses.length === 0" class="text-sm text-slate-600">
                                        No hay respuestas todavía.
                                    </div>
                                    <div v-for="(response, index) in post.responses" :key="index" class="rounded-3xl bg-white p-4 border border-slate-200">
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
                            <h3 class="text-xl font-semibold text-slate-900 mb-4">Etiquetas destacadas</h3>
                            <div class="flex flex-wrap gap-3">
                                <span class="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm text-slate-700">Hipertrofia</span>
                                <span class="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm text-slate-700">Fuerza</span>
                                <span class="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm text-slate-700">Push/Pull/Legs</span>
                                <span class="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm text-slate-700">Calistenia</span>
                            </div>
                        </div>

                        <div>
                            <h3 class="text-xl font-semibold text-slate-900 mb-4">Usa este foro</h3>
                            <p class="text-slate-600 text-sm leading-6">
                                Detalla tus series, repeticiones y descansos si pides feedback para recibir las mejores críticas constructivas de la comunidad.
                            </p>
                        </div>
                    </aside>
                </div>
            </div>

            <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-8">
                <div class="w-full max-w-2xl rounded-[32px] bg-white p-8 shadow-2xl">
                    <div class="mb-6 flex items-center justify-between">
                        <div>
                            <h2 class="text-3xl font-semibold text-slate-900">Nuevo post</h2>
                            <p class="text-slate-600">Completa el formulario para publicar en el foro de entrenamiento.</p>
                        </div>
                        <button class="text-slate-400 transition hover:text-slate-700" @click="closeModal" aria-label="Cerrar modal">✕</button>
                    </div>

                    <form @submit.prevent="submitPost" class="space-y-5">
                        <div>
                            <label for="new-post-title" class="block text-sm font-semibold text-slate-700 mb-2">Título</label>
                            <input
                                id="new-post-title"
                                type="text"
                                v-model="newPostTitle"
                                class="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                placeholder="Ej: Mi rutina de Empuje/Tracción/Pierna de 4 días"
                            >
                        </div>
                        <div>
                            <label for="new-post-content" class="block text-sm font-semibold text-slate-700 mb-2">Post</label>
                            <textarea
                                id="new-post-content"
                                v-model="newPostContent"
                                rows="6"
                                class="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                placeholder="Escribe aquí los ejercicios, series y dudas sobre tu rutina..."
                            ></textarea>
                        </div>
                        <div class="flex flex-col gap-3 sm:flex-row sm:justify-end">
                            <button type="button" @click="closeModal" class="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">Cancelar</button>
                            <button type="submit" class="inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">Enviar</button>
                        </div>
                    </form>
                </div>
            </div>

            <div v-if="showReplyModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-8">
                <div class="w-full max-w-2xl rounded-[32px] bg-white p-8 shadow-2xl">
                    <div class="mb-6 flex items-center justify-between">
                        <p class="text-slate-600">Escribe tu respuesta</p>
                        <button class="text-slate-400 transition hover:text-slate-700" @click="closeReplyModal" aria-label="Cerrar modal">✕</button>
                    </div>

                    <form @submit.prevent="submitReply" class="space-y-5">
                        <div>
                            <textarea
                                id="reply-content"
                                v-model="replyText"
                                rows="6"
                                class="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                placeholder="Aporta tus sugerencias o ajustes constructivos..."
                            ></textarea>
                        </div>
                        <div class="flex flex-col gap-3 sm:flex-row sm:justify-end">
                            <button type="button" @click="closeReplyModal" class="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">Cancelar</button>
                            <button type="submit" class="inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">Enviar</button>
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
                    title: '¿Mucho volumen para un día de pierna enfocada en cuádriceps?',
                    description: 'Revisión de volumen semanal y orden de selección de ejercicios',
                    content: 'Tengo sentadilla libre, prensa inclinada y extensiones en el mismo bloque. ¿Consideran que es sobrecargar el sistema nervioso si busco hipertrofia?',
                    createdAt: '2026-06-09T14:30:00.000Z',
                    comments: 4,
                    responses: [],
                    showResponses: false
                },
                {
                    id: 2,
                    title: 'Rutina híbrida de Fuerza-Hipertrofia (5/3/1 Adaptada)',
                    description: 'Esquema de progresión de cargas compartida para intermedios',
                    content: 'He estructurado una rutina combinando ejercicios básicos pesados al inicio y accesorios metabólicos al final. Dejo los porcentajes adjuntos para que me den feedback.',
                    createdAt: '2026-06-08T11:15:00.000Z',
                    comments: 7,
                    responses: [],
                    showResponses: false
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