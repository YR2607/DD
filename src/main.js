import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initScroller } from './scroller.js'
import { initHeroSlider } from './slider.js'
import { initNavigation } from './navigation.js'
import { initScrollAnimations, initPortalAnimations } from './animations.js'

gsap.registerPlugin(ScrollTrigger)

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
      duration: 0.8,
      stagger: 0.12,
      ease: 'power3.out',
      delay: 0.3
    })
  }

  // Hero title reveal
  const heroElements = document.querySelectorAll('.works-hero .reveal-hero')
  if (heroElements.length) {
    gsap.to(heroElements, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      delay: 0.1
    })
  }

  // Portal animations (same as main page)
  initPortalAnimations()
}

document.addEventListener('DOMContentLoaded', () => {
  // 1. Smooth scroll
  const lenis = initScroller()

  // 2. Preloader
  const preloader = document.getElementById('preloader')
  const isWorksPage = document.body.classList.contains('works-page')

  window.addEventListener('load', () => {
    setTimeout(() => {
      if (preloader) {
        preloader.classList.add('fade-out')
      }
      document.body.classList.remove('is-loading')

      // 3. Init components based on page
      initNavigation(lenis)

      if (isWorksPage) {
        initWorksPage()
      } else {
        const slider = initHeroSlider(lenis)
        initScrollAnimations(slider)
      }
    }, isWorksPage ? 300 : 800)
  })
})

