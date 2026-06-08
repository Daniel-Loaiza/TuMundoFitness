/* Contact Page Component */
export default {
    template: `
        <section id="contact-page" class="py-12 bg-slate-50">
            <div class="container">
                <div class="text-center mb-10">
                    <p class="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700 mb-2">Contactos</p>
                    <h1 class="text-4xl font-semibold text-slate-900">Contáctanos</h1>
                    <p class="mt-3 text-slate-600 max-w-2xl mx-auto">
                        Ven a tomar un café con nosotros o deja tu mensaje y te responderemos pronto.
                    </p>
                </div>

                <div class="grid gap-8 lg:grid-cols-2">
                    <div class="overflow-hidden rounded-[32px] shadow-xl">
                        <img
                            src="https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1200&q=80"
                            alt="Mapa de ubicación"
                            class="w-full h-full min-h-[420px] object-cover"
                        >
                    </div>

                    <div class="bg-white rounded-[32px] shadow-xl p-8">
                        <form action="#" class="space-y-6">
                            <div>
                                <label for="fname" class="block text-sm font-medium text-slate-700">Nombre</label>
                                <input
                                    type="text"
                                    id="fname"
                                    name="firstname"
                                    placeholder="Tu nombre.."
                                    class="mt-2 block w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                                >
                            </div>

                            <div>
                                <label for="lname" class="block text-sm font-medium text-slate-700">Apellido</label>
                                <input
                                    type="text"
                                    id="lname"
                                    name="lastname"
                                    placeholder="Tu apellido.."
                                    class="mt-2 block w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                                >
                            </div>

                            <div>
                                <label for="country" class="block text-sm font-medium text-slate-700">País</label>
                                <select
                                    id="country"
                                    name="country"
                                    class="mt-2 block w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                                >
                                    <option value="colombia">Colombia</option>
                                    <option value="mexico">México</option>
                                    <option value="usa">USA</option>
                                    <option value="spain">España</option>
                                </select>
                            </div>

                            <div>
                                <label for="subject" class="block text-sm font-medium text-slate-700">Mensaje</label>
                                <textarea
                                    id="subject"
                                    name="subject"
                                    placeholder="Escribe tu mensaje.."
                                    rows="7"
                                    class="mt-2 block w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                class="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                            >
                                Enviar mensaje
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    `
};
