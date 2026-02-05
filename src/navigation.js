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
            gsap.to(burgerBtn.querySelectorAll('.line'), { background: '#000', duration: 0.3 })
        } else {
            lenis.start()
            // Режим скролла сам позаботится о цвете при следующем апдейте или мы форсируем его здесь
            const isAtTop = window.scrollY < 50
            gsap.to(burgerBtn.querySelectorAll('.line'), {
                background: isAtTop ? '#fff' : '#000',
                duration: 0.3
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
