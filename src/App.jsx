import { ScrollTrigger, SplitText } from "gsap/all";
import gsap from "gsap";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Cocktails from "./components/Cocktails";
import About from "./components/About";
import Art from "./components/Art";
import Menu from "./components/Menu";
import Contact from "./components/Contact";
import Preloader from "./components/Preloader";
gsap.registerPlugin(ScrollTrigger, SplitText);

 const App = () => {
  const [loading, setLoading] = useState(true);
  const lenisRef = useRef(null);

  // Smooth scroll (Lenis) synced to GSAP's ticker + ScrollTrigger.
  useEffect(() => {
    const lenis = new Lenis();
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    lenis.stop(); // hold scroll until the preloader finishes

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Lock scrolling while the preloader is up
  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  const handleLoaded = () => {
    setLoading(false);
    lenisRef.current?.start();
    // Recalculate every ScrollTrigger against the final, fully-loaded layout
    requestAnimationFrame(() => ScrollTrigger.refresh());
  };

  return (
    <>
       {loading && <Preloader onComplete={handleLoaded} />}
       <main>
          <Navbar />
          <Hero />
          <Cocktails/>
          <About />
          <Art />
          <Menu />
          <Contact />
       </main>
    </>
  )
}

export default App
