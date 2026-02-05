import gsap from 'gsap'

/**
 * Инициализация навигации и бургер-меню
 * @param {Lenis} lenis - Экземпляр Lenis для управления прокруткой
 */
export function initNavigation(lenis) {
    const burgerBtn = document.getElementById('burger-btn')
    const navOverlay = document.getElementById('nav-overlay')
    const navLinks = document.querySelectorAll('.nav-links a')

    const toggleMenu = () => {
        burgerBtn.classList.toggle('active')
        navOverlay.classList.toggle('active')
        document.body.classList.toggle('menu-open')

        if (navOverlay.classList.contains('active')) {
            lenis.stop()
            burgerBtn.querySelectorAll('.line').forEach(line => {
                line.style.background = '#000'
            })
        } else {
            lenis.start()
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
}
