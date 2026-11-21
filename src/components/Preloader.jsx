import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import { loadFrames } from '../lib/frames.js';

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

        // Intro reveal of the brand + counter.
        gsap.timeline({ defaults: { ease: 'power2.out' } })
            .fromTo('.loader-brand', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8 })
            .fromTo('.loader-digits', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8 }, '<0.1');

        // Drive the counter from real hero-frame loading progress.
        const { ready: framesReady } = loadFrames((progress) => {
            gsap.to(count, {
                value: Math.max(count.value, progress * 100),
                duration: 0.5,
                ease: 'power1.out',
                onUpdate: render,
                overwrite: true,
            });
        });

        const ready = Promise.all([
            document.fonts ? document.fonts.ready : Promise.resolve(),
            framesReady,
            new Promise((res) => {
                if (document.readyState === 'complete') return res();
                window.addEventListener('load', res, { once: true });
            }),
        ]);
        // Minimum on-screen time so the count is always seen; safety so it never hangs.
        const minShow = new Promise((res) => setTimeout(res, 2000));
        const safety = new Promise((res) => setTimeout(res, 8000));

        Promise.race([Promise.all([ready, minShow]), safety]).then(() => {
            gsap.killTweensOf(count);
            gsap.timeline({ onComplete, defaults: { ease: 'power4.inOut' } })
                .to(count, { value: 100, duration: 0.4, ease: 'none', onUpdate: render })
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
