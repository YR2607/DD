import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

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

        if (heroSection) {
            const mainTl = gsap.timeline({
                scrollTrigger: {
                    trigger: heroSection,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 0.6,
                    onEnter: () => {
                        const activeSlide = document.querySelector('.hero-slide.active');
                        if (activeSlide && activeSlide.dataset.id) {
                            const activeId = activeSlide.dataset.id;
                            document.querySelectorAll('.work-card').forEach(card => {
                                if (card.dataset.id === activeId) {
                                    card.style.display = 'none';
                                } else {
                                    card.style.display = 'block';
                                }
                            });
                            // Optional: refresh triggers slightly after layout reflow
                            setTimeout(() => ScrollTrigger.refresh(), 50);
                        }
                    },
                    onLeaveBack: () => {
                        document.querySelectorAll('.work-card').forEach(card => {
                            card.style.display = 'block';
                        });
                        setTimeout(() => ScrollTrigger.refresh(), 50);
                    },
                    onUpdate: (self) => {
                        if (self.progress > 0.02) {
                            if (slider?.isActive?.()) slider.pause()
                        } else {
                            if (!slider?.isActive?.() && !document.body.classList.contains('menu-open')) slider?.resume()
                        }
                    }
                }
            })

            mainTl.to([heroSection, '.hero-pin-wrapper'], {
                backgroundColor: 'transparent',
                duration: 1
            }, 0)

            // Animate hero section height on mobile (from 100vh to 60vh)
            if (isMobile) {
                mainTl.to(heroSection, {
                    height: '60vh',
                    duration: 1,
                    ease: 'none'
                }, 0)
            }

            if (heroSlider) {
                mainTl.to(heroSlider, {
                    width: isMobile ? '100.2%' : '86%',
                    left: isMobile ? '0%' : '7%',
                    height: isMobile ? '50vh' : '70vh',
                    y: isMobile ? '0vh' : '8vh',
                    borderRadius: isMobile ? '0px' : '2px',
                    duration: 1
                }, 0)
            }

            if (heroLogo) {
                mainTl.to(heroLogo, {
                    bottom: isMobile ? '40px' : '60px',
                    left: isMobile ? '25px' : '40px',
                    duration: 1
                }, 0)

                const logoSpan = heroLogo.querySelector('span')
                if (logoSpan) {
                    mainTl.to(logoSpan, {
                        fontSize: isMobile ? 'clamp(0.75rem, 4.25vw, 1.1rem)' : 'clamp(1.25rem, 4vw, 4.75rem)',
                        fontWeight: '900',
                        color: '#000000',
                        opacity: isMobile ? 0 : 1,
                        duration: 1
                    }, 0)
                }
            }

            if (heroInfoBar) mainTl.to(heroInfoBar, { opacity: 0, duration: 0.3 }, isMobile ? 0.1 : 0.2)
            if (projectDetails) mainTl.to(projectDetails, { opacity: 1, y: 0, duration: 0.8 }, isMobile ? 0.1 : 0.4)

            const overlayTexts = document.querySelectorAll('.slide-overlay-text')
            if (overlayTexts.length > 0) mainTl.to(overlayTexts, { opacity: 1, duration: 0.5 }, 0.3)
        }
    })

    // GLOBAL HEADER BEHAVIOR
    // isInnerPage = any page except Home (About, Company, Works, etc.)
    const isInnerPage = !document.getElementById('hero-section')

    ScrollTrigger.create({
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
            const isScrollingDown = self.direction === 1
            const scrollY = window.scrollY
            const isAtTop = scrollY < 50

            const burgerLines = burgerBtn.querySelectorAll('.line')
            const headerCenter = header.querySelector('.header-center')
            const headerRight = header.querySelector('.header-right')
            const navLinks = header.querySelectorAll('.desktop-nav a, .btn-contact')

            // CONSOLIDATED HEADER BEHAVIOR (Hide on scroll down, show on scroll up)
            if (isAtTop) {
                // State at TOP: Transparent background
                gsap.to(header, { backgroundColor: 'transparent', backdropFilter: 'blur(0px)', duration: 0.4, overwrite: true })

                // Color depends on page type (Home = White text, Inner = Black text)
                const textColor = isInnerPage ? '#000000' : '#ffffff'
                gsap.to(navLinks, { color: textColor, duration: 0.1 })
                if (!navOverlay.classList.contains('active')) {
                    gsap.to(burgerLines, { background: textColor, duration: 0.1 })
                }

                // Ensure visibility
                if (headerCenter) gsap.to(headerCenter, { opacity: 1, visibility: 'visible', y: 0, duration: 0.4, overwrite: true })
                if (headerRight) gsap.to(headerRight, { opacity: 1, visibility: 'visible', y: 0, duration: 0.4, overwrite: true })
            } else if (isScrollingDown) {
                // State SCROLLING DOWN: Hide everything except burger
                gsap.to(header, { backgroundColor: 'transparent', backdropFilter: 'blur(0px)', duration: 0.4, overwrite: true })
                if (headerCenter) gsap.to(headerCenter, { opacity: 0, visibility: 'hidden', y: -20, duration: 0.4, overwrite: true })
                if (headerRight) gsap.to(headerRight, { opacity: 0, visibility: 'hidden', y: -20, duration: 0.4, overwrite: true })

                // Burger is always visible but turns dark if not at top
                gsap.to(burgerLines, { background: '#000000', duration: 0.1 })
            } else {
                // State SCROLLING UP: Show white header with black text
                gsap.to(header, { backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(12px)', duration: 0.4, overwrite: true })
                if (headerCenter) gsap.to(headerCenter, { opacity: 1, visibility: 'visible', y: 0, duration: 0.4, overwrite: true })
                if (headerRight) gsap.to(headerRight, { opacity: 1, visibility: 'visible', y: 0, duration: 0.4, overwrite: true })

                gsap.to(navLinks, { color: '#000000', duration: 0.1 })
                gsap.to(burgerLines, { background: '#000000', duration: 0.1 })
            }
        }
    })

    const revealElements = document.querySelectorAll('.works-grid, .work-card')
    revealElements.forEach((el) => {
        gsap.fromTo(el,
            { y: 50, scale: 0.98 },
            {
                y: 0, scale: 1, duration: 1.0, ease: 'expo.out',
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

    const isMobileDevice = window.innerWidth <= 768

    // HELPER: Improved Split Text function (handles <br>) - DESKTOP ONLY
    const splitText = (selector) => {
        if (isMobileDevice) return; // Skip on mobile for performance
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

    // Prepare titles for split animation (desktop only)
    splitText('.about-title, .portal-title');

    // 1. HEADER ANIMATIONS
    const aboutRows = document.querySelectorAll('.about-row')
    aboutRows.forEach((row, index) => {
        const imageMask = row.querySelector('.about-image-mask')
        const aboutImg = row.querySelector('.about-img')
        const aboutTitle = row.querySelector('.about-title')
        const aboutText = row.querySelector('.about-text-content')
        const aboutNumber = row.querySelector('.about-number')

        if (isMobileDevice) {
            // MOBILE: Simple fade-in without heavy scrub/blur/splitText
            gsap.from([imageMask, aboutImg, aboutNumber, aboutTitle, aboutText].filter(Boolean), {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: row,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                }
            })
        } else {
            // DESKTOP: Full cinematic animations
            // Cinematic Image Reveal
            gsap.to(imageMask, {
                clipPath: 'inset(0 0% 0 0)',
                duration: 1.8,
                ease: 'power3.inOut',
                scrollTrigger: {
                    trigger: row,
                    start: 'top 90%',
                    end: 'top 40%',
                    scrub: 0.4
                }
            })

            // Image Parallax Zoom
            gsap.to(aboutImg, {
                scale: 1,
                scrollTrigger: {
                    trigger: row,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 0.5
                }
            })

            // Content Stagger Reveal
            gsap.from([aboutNumber, aboutText], {
                y: 25,
                opacity: 0,
                filter: 'blur(6px)',
                duration: 1.0,
                stagger: 0.08,
                ease: 'expo.out',
                scrollTrigger: {
                    trigger: row,
                    start: 'top 95%',
                    toggleActions: 'play none none none'
                }
            })

            // Split Text Animation for About Title
            const titleChars = aboutTitle.querySelectorAll('.char')
            if (titleChars.length) {
                gsap.from(titleChars, {
                    opacity: 0,
                    y: 15,
                    filter: 'blur(4px)',
                    stagger: 0.012,
                    duration: 0.8,
                    ease: 'expo.out',
                    scrollTrigger: {
                        trigger: row,
                        start: 'top 92%',
                        toggleActions: 'play none none none'
                    }
                })
            }
        }
    })

    // Contact portal animations (shared across pages)
    initPortalAnimations()

    // =============================================
    // ABOUT PAGE SPECIFIC ANIMATIONS
    // =============================================
    if (document.body.classList.contains('about-page')) {
        // 1. Hero Entrance
        const heroTl = gsap.timeline({ delay: 0.5 })

        // Initial state set in CSS (reveal-hero has opacity 0, y 30)
        heroTl.to('.reveal-hero', {
            opacity: 1,
            y: 0,
            duration: 1.5,
            stagger: 0.2,
            ease: 'expo.out'
        })

        // Specific animation for the main logo if needed
        const mainLogo = document.querySelector('.hero-main-logo span')
        if (mainLogo) {
            gsap.from(mainLogo, {
                scale: 1.1,
                letterSpacing: '0.1em',
                duration: 2,
                ease: 'power4.out',
                delay: 0.6
            })
        }

        // 1b. Sticky Logo Pinning (only logo stays)
        ScrollTrigger.create({
            trigger: '.about-hero',
            start: 'top top',
            endTrigger: '.about-spread',
            end: 'bottom top',
            pin: '.about-hero-center',
            pinSpacing: false,
            scrub: true
        })

        // 1c. Fade out elements as they scroll away (optional but looks better)
        gsap.to('.about-hero-top-left, .about-hero-bottom-right, .scroll-hint', {
            opacity: 0,
            y: -100,
            scrollTrigger: {
                trigger: '.about-hero',
                start: '20% top',
                end: '80% top',
                scrub: true
            }
        })

        // 2. Horizontal Image Spread
        const spreadSection = document.querySelector('.about-spread')
        const spreadTrack = document.querySelector('.about-spread-track')

        if (spreadSection && spreadTrack) {
            const isMobileDevice = window.innerWidth <= 768
            const scrollWidth = spreadTrack.offsetWidth - window.innerWidth + (window.innerWidth * 0.1)
            const endDistance = isMobileDevice ? scrollWidth * 0.5 : scrollWidth

            gsap.to(spreadTrack, {
                x: () => -scrollWidth,
                ease: 'none',
                scrollTrigger: {
                    trigger: spreadSection,
                    start: isMobileDevice ? 'top 10%' : 'top top',
                    end: () => `+=${endDistance}`,
                    pin: true,
                    scrub: isMobileDevice ? 0.5 : 1,
                    anticipatePin: 1,
                    invalidateOnRefresh: true
                }
            })
        }

        // 3. Concept Section Reveals
        const conceptElements = document.querySelectorAll('.concept-lead, .concept-content')
        conceptElements.forEach(el => {
            gsap.fromTo(el,
                { y: 50, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1.5, ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 90%',
                        toggleActions: 'play none none none'
                    }
                }
            )
        })

        // 4. Style Section (Split Title) Animations
        const styleSection = document.querySelector('.about-style')
        if (styleSection) {
            const counterTrack = styleSection.querySelector('.style-counter-track')
            const styleItems = styleSection.querySelectorAll('.style-item')
            const sectionTitle = styleSection.querySelector('.style-section-title')

            // Reveal section title
            gsap.fromTo(sectionTitle,
                { y: 30, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
                    scrollTrigger: {
                        trigger: styleSection,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                }
            )

            // Each style item: reveal + counter update
            styleItems.forEach((item, index) => {
                // Fade in each item
                gsap.fromTo(item,
                    { y: 40, opacity: 0 },
                    {
                        y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 85%',
                            toggleActions: 'play none none none'
                        }
                    }
                )

                // Update counter when item enters center of viewport
                if (counterTrack) {
                    ScrollTrigger.create({
                        trigger: item,
                        start: 'top 50%',
                        end: 'bottom 50%',
                        onEnter: () => {
                            const counterHeight = counterTrack.querySelector('span').offsetHeight
                            gsap.to(counterTrack, {
                                y: -index * counterHeight,
                                duration: 0.6,
                                ease: 'power3.out'
                            })
                        },
                        onEnterBack: () => {
                            const counterHeight = counterTrack.querySelector('span').offsetHeight
                            gsap.to(counterTrack, {
                                y: -index * counterHeight,
                                duration: 0.6,
                                ease: 'power3.out'
                            })
                        }
                    })
                }
            })
        }
    }
}

export function initPortalAnimations() {
    const mm = gsap.matchMedia()
    const portal = document.querySelector('.contact-portal')
    if (!portal) return

    const magneticBtn = portal.querySelector('.portal-magnetic-btn')
    if (!magneticBtn) return

    const btnText = magneticBtn.querySelector('.btn-text')
    const btnCircle = magneticBtn.querySelector('.btn-circle')

    const moveBtn = (e) => {
        const rect = magneticBtn.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const moveX = (e.clientX - centerX) * 0.4
        const moveY = (e.clientY - centerY) * 0.4

        gsap.to(magneticBtn, {
            x: moveX, y: moveY,
            duration: 0.6, ease: 'power2.out'
        })
        gsap.to([btnText, btnCircle], {
            x: moveX * 0.3, y: moveY * 0.3,
            duration: 0.6, ease: 'power2.out'
        })
    }

    const resetBtn = () => {
        gsap.to([magneticBtn, btnText, btnCircle], {
            x: 0, y: 0,
            duration: 0.8, ease: 'elastic.out(1, 0.3)'
        })
    }

    magneticBtn.addEventListener('mousemove', moveBtn)
    magneticBtn.addEventListener('mouseleave', resetBtn)

    const portalTitle = portal.querySelector('.portal-title')
    if (portalTitle) {
        const moveTitle = (e) => {
            const rect = portal.getBoundingClientRect()
            const centerX = rect.left + rect.width / 2
            const centerY = rect.top + rect.height / 2
            const moveX = (e.clientX - centerX) * 0.05
            const moveY = (e.clientY - centerY) * 0.05

            gsap.to(portalTitle, {
                x: moveX, y: moveY,
                duration: 1.2, ease: 'power2.out'
            })
        }

        const resetTitle = () => {
            gsap.to(portalTitle, {
                x: 0, y: 0,
                duration: 1.5, ease: 'elastic.out(1, 0.3)'
            })
        }

        portal.addEventListener('mousemove', moveTitle)
        portal.addEventListener('mouseleave', resetTitle)
    }

    mm.add("(max-width: 768px)", () => {
        magneticBtn.removeEventListener('mousemove', moveBtn)
        magneticBtn.removeEventListener('mouseleave', resetBtn)
        if (portalTitle) {
            portal.removeEventListener('mousemove', portal._moveTitle)
            portal.removeEventListener('mouseleave', portal._resetTitle)
        }
    })
}
