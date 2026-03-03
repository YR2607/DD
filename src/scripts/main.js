import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

import { initScroller } from './scroller.js'
import { initHeroSlider } from './slider.js'
import { initNavigation } from './navigation.js'
import { initScrollAnimations, initPortalAnimations } from './animations.js'

function initWorksPage() {
  // Filter toggle
  const filterBtn = document.getElementById('works-filter-btn')
  const filterDropdown = document.getElementById('works-filter-dropdown')

  if (filterBtn && filterDropdown) {
    filterBtn.addEventListener('click', (e) => {
      e.stopPropagation()
      filterBtn.classList.toggle('active')
      filterDropdown.classList.toggle('open')
    })

    document.addEventListener('click', () => {
      filterBtn.classList.remove('active')
      filterDropdown.classList.remove('open')
    })

    // Filter logic
    const filterOptions = filterDropdown.querySelectorAll('.filter-option')
    const cards = document.querySelectorAll('.works-project-card')

    filterOptions.forEach(option => {
      option.addEventListener('click', () => {
        filterOptions.forEach(o => o.classList.remove('active'))
        option.classList.add('active')

        const filter = option.dataset.filter

        cards.forEach(card => {
          const categories = card.dataset.categories || ''
          if (filter === 'all' || categories.includes(filter)) {
            gsap.to(card, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.5,
              ease: 'power3.out',
              clearProps: 'display',
              onStart: () => { card.style.display = '' }
            })
          } else {
            gsap.to(card, {
              opacity: 0,
              y: 20,
              scale: 0.98,
              duration: 0.3,
              ease: 'power2.in',
              onComplete: () => { card.style.display = 'none' }
            })
          }
        })

        filterBtn.classList.remove('active')
        filterDropdown.classList.remove('open')
      })
    })
  }

  // Card reveal animations
  const cards = document.querySelectorAll('.works-project-card')
  if (cards.length) {
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'expo.out',
      delay: 0.2
    })
  }

  // Hero title reveal
  const heroElements = document.querySelectorAll('.works-hero .reveal-hero')
  if (heroElements.length) {
    gsap.to(heroElements, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: 'expo.out',
      delay: 0.05
    })
  }

  // Portal animations (same as main page)
  initPortalAnimations()
}

function initCompanyPage() {
  // Hero reveal (same as About page)
  const heroReveals = document.querySelectorAll('.reveal-hero')
  heroReveals.forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.3 }
    )
  })

  // Logo scale animation
  const mainLogo = document.querySelector('.co-hero-logo span')
  if (mainLogo) {
    gsap.from(mainLogo, {
      scale: 1.1,
      letterSpacing: '0.1em',
      duration: 2,
      ease: 'power4.out',
      delay: 0.6
    })
  }

  // Sticky Logo Pinning (logo stays until co-location)
  ScrollTrigger.create({
    trigger: '.co-hero',
    start: 'top top',
    endTrigger: '.co-location',
    end: 'top top',
    pin: '.co-hero-center',
    pinSpacing: false,
    scrub: true
  })

  // Fade out hero elements as user scrolls
  gsap.to('.co-hero-top-left, .co-hero-bottom-right, .co-hero .scroll-hint', {
    opacity: 0,
    y: -100,
    scrollTrigger: {
      trigger: '.co-hero',
      start: '20% top',
      end: '80% top',
      scrub: true
    }
  })

  // Reveal all .co-reveal elements with scroll trigger
  const reveals = document.querySelectorAll('.co-reveal')
  reveals.forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        once: true
      }
    })
  })

  // Animated number counters
  const numberValues = document.querySelectorAll('.co-number-value')
  numberValues.forEach((el) => {
    const target = parseInt(el.dataset.target, 10)
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(el, {
          duration: 2,
          ease: 'power2.out',
          onUpdate: function () {
            const progress = this.progress()
            el.textContent = Math.round(target * progress)
          }
        })
      }
    })
  })

  // Portal animations
  initPortalAnimations()
}

document.addEventListener('DOMContentLoaded', () => {
  // 1. Smooth scroll
  const lenis = initScroller()

  const preloader = document.getElementById('preloader')
  const isWorksPage = document.body.classList.contains('works-page')
  const isCompanyPage = document.body.classList.contains('company-page')
  const isAboutPage = document.body.classList.contains('about-page')
  const isContactPage = document.body.classList.contains('contact-page')

  // Check if preloader was already shown this session
  const preloaderShown = sessionStorage.getItem('preloaderShown')
  const isHomePage = window.location.pathname === '/' || window.location.pathname === ''

  function initPageComponents() {
    initNavigation(lenis)

    let slider
    if (!isWorksPage && !isCompanyPage && !isAboutPage) {
      slider = initHeroSlider(lenis)
    }

    if (isWorksPage) {
      initWorksPage()
    } else if (isCompanyPage) {
      initCompanyPage()
    }

    if (isContactPage) {
      const reveals = document.querySelectorAll('.reveal')
      reveals.forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true }
          }
        )
      })
    }

    initScrollAnimations(slider)
  }

  // --- SKIP PRELOADER on subsequent navigations (except home page) ---
  if (preloaderShown && !isHomePage) {
    // Remove preloader immediately
    if (preloader) {
      preloader.classList.add('hidden')
    }
    document.body.classList.remove('is-loading')
    initPageComponents()
    return
  }

  // --- FIRST VISIT: show preloader with real progress ---
  sessionStorage.setItem('preloaderShown', '1')

  const percentEl = document.getElementById('preloader-percent')
  const lineFill = document.getElementById('preloader-line-fill')

  let currentPercent = 0
  let targetPercent = 0
  let pageLoaded = false
  let initialized = false

  // Track real image loading
  const imgs = document.querySelectorAll('img')
  const totalImgs = imgs.length
  let loadedCount = 0

  function updateTargetByResources() {
    if (totalImgs === 0) {
      targetPercent = pageLoaded ? 100 : 50
    } else {
      // 90% of progress tied to images, last 10% on window.load
      const resourceProgress = (loadedCount / totalImgs) * 90
      targetPercent = Math.max(targetPercent, Math.floor(resourceProgress))
    }
  }

  if (totalImgs > 0) {
    imgs.forEach(img => {
      if (img.complete) {
        loadedCount++
        updateTargetByResources()
      } else {
        img.addEventListener('load', () => {
          loadedCount++
          updateTargetByResources()
        })
        img.addEventListener('error', () => {
          loadedCount++
          updateTargetByResources()
        })
      }
    })
  } else {
    setTimeout(() => { targetPercent = 50 }, 100)
  }

  // Smooth counter animation
  function updatePercent() {
    if (currentPercent < targetPercent) {
      const diff = targetPercent - currentPercent
      const step = Math.max(1, Math.ceil(diff * 0.2))
      currentPercent = Math.min(currentPercent + step, targetPercent)

      if (percentEl) percentEl.textContent = currentPercent
      if (lineFill) lineFill.style.width = currentPercent + '%'
    }

    if (currentPercent >= 100 && pageLoaded) {
      hidePreloader()
    } else {
      requestAnimationFrame(updatePercent)
    }
  }

  requestAnimationFrame(updatePercent)

  const hidePreloader = () => {
    if (initialized) return
    initialized = true

    if (percentEl) percentEl.textContent = '100'
    if (lineFill) lineFill.style.width = '100%'

    setTimeout(() => {
      if (preloader) {
        preloader.classList.add('fade-out')
      }
      document.body.classList.remove('is-loading')

      initPageComponents()

      // Remove preloader from DOM after curtain animation
      setTimeout(() => {
        if (preloader) preloader.classList.add('hidden')
      }, 800)
    }, 100)
  }

  // When page actually loads, allow 100%
  window.addEventListener('load', () => {
    pageLoaded = true
    targetPercent = 100
  })

  // Safety fallback
  setTimeout(() => {
    pageLoaded = true
    targetPercent = 100
  }, 5000)
})
