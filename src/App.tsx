import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Featured from './components/Featured';
import Work from './components/Work';
import About from './components/About';
import Plans from './components/Plans';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-[#030014] min-h-screen text-white font-sans selection:bg-purple-500 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Featured />
        <Work />
        <About />
        <Plans />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
