/* Hero Section Component - Main Banner */
export default {
    template: `
        <section id="home" class="bg-gradient-to-b from-gray-50 to-white py-16">
            <div class="container">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <!-- Hero Content -->
                    <article class="hero__content">
                        <h2 class="text-4xl font-bold text-blue-900 mb-4">
                            Transforma tu cuerpo y tu vida
                        </h2>
                        <p class="text-lg text-gray-600 mb-6">
                            Accede a entrenamientos personalizados, planes de nutrición y una comunidad 
                            de apoyo que te motivará cada día.
                        </p>
                        <div class="flex gap-4">
                            <button class="btn-primary bg-green-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-600">
                                Comenzar Ahora
                            </button>
                            <button class="btn-secondary bg-gray-200 text-gray-900 px-8 py-3 rounded-lg font-bold hover:bg-gray-300">
                                Ver Demo
                            </button>
                        </div>
                    </article>
                    
                    <!-- Hero Image/Video -->
                    <figure class="hero__media">
                        <img 
                            src="https://images.pexels.com/photos/6392825/pexels-photo-6392825.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                            alt="Entrenamiento de fitness en el gym"
                            class="rounded-lg shadow-lg"
                        >
                        <figcaption class="sr-only">Imagen del hero mostrando un entrenamiento</figcaption>
                    </figure>
                </div>
            </div>
        </section>
    `
};
