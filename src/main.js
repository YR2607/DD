import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

document.addEventListener('DOMContentLoaded', () => {
  // =============================================
  // SMOOTH SCROLL (Lenis)
  // =============================================
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
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)

  // =============================================
  // PRELOADER
  // =============================================
  const preloader = document.getElementById('preloader')
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('fade-out')
      document.body.classList.remove('is-loading')
      initAnimations()
    }, 800)
  })

  // =============================================
  // NAVIGATION OVERLAY
  // =============================================
  const burgerBtn = document.getElementById('burger-btn')
  const navOverlay = document.getElementById('nav-overlay')
  const navLinks = document.querySelectorAll('.nav-links a')

  const toggleMenu = () => {
    burgerBtn.classList.toggle('active')
    navOverlay.classList.toggle('active')
    document.body.classList.toggle('menu-open')

    // Change burger color when menu is open
    if (navOverlay.classList.contains('active')) {
      lenis.stop()
      burgerBtn.querySelectorAll('.line').forEach(line => {
        line.style.background = '#000' // Dark on light menu background
      })
    } else {
      lenis.start()
      // Color depend on scroll state if not open
      const isScrolled = document.getElementById('header').classList.contains('scrolled')
      burgerBtn.querySelectorAll('.line').forEach(line => {
        line.style.background = isScrolled ? '#000' : '#fff'
      })
    }
  }

  burgerBtn.addEventListener('click', toggleMenu)

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navOverlay.classList.contains('active')) toggleMenu()
    })
  })

  // =============================================
  // HERO SLIDER
  // =============================================
  const slides = document.querySelectorAll('.hero-slide')
  const currentSlideEl = document.getElementById('current-slide')
  const totalSlidesEl = document.getElementById('total-slides')
  const projectNameEl = document.getElementById('project-name')

  let currentSlideIndex = 0
  const slideDuration = 6000
  let progressTween

  if (totalSlidesEl) {
    totalSlidesEl.textContent = slides.length
  }

  const goToSlide = (index) => {
    const detailTitle = document.getElementById('detail-title')
    const detailArea = document.getElementById('detail-area')
    const detailYear = document.getElementById('detail-year')

    slides.forEach((slide, i) => {
      const img = slide.querySelector('.slide-img')

      if (i === index) {
        slide.classList.add('active')
        slide.style.zIndex = 3

        const direction = Math.floor(Math.random() * 4)
        let startClip, startImgX = 0, startImgY = 0

        switch (direction) {
          case 0: startClip = 'inset(0% 0% 0% 100%)'; startImgX = 300; break // from right
          case 1: startClip = 'inset(0% 100% 0% 0%)'; startImgX = -300; break // from left
          case 2: startClip = 'inset(0% 0% 100% 0%)'; startImgY = -300; break // from top
          case 3: startClip = 'inset(100% 0% 0% 0%)'; startImgY = 300; break // from bottom
        }

        // Immediate reset and start of reveal
        gsap.killTweensOf(slide)
        gsap.set(slide, {
          clipPath: startClip,
          opacity: 1,
          visibility: 'visible',
          scale: 1.05
        })

        // Faster transition (1.5s)
        gsap.to(slide, {
          clipPath: 'inset(0% 0% 0% 0%)',
          scale: 1,
          duration: 1.5,
          ease: 'power4.inOut'
        })

        if (img) {
          gsap.fromTo(img,
            { scale: 1.3, x: startImgX, y: startImgY },
            { scale: 1, x: 0, y: 0, duration: 1.8, ease: 'power3.out' }
          )
        }

        if (projectNameEl) {
          projectNameEl.textContent = slide.dataset.title
          gsap.fromTo(projectNameEl,
            { y: '100%', opacity: 0 },
            { y: '0%', opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 }
          )
        }

        const counterLine = document.querySelector('.slide-counter')
        if (counterLine) {
          gsap.fromTo(counterLine,
            { y: '-100%', opacity: 0 },
            { y: '0%', opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
          )
        }

        const seeDetail = document.getElementById('see-work-detail')
        if (seeDetail) {
          gsap.fromTo(seeDetail,
            { y: '100%', opacity: 0 },
            { y: '0%', opacity: 1, duration: 1, ease: 'power3.out', delay: 0.4 }
          )
        }

        if (detailTitle) detailTitle.textContent = slide.dataset.title
        if (detailArea) detailArea.textContent = slide.dataset.area
        if (detailYear) detailYear.textContent = slide.dataset.year

        // Restart progress bar IMMEDIATELY
        const progressBar = document.getElementById('info-progress-bar')
        if (progressBar) {
          if (progressTween) progressTween.kill()
          progressTween = gsap.fromTo(progressBar,
            { width: '0%' },
            {
              width: '100%',
              duration: slideDuration / 1000,
              ease: 'none',
              onComplete: nextSlide
            }
          )
        }
      } else {
        if (slide.classList.contains('active')) {
          slide.style.zIndex = 1
          gsap.to(slide, {
            scale: 0.9,
            opacity: 0,
            duration: 1.5,
            ease: 'power4.inOut',
            onComplete: () => {
              slide.classList.remove('active')
              gsap.set(slide, { visibility: 'hidden', clipPath: 'inset(0% 0% 0% 0%)', scale: 1, opacity: 1 })
            }
          })
        }
      }
    })

    currentSlideIndex = index
    if (currentSlideEl) {
      currentSlideEl.textContent = index + 1
    }
  }

  const nextSlide = () => {
    let next = (currentSlideIndex + 1) % slides.length
    goToSlide(next)
  }

  const startSlider = () => {
    goToSlide(0)
  }

  if (slides.length > 0) {
    startSlider()
  }

  // =============================================
  // SCROLL ANIMATIONS (GSAP Timeline with Scrub)
  // =============================================
  function initAnimations() {
    const header = document.getElementById('header')
    const desktopNav = header.querySelector('.desktop-nav')
    const contactBtn = header.querySelector('.btn-contact')
    const heroLogo = document.getElementById('hero-logo')
    const heroSlider = document.getElementById('hero-slider')
    const heroSection = document.getElementById('hero-section')
    const heroInfoBar = document.querySelector('.hero-info-bar')
    const scrollArrow = document.getElementById('scroll-arrow')
    const projectDetails = document.getElementById('project-details')

    // Use GSAP MatchMedia for robust responsive animations
    const mm = gsap.matchMedia()

    mm.add({
      isDesktop: `(min-width: 769px)`,
      isMobile: `(max-width: 768px)`
    }, (context) => {
      const { isDesktop, isMobile } = context.conditions

      // Main Timeline
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSection,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
          onUpdate: (self) => {
            // Header background is now handled globally

            // STOP Slider when scrolling starts
            if (self.progress > 0.02) {
              if (progressTween && progressTween.isActive()) progressTween.pause()
            } else {
              if (progressTween && progressTween.paused()) progressTween.resume()
            }
          }
        }
      })

      // 0. Background change
      mainTl.to([heroSection, '.hero-pin-wrapper'], {
        backgroundColor: '#ffffff',
        duration: 1
      }, 0)

      // 1. Shrink Slider - Responsive
      mainTl.to(heroSlider, {
        width: isMobile ? '100.2%' : '90%', /* Using 100% to avoid overflow-x gap */
        left: isMobile ? '0%' : '5%',
        height: isMobile ? '55vh' : '70vh',
        y: isMobile ? '0vh' : '8vh',
        borderRadius: isMobile ? '0px' : '2px',
        duration: 1
      }, 0)

      // 2. Transform Logo
      mainTl.to(heroLogo, {
        bottom: isMobile ? '40px' : '60px',
        left: isMobile ? '25px' : '5%',
        color: '#000000',
        duration: 1
      }, 0)

      mainTl.to(heroLogo.querySelector('span'), {
        fontSize: isMobile ? 'clamp(1.5rem, 8.5vw, 2.2rem)' : 'clamp(2.5rem, 8vw, 7.5rem)',
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: isMobile ? '-0.02em' : '-0.02em',
        duration: 1
      }, 0)

      // 3. Fade out bar
      if (heroInfoBar) mainTl.to(heroInfoBar, { opacity: 0, duration: 0.3 }, 0.2)

      // 4. Reveal Details
      if (projectDetails) mainTl.to(projectDetails, { opacity: 1, y: 0, duration: 0.8 }, 0.4)

      // 5. Center text on image
      const overlayTexts = document.querySelectorAll('.slide-overlay-text')
      if (overlayTexts.length > 0) mainTl.to(overlayTexts, { opacity: 1, duration: 0.5 }, 0.3)
    })


    // 8. GLOBAL HEADER BEHAVIOR (Hide on Scroll Down, Show on Scroll Up)
    ScrollTrigger.create({
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const isScrollingDown = self.direction === 1
        const scrollY = window.scrollY
        const isAtTop = scrollY < 50

        // 1. Handle Burger Color
        // It should be black on white background (scrollY > window.innerHeight)
        if (scrollY > window.innerHeight * 0.8) {
          burgerBtn.querySelectorAll('.line').forEach(line => line.style.background = '#000')
        } else {
          if (!navOverlay.classList.contains('active')) {
            burgerBtn.querySelectorAll('.line').forEach(line => line.style.background = '#fff')
          }
        }

        // 2. Handle Header Background & Nav Visibility
        const navLinks = header.querySelectorAll('.desktop-nav a, .btn-contact')

        if (isAtTop) {
          // Top of page: Transparent, Nav visible, White text
          gsap.to(header, { backgroundColor: 'transparent', backdropFilter: 'blur(0px)', duration: 0.4, overwrite: true })
          gsap.to([desktopNav, contactBtn], { opacity: 1, visibility: 'visible', y: 0, duration: 0.4, overwrite: true })
          gsap.to(navLinks, { color: '#ffffff', duration: 0.1 })
        } else if (isScrollingDown) {
          // Scrolling Down: Transparent, Nav hidden (only burger visible)
          gsap.to(header, { backgroundColor: 'transparent', backdropFilter: 'blur(0px)', duration: 0.4, overwrite: true })
          gsap.to([desktopNav, contactBtn], { opacity: 0, visibility: 'hidden', y: -20, duration: 0.4, overwrite: true })
        } else {
          // Scrolling UP: White background, Nav visible, Black text
          gsap.to(header, { backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(12px)', duration: 0.4, overwrite: true })
          gsap.to([desktopNav, contactBtn], { opacity: 1, visibility: 'visible', y: 0, duration: 0.4, overwrite: true })

          // Force black text on white header background
          gsap.to(navLinks, { color: '#000000', duration: 0.1 })
        }
      }
    })

    const revealElements = document.querySelectorAll('.works-grid, .work-card')
    revealElements.forEach((el) => {
      gsap.fromTo(el,
        {
          opacity: 0,
          y: 60,
          scale: 0.98
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      )
    })
  }
})


