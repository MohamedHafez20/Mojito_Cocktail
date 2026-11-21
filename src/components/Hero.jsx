import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText } from 'gsap/all'
import { useRef } from 'react'
import { useMediaQuery } from 'react-responsive'
import { FRAME_COUNT, loadFrames } from '../lib/frames.js'
 const Hero = () => {
    const canvasRef = useRef()
    const isMobile = useMediaQuery({ maxWidth: 767 })
    useGSAP(() => {
        const heroSplit = new SplitText(".title", { type: "chars, words" });
        const paragraphSplit = new SplitText(".subtitle", { type: "lines" });

        heroSplit.chars.forEach((char) => char.classList.add('text-gradient'));

        gsap.from(heroSplit.chars, {
            yPercent: 100,
            duration: 1.8,
            ease: 'expo.out',
            stagger: 0.05,
        });

        gsap.from(paragraphSplit.lines, {
            opacity: 0,
            yPercent: 100,
            duration: 1.8,
            ease: 'expo.out',
            stagger: 0.06,
            delay: 1,
    })
        gsap.timeline({
            scrollTrigger: {
                trigger: "#hero",
                start: "top top",
                end: "bottom top",
                scrub: true,
            }
        }).to('.right-leaf', {y: 200} , 0)
        .to('.left-leaf', {y: -200}, 0)

       // --- Canvas frame-sequence scrub (works on every device, iOS included) ---
       const canvas = canvasRef.current;
       const ctx = canvas.getContext('2d');
       const { images } = loadFrames();
       const state = { frame: 0 };
       // Desktop keeps the original letterboxed look; mobile fills the band.
       const fit = isMobile ? 'cover' : 'contain';

       const render = () => {
           const img = images[Math.round(state.frame)];
           if (!img || !img.complete || !img.naturalWidth) return;
           const cw = canvas.width;
           const ch = canvas.height;
           const iw = img.naturalWidth;
           const ih = img.naturalHeight;
           const scale = fit === 'cover'
               ? Math.max(cw / iw, ch / ih)
               : Math.min(cw / iw, ch / ih);
           const dw = iw * scale;
           const dh = ih * scale;
           const dx = (cw - dw) / 2;
           const dy = fit === 'cover' ? (ch - dh) / 2 : ch - dh; // anchor to bottom when letterboxed
           ctx.clearRect(0, 0, cw, ch);
           ctx.drawImage(img, dx, dy, dw, dh);
       };

       const sizeCanvas = () => {
           const rect = canvas.getBoundingClientRect();
           const dpr = Math.min(window.devicePixelRatio || 1, 2);
           canvas.width = Math.round(rect.width * dpr);
           canvas.height = Math.round(rect.height * dpr);
           render();
       };
       sizeCanvas();
       window.addEventListener('resize', sizeCanvas);
       // Draw the first frame as soon as it decodes (before all frames are ready).
       if (images[0]) images[0].decode?.().then(render).catch(() => {});

       const startValue = isMobile ? 'top 50%' : 'center 60%';
       const endValue = isMobile ? '120% top' : 'bottom top';

       gsap.timeline({
           scrollTrigger: {
               trigger: canvas,
               start: startValue,
               end: endValue,
               scrub: true,
               pin: true,
           },
       }).to(state, {
           frame: FRAME_COUNT - 1,
           snap: 'frame',
           ease: 'none',
           onUpdate: render,
       });

       return () => window.removeEventListener('resize', sizeCanvas);
}, [])
  return (
    <>
    <section id="hero" className="noisy">
        <h1 className="title">MOJITO</h1>

        <img
         src="/images/hero-left-leaf.png"
         alt="left-leaf"
         className="left-leaf"
        />
        <img
         src="/images/hero-right-leaf.png"
         alt="right-leaf"
         className="right-leaf"
        />
        <div className="body">
            <div className="content">
                <div className="space-y-5 hidden md:block">
                    <p>Cool. Crisp. Classic.</p>
                    <p className="subtitle">
                        Sip the Spirit <br /> of Summer
                    </p>
                </div>

                    <div className="view-cocktails">
                        <p className="subtitle">
                           Every cocktail on our menu is a blend of premium ingredients,
                            creative flair,
                             and timeless recipes — designed to delight your senses.
                        </p>
                        <a href="#cocktails">View Cocktails</a>
                    </div>

            </div>
        </div>
    </section>
    <div className="video absolute inset-0">
        <canvas
            ref={canvasRef}
            className="hero-canvas absolute bottom-0 left-0 w-full md:h-[80%] h-1/2"
        />
    </div>
    </>
  )
}
export default Hero
