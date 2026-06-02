
const contactBtn = document.querySelector('.contact__btn')
const closeBtn = document.querySelector('.contact__box-btn')
const contactBox = document.getElementById('contacts')

contactBtn.addEventListener('click', () => {
    
    contactBox.classList.remove('hidden__click')
    contactBox.classList.add('show__scroll')
})

closeBtn.addEventListener('click', () => {

    contactBox.classList.remove('show__scroll')
    contactBox.classList.add('hidden__click')
})