import { lazy, Suspense } from 'react';
import Layout from './components/layout/Layout';
import Hero from './components/sections/Hero';
import About from './components/sections/About';

// Lazy-load heavy sections
const Skills = lazy(() => import('./components/sections/Skills'));
const Projects = lazy(() => import('./components/sections/Projects'));
const Experience = lazy(() => import('./components/sections/Experience'));
const Education = lazy(() => import('./components/sections/Education'));
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
  return (
    <Layout>
      <Hero />
      <About />
      <Suspense fallback={<SectionLoader />}>
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </Suspense>
    </Layout>
  );
}

export default App;