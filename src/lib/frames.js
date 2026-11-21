// Hero scroll-scrub frame sequence (extracted from the video with ffmpeg).
// Served from /public/frames at the site root.
export const FRAME_COUNT = 103;

// n is 1-based to match the file names: frame_0001.webp ... frame_0103.webp
export const framePath = (n) => `/frames/frame_${String(n).padStart(4, '0')}.webp`;

// Load every frame once, shared across the app (preloader + hero) so the
// browser decodes each image a single time. Any caller can pass onProgress
// to receive 0..1 updates and all callers share the same Image objects.
let _images = null;
let _promises = null;
let _loaded = 0;

export function loadFrames(onProgress) {
    if (!_images) {
        _images = [];
        _promises = [];
        _loaded = 0;
        for (let n = 1; n <= FRAME_COUNT; n++) {
            const img = new Image();
            const p = new Promise((resolve) => {
                const done = () => {
                    _loaded += 1;
                    resolve();
                };
                img.onload = done;
                img.onerror = done; // never hang on a missing frame
            });
            img.src = framePath(n);
            _images.push(img);
            _promises.push(p);
        }
    }

    if (onProgress) {
        onProgress(_loaded / FRAME_COUNT); // report current state immediately
        _promises.forEach((p) => p.then(() => onProgress(_loaded / FRAME_COUNT)));
    }

    return { images: _images, ready: Promise.all(_promises) };
}
