import gsap from 'gsap'

/**
 * Логика главного слайдера
 * @param {Object} options - Параметры слайдера
 * @param {Lenis} options.lenis - Экземпляр Lenis для управления прокруткой
 */
export function initHeroSlider(lenis) {
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
                    case 0: startClip = 'inset(0% 0% 0% 100%)'; startImgX = 300; break
                    case 1: startClip = 'inset(0% 100% 0% 0%)'; startImgX = -300; break
                    case 2: startClip = 'inset(0% 0% 100% 0%)'; startImgY = -300; break
                    case 3: startClip = 'inset(100% 0% 0% 0%)'; startImgY = 300; break
                }

                gsap.killTweensOf(slide)
                gsap.set(slide, {
                    clipPath: startClip,
                    opacity: 1,
                    visibility: 'visible',
                    scale: 1.05
                })

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

    if (slides.length > 0) {
        goToSlide(0)
    }

    return {
        pause: () => progressTween?.pause(),
        resume: () => progressTween?.resume(),
        isActive: () => progressTween?.isActive()
    }
}
