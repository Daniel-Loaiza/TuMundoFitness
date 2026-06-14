/* ==============================================
   Tu Mundo Fitness - Vue App (SDD Methodology)
   ============================================== */

const { createApp } = Vue;

// Import components
import Header from './components/Header.js';
import HeroSection from './components/HeroSection.js';
import FitnessNews from './components/FitnessNews.js';
import FitnessGames from './components/FitnessGames.js';
import FitnessPodcast from './components/FitnessPodcast.js';
import GuidePage from './components/GuidePage.js'; // Tu componente auto-contenido de guías
import InteractiveTraining from './components/InteractiveTraining.js';
import Community from './components/Community.js';
import AboutPage from './components/AboutPage.js';
import ContactPage from './components/ContactPage.js';
import ForumPage from './components/ForumPage.js';
import Footer from './components/Footer.js';

// Main Vue Application
const app = createApp({
    template: `
        <div class="tu-mundo-fitness">
            <a href="#main-content" class="skip-to-main">Saltar al contenido principal</a>
            <Header @navigate="navigateTo" />
            <main id="main-content">
                <template v-if="currentPage === 'home'">
                    <HeroSection />
                    <FitnessNews />
                    <FitnessGames />                    
                    <FitnessPodcast />                    
                    <GuidePage />  <InteractiveTraining />
                    <Community />
                </template>
                <AboutPage v-else-if="currentPage === 'about'" />
                <ContactPage v-else-if="currentPage === 'contact'" />
                <ForumPage v-else-if="currentPage === 'forum'" />
            </main>
            <Footer />
        </div>
    `,
    data() {
        return {
            currentPage: 'home'
        };
    },
    mounted() {
        this.syncPageWithHash();
        window.addEventListener('hashchange', this.syncPageWithHash);
    },
    beforeUnmount() {
        window.removeEventListener('hashchange', this.syncPageWithHash);
    },
    methods: {
        navigateTo(page) {
            this.currentPage = page;
        },
        syncPageWithHash() {
            const hash = window.location.hash;

            if (hash === '#about') {
                this.currentPage = 'about';
            } else if (hash === '#contact') {
                this.currentPage = 'contact';
            } else if (hash === '#forum') {
                this.currentPage = 'forum';
            } else {
                this.currentPage = 'home';
            }
        }
    }
});

// Register global components
app.component('Header', Header);
app.component('HeroSection', HeroSection);
app.component('FitnessNews', FitnessNews);
app.component('FitnessGames', FitnessGames);
app.component('FitnessPodcast', FitnessPodcast);
app.component('GuidePage', GuidePage);
app.component('InteractiveTraining', InteractiveTraining);
app.component('Community', Community);
app.component('AboutPage', AboutPage);
app.component('ContactPage', ContactPage);
app.component('ForumPage', ForumPage);
app.component('Footer', Footer);

// Mount app
app.mount('#app');