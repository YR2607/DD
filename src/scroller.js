import Lenis from 'lenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Инициализация плавного скролла Lenis
 * @returns {Lenis} Экземпляр Lenis
 */
export function initScroller() {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
    })

    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    lenis.on('scroll', ScrollTrigger.update)

    return lenis
}
