import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initScroller } from './scroller.js'
import { initHeroSlider } from './slider.js'
import { initNavigation } from './navigation.js'
import { initScrollAnimations } from './animations.js'

gsap.registerPlugin(ScrollTrigger)

document.addEventListener('DOMContentLoaded', () => {
  // 1. Плавный скролл
  const lenis = initScroller()

  // 2. Прелоадер
  const preloader = document.getElementById('preloader')
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('fade-out')
      document.body.classList.remove('is-loading')

      // 3. Инициализация остальных компонентов после загрузки
      const slider = initHeroSlider(lenis)
      initNavigation(lenis)
      initScrollAnimations(slider)
    }, 800)
  })
})



