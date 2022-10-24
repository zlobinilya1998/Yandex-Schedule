export class EventsTransformer {
    static transformIntoView(events){
        return events
            .filter(event => event.id !== 0)
            .map(event => ({...event, start: new Date(event.start)}))
            .sort((a, b) => a.start - b.start)
    }
    static getEventText = (event) => {
        let services = '';
        event.services.forEach((service,index) => {
            if (index === 0) services += 'Услуги: '
            if (service.service_name.toLowerCase().includes('сертификат')) return;
            services += service.service_name + ', \n'
        })

        const clientComment = event.client_comment ? `, комментарий от клиента: ${event.client_comment}` : ''
        const index = event.payment_method.indexOf('руб.', 0)

        const price = event.payment_method.slice(0,index).replace(' ','')
        let priceText = ''
        if (price > 0) priceText += ` Стоимость ${price} рублей \n`;

        return 'Клиент ' + event.name + ' \n ' + priceText + services + ', \n запись в  ' + event.start.getHours() + ' часов: '
    }
}
