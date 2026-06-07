/* ==============================================
   Tu Mundo Fitness - Vue App (SDD Methodology)
   ============================================== */

const { createApp } = Vue;

// Import components
import Header from './components/Header.js';
import HeroSection from './components/HeroSection.js';
import FitnessNews from './components/FitnessNews.js';
import PracticalGuides from './components/PracticalGuides.js';
import InteractiveTraining from './components/InteractiveTraining.js';
import FitnessGames from './components/FitnessGames.js';
import FitnessPodcast from './components/FitnessPodcast.js';
import Community from './components/Community.js';
import Footer from './components/Footer.js';

// Main Vue Application
const app = createApp({
    template: `
        <div class="tu-mundo-fitness">
            <a href="#main-content" class="skip-to-main">Saltar al contenido principal</a>
            <Header />
            <main id="main-content">
                <HeroSection />
                <FitnessNews />
                <PracticalGuides />
                <InteractiveTraining />
                <FitnessGames />
                <FitnessPodcast />
                <Community />
            </main>
            <Footer />
        </div>
    `,
    data() {
        return {
            currentPage: 'home'
        };
    }
});

// Register global components
app.component('Header', Header);
app.component('HeroSection', HeroSection);
app.component('FitnessNews', FitnessNews);
app.component('PracticalGuides', PracticalGuides);
app.component('InteractiveTraining', InteractiveTraining);
app.component('FitnessGames', FitnessGames);
app.component('FitnessPodcast', FitnessPodcast);
app.component('Community', Community);
app.component('Footer', Footer);

// Mount app
app.mount('#app');
