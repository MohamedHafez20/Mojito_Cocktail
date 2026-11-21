import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

const Preloader = ({ onComplete }) => {
    const rootRef = useRef();
    const countRef = useRef();

    useGSAP(() => {
        const count = { value: 0 };
        const render = () => {
            if (countRef.current) {
                countRef.current.textContent = String(Math.round(count.value)).padStart(2, '0');
            }
        };
        render();

        // Intro + counter run immediately and are self-contained (no asset timing),
        // so the loader always animates even on an instant cached load.
        gsap.timeline({ defaults: { ease: 'power2.out' } })
            .fromTo('.loader-brand', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8 })
            .fromTo('.loader-digits', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8 }, '<0.1')
            .to(count, { value: 100, duration: 2, ease: 'power1.inOut', onUpdate: render }, 0);

        // --- Wait for the real assets, but never hang and never flash ---
        const video = document.querySelector('video');
        const ready = Promise.all([
            document.fonts ? document.fonts.ready : Promise.resolve(),
            new Promise((res) => {
                if (!video || video.readyState >= 3) return res();
                video.addEventListener('canplaythrough', res, { once: true });
                video.addEventListener('loadeddata', res, { once: true });
                setTimeout(res, 6000); // per-asset safety net
            }),
            new Promise((res) => {
                if (document.readyState === 'complete') return res();
                window.addEventListener('load', res, { once: true });
            }),
        ]);
        // Minimum on-screen time so the 0→100 count is always seen.
        const minShow = new Promise((res) => setTimeout(res, 2300));

        Promise.all([ready, minShow]).then(() => {
            gsap.killTweensOf(count);
            gsap.timeline({ onComplete, defaults: { ease: 'power4.inOut' } })
                .to(count, { value: 100, duration: 0.3, ease: 'none', onUpdate: render })
                .to('.loader-digits', { yPercent: -120, opacity: 0, duration: 0.6, ease: 'power3.in' }, '+=0.1')
                .to('.loader-brand', { yPercent: -120, opacity: 0, duration: 0.6, ease: 'power3.in' }, '<')
                .to(rootRef.current, { yPercent: -100, duration: 1 }, '<0.2');
        });
    }, { scope: rootRef });

    return (
        <div className="preloader" ref={rootRef}>
            <h1 className="loader-brand">MOJITO</h1>
            <div className="loader-digits">
                <span className="loader-count" ref={countRef}>00</span>
                <span className="loader-pct">%</span>
            </div>
        </div>
    );
};

export default Preloader;
