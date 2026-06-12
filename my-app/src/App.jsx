import { lazy, Suspense, useEffect } from 'react';
import Layout from './components/layout/Layout';
import Hero from './components/sections/Hero';
import { Analytics } from '@vercel/analytics/react';

// Lazy-load sections below the fold
const About = lazy(() => import('./components/sections/About'));
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
    // Envía pageview a GA4 vía gtag (solo si está configurado)
    if (import.meta.env.VITE_GA_ID && typeof window.gtag === 'function') {
      window.gtag('config', import.meta.env.VITE_GA_ID, { page_path: window.location.pathname });
    }
  }, []);

  return (
    <Layout>
      <Hero />
      <Suspense fallback={<SectionLoader />}>
        <About />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Skills />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Projects />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Experience />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Education />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <FAQ />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Contact />
      </Suspense>
      <Analytics />
    </Layout>
  );
}

export default App;