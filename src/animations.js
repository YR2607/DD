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
            backgroundColor: 'transparent',
            duration: 1
        }, 0)

        // Animate hero section height on mobile (from 120vh to 65vh)
        if (isMobile) {
            mainTl.to(heroSection, {
                height: '65vh',
                duration: 1,
                ease: 'none'
            }, 0)
        }

        mainTl.to(heroSlider, {
            width: isMobile ? '100.2%' : '86%',
            left: isMobile ? '0%' : '7%',
            height: isMobile ? '55vh' : '70vh',
            y: isMobile ? '0vh' : '8vh',
            borderRadius: isMobile ? '0px' : '2px',
            duration: 1
        }, 0)

        mainTl.to(heroLogo, {
            bottom: isMobile ? '40px' : '60px',
            left: isMobile ? '25px' : '40px',
            duration: 1
        }, 0)

        mainTl.to(heroLogo.querySelector('span'), {
            fontSize: isMobile ? 'clamp(0.75rem, 4.25vw, 1.1rem)' : 'clamp(1.25rem, 4vw, 4.75rem)',
            fontWeight: '900',
            color: '#000000',
            opacity: isMobile ? 0 : 1,
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

            const burgerLines = burgerBtn.querySelectorAll('.line')

            const navLinks = header.querySelectorAll('.desktop-nav a, .btn-contact')

            if (isAtTop) {
                gsap.to(header, { backgroundColor: 'transparent', backdropFilter: 'blur(0px)', duration: 0.4, overwrite: true })
                gsap.to([desktopNav, contactBtn], { opacity: 1, visibility: 'visible', y: 0, duration: 0.4, overwrite: true })
                gsap.to(navLinks, { color: '#ffffff', duration: 0.1 })
                if (!navOverlay.classList.contains('active')) {
                    gsap.to(burgerLines, { background: '#ffffff', duration: 0.1 })
                }
            } else if (isScrollingDown) {
                gsap.to(header, { backgroundColor: 'transparent', backdropFilter: 'blur(0px)', duration: 0.4, overwrite: true })
                gsap.to([desktopNav, contactBtn], { opacity: 0, visibility: 'hidden', y: -20, duration: 0.4, overwrite: true })
                // Если мы скроллим вниз и ушли от Hero, гамбургер должен быть черным
                if (scrollY > window.innerHeight * 0.8) {
                    gsap.to(burgerLines, { background: '#000000', duration: 0.1 })
                }
            } else {
                gsap.to(header, { backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(12px)', duration: 0.4, overwrite: true })
                gsap.to([desktopNav, contactBtn], { opacity: 1, visibility: 'visible', y: 0, duration: 0.4, overwrite: true })
                gsap.to(navLinks, { color: '#000000', duration: 0.1 })
                gsap.to(burgerLines, { background: '#000000', duration: 0.1 })
            }
        }
    })

    const revealElements = document.querySelectorAll('.works-grid, .work-card')
    revealElements.forEach((el) => {
        gsap.fromTo(el,
            { y: 60, scale: 0.98 },
            {
                y: 0, scale: 1, duration: 1.5, ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 95%',
                    toggleActions: 'play none none none'
                }
            }
        )
    })

    // Hide logo before "View All" and Footer to prevent overlap
    if (heroLogo) {
        gsap.to(heroLogo, {
            opacity: 0,
            scrollTrigger: {
                trigger: '.view-all-container',
                start: 'top bottom',
                end: 'top 95%',
                scrub: true
            }
        })
    }

    // 0. SCROLL PROGRESS BAR
    gsap.to('.scroll-progress', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
            scrub: 0.3
        }
    })

    // HELPER: Improved Split Text function (handles <br>)
    const splitText = (selector) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            const html = el.innerHTML;
            const lines = html.split('<br>');

            el.innerHTML = lines.map(line => {
                const chars = line.split('').map(char =>
                    `<span class="char" style="display: inline-block;">${char === ' ' ? '&nbsp;' : char}</span>`
                ).join('');
                return `<span class="line" style="display: block; overflow: hidden;">${chars}</span>`;
            }).join('');
        });
    }

    // Prepare titles for split animation
    splitText('.about-title, .portal-title');

    // 1. HEADER ANIMATIONS
    const aboutRows = document.querySelectorAll('.about-row')
    aboutRows.forEach((row, index) => {
        const imageMask = row.querySelector('.about-image-mask')
        const aboutImg = row.querySelector('.about-img')
        const aboutTitle = row.querySelector('.about-title')
        const aboutText = row.querySelector('.about-text-content')
        const aboutNumber = row.querySelector('.about-number')

        // Cinematic Image Reveal
        gsap.to(imageMask, {
            clipPath: 'inset(0 0% 0 0)',
            duration: 2,
            ease: 'power4.inOut',
            scrollTrigger: {
                trigger: row,
                start: 'top 90%',
                end: 'top 40%',
                scrub: true
            }
        })

        // Image Parallax Zoom
        gsap.to(aboutImg, {
            scale: 1,
            scrollTrigger: {
                trigger: row,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        })

        // Content Stagger Reveal
        gsap.from([aboutNumber, aboutText], {
            y: 50,
            opacity: 0,
            filter: 'blur(15px)',
            duration: 1.5,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: row,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        })

        // Split Text Animation for About Title
        const titleChars = aboutTitle.querySelectorAll('.char')
        if (titleChars.length) {
            gsap.from(titleChars, {
                opacity: 0,
                y: 30,
                filter: 'blur(10px)',
                stagger: 0.02,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: row,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            })
        }
    })

    // CONTACT PORTAL & MAGNETIC EFFECT
    const portal = document.querySelector('.contact-portal')
    if (portal) {
        const magneticBtn = portal.querySelector('.portal-magnetic-btn')
        const btnText = magneticBtn.querySelector('.btn-text')
        const btnCircle = magneticBtn.querySelector('.btn-circle')

        // Magnetic effect logic
        const moveBtn = (e) => {
            const rect = magneticBtn.getBoundingClientRect()
            const centerX = rect.left + rect.width / 2
            const centerY = rect.top + rect.height / 2
            const moveX = (e.clientX - centerX) * 0.4
            const moveY = (e.clientY - centerY) * 0.4

            gsap.to(magneticBtn, {
                x: moveX,
                y: moveY,
                duration: 0.6,
                ease: 'power2.out'
            })

            gsap.to([btnText, btnCircle], {
                x: moveX * 0.3,
                y: moveY * 0.3,
                duration: 0.6,
                ease: 'power2.out'
            })
        }

        const resetBtn = () => {
            gsap.to([magneticBtn, btnText, btnCircle], {
                x: 0,
                y: 0,
                duration: 0.8,
                ease: 'elastic.out(1, 0.3)'
            })
        }

        magneticBtn.addEventListener('mousemove', moveBtn)
        magneticBtn.addEventListener('mouseleave', resetBtn)

        // MAGNETIC WAVES (Text Displacement)
        const portalTitle = portal.querySelector('.portal-title')
        const moveTitle = (e) => {
            const rect = portal.getBoundingClientRect()
            const centerX = rect.left + rect.width / 2
            const centerY = rect.top + rect.height / 2
            const moveX = (e.clientX - centerX) * 0.05
            const moveY = (e.clientY - centerY) * 0.05

            gsap.to(portalTitle, {
                x: moveX,
                y: moveY,
                duration: 1.2,
                ease: 'power2.out'
            })
        }

        const resetTitle = () => {
            gsap.to(portalTitle, {
                x: 0, y: 0,
                duration: 1.5,
                ease: 'elastic.out(1, 0.3)'
            })
        }

        portal.addEventListener('mousemove', moveTitle)
        portal.addEventListener('mouseleave', resetTitle)

        // 4. Split Text Animation for Portal Title
        gsap.from('.portal-title .char', {
            opacity: 0,
            y: 80,
            rotateX: -45,
            stagger: 0.02,
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: '.portal-title',
                start: 'top 85%'
            }
        })

        // MatchMedia for mobile (disable magnetic on touch)
        mm.add("(max-width: 768px)", () => {
            magneticBtn.removeEventListener('mousemove', moveBtn)
            magneticBtn.removeEventListener('mouseleave', resetBtn)
        })
    }
}
