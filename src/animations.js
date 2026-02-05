import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Инициализация анимаций ScrollTrigger
 * @param {Object} slider - Управление слайдером (pause/resume)
 */
export function initScrollAnimations(slider) {
    const header = document.getElementById('header')
    const desktopNav = header.querySelector('.desktop-nav')
    const contactBtn = header.querySelector('.btn-contact')
    const heroLogo = document.getElementById('hero-logo')
    const heroSlider = document.getElementById('hero-slider')
    const heroSection = document.getElementById('hero-section')
    const heroInfoBar = document.querySelector('.hero-info-bar')
    const burgerBtn = document.getElementById('burger-btn')
    const navOverlay = document.getElementById('nav-overlay')
    const projectDetails = document.getElementById('project-details')

    const mm = gsap.matchMedia()

    mm.add({
        isDesktop: `(min-width: 769px)`,
        isMobile: `(max-width: 768px)`
    }, (context) => {
        const { isDesktop, isMobile } = context.conditions

        const mainTl = gsap.timeline({
            scrollTrigger: {
                trigger: heroSection,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1.2,
                onUpdate: (self) => {
                    if (self.progress > 0.02) {
                        if (slider.isActive?.()) slider.pause()
                    } else {
                        if (!slider.isActive?.() && !document.body.classList.contains('menu-open')) slider.resume()
                    }
                }
            }
        })

        mainTl.to([heroSection, '.hero-pin-wrapper'], {
            backgroundColor: '#ffffff',
            duration: 1
        }, 0)

        mainTl.to(heroSlider, {
            width: isMobile ? '100.2%' : '90%',
            left: isMobile ? '0%' : '5%',
            height: isMobile ? '55vh' : '70vh',
            y: isMobile ? '0vh' : '8vh',
            borderRadius: isMobile ? '0px' : '2px',
            duration: 1
        }, 0)

        mainTl.to(heroLogo, {
            bottom: isMobile ? '40px' : '60px',
            left: isMobile ? '25px' : '5%',
            duration: 1
        }, 0)

        mainTl.to(heroLogo.querySelector('span'), {
            fontSize: isMobile ? 'clamp(0.75rem, 4.25vw, 1.1rem)' : 'clamp(1.25rem, 4vw, 3.75rem)',
            fontWeight: '900',
            color: '#000000',
            duration: 1
        }, 0)

        if (heroInfoBar) mainTl.to(heroInfoBar, { opacity: 0, duration: 0.3 }, 0.2)
        if (projectDetails) mainTl.to(projectDetails, { opacity: 1, y: 0, duration: 0.8 }, 0.4)

        const overlayTexts = document.querySelectorAll('.slide-overlay-text')
        if (overlayTexts.length > 0) mainTl.to(overlayTexts, { opacity: 1, duration: 0.5 }, 0.3)
    })

    // GLOBAL HEADER BEHAVIOR
    ScrollTrigger.create({
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
            const isScrollingDown = self.direction === 1
            const scrollY = window.scrollY
            const isAtTop = scrollY < 50

            if (scrollY > window.innerHeight * 0.8) {
                burgerBtn.querySelectorAll('.line').forEach(line => line.style.background = '#000')
            } else {
                if (!navOverlay.classList.contains('active')) {
                    burgerBtn.querySelectorAll('.line').forEach(line => line.style.background = '#fff')
                }
            }

            const navLinks = header.querySelectorAll('.desktop-nav a, .btn-contact')

            if (isAtTop) {
                gsap.to(header, { backgroundColor: 'transparent', backdropFilter: 'blur(0px)', duration: 0.4, overwrite: true })
                gsap.to([desktopNav, contactBtn], { opacity: 1, visibility: 'visible', y: 0, duration: 0.4, overwrite: true })
                gsap.to(navLinks, { color: '#ffffff', duration: 0.1 })
            } else if (isScrollingDown) {
                gsap.to(header, { backgroundColor: 'transparent', backdropFilter: 'blur(0px)', duration: 0.4, overwrite: true })
                gsap.to([desktopNav, contactBtn], { opacity: 0, visibility: 'hidden', y: -20, duration: 0.4, overwrite: true })
            } else {
                gsap.to(header, { backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(12px)', duration: 0.4, overwrite: true })
                gsap.to([desktopNav, contactBtn], { opacity: 1, visibility: 'visible', y: 0, duration: 0.4, overwrite: true })
                gsap.to(navLinks, { color: '#000000', duration: 0.1 })
            }
        }
    })

    const revealElements = document.querySelectorAll('.works-grid, .work-card')
    revealElements.forEach((el) => {
        gsap.fromTo(el,
            { opacity: 0, y: 60, scale: 0.98 },
            {
                opacity: 1, y: 0, scale: 1, duration: 1.5, ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        )
    })
}
