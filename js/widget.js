import { cityServiceSearch } from './modules/cityServiceSearch.js';
import { renderTimeInWidget } from './modules/utils.js';
import { startWidget } from './modules/widgetService.js'

const init = async (app) => {
    const defaultCity = 'Люберцы'
    const widget = await startWidget(defaultCity);
    app.append(widget);

    cityServiceSearch(widget)
    renderTimeInWidget()
}

const app = document.querySelector('#app');
init(app)


setInterval(() => {
    const app = document.querySelector('#app');
    app.textContent = ''
    init(app);
}, 3600000);




