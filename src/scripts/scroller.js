import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Lenis smooth scroll, synced with GSAP ticker
 * @returns {Lenis}
 */
export function initScroller() {
    const isMobile = window.innerWidth <= 768

    const lenis = new Lenis({
        duration: isMobile ? 0.8 : 1.0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        smoothTouch: false,
        lerp: isMobile ? 0.15 : 0.1,
        touchMultiplier: isMobile ? 2 : 1.5,
    })

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return lenis
}
