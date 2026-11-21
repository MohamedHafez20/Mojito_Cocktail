import { ScrollTrigger, SplitText } from "gsap/all";
import gsap from "gsap";
import { useEffect, useState } from "react";
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

  // Lock scrolling while the preloader is up
  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  const handleLoaded = () => {
    setLoading(false);
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
