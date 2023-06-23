import { startWidget } from "./widgetService.js";


export const cityServiceSearch = (widget) => {
    const button = document.querySelector('.widget__change-city');

    button.addEventListener('click', () => {
        const form = document.createElement('form')
        form.className = 'widget__form'
        const input = document.createElement('input')
        input.className = 'widget__input'
        input.name = 'sity'
        input.type = 'search'
        input.placeholder = 'Введите город'
        form.append(input)
        widget.append(form)

        input.focus()

        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            widget.textContent = ''
            await startWidget(input.value, widget)
            cityServiceSearch(widget)
            
        })

        input.addEventListener('keydown', (e) => {
            
            if (e.code === 'Escape') {
                form.remove();
            }
        })
    })

    
};