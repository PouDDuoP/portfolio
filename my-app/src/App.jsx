import { lazy, Suspense, useEffect } from 'react';
import Layout from './components/layout/Layout';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import ReactGA from 'react-ga4';
import { Analytics } from '@vercel/analytics/react';

// Lazy-load heavy sections
const Skills = lazy(() => import('./components/sections/Skills'));
const Projects = lazy(() => import('./components/sections/Projects'));
const Experience = lazy(() => import('./components/sections/Experience'));
const Education = lazy(() => import('./components/sections/Education'));
const FAQ = lazy(() => import('./components/sections/FAQ'));
const Contact = lazy(() => import('./components/sections/Contact'));

// Loading fallback for lazy components
const SectionLoader = () => (
  <div style={{ 
    minHeight: '200px', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    color: 'var(--color-text-secondary)'
  }}>
    Loading…
  </div>
);

function App() {
  useEffect(() => {
    // Envía el reporte de la página actual a Google Analytics (solo en producción)
    if (import.meta.env.VITE_GA_ID) {
      ReactGA.send({ hitType: "pageview", page: window.location.pathname });
    }
  }, []);

  return (
    <Layout>
      <Hero />
      <About />
      <Suspense fallback={<SectionLoader />}>
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <FAQ />
        <Contact />
      </Suspense>
      <Analytics />
    </Layout>
  );
}

export default App;