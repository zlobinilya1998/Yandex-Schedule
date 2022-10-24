export class EventsTransformer {
    static transformIntoView(events){
        return events
            .filter(event => event.id !== 0)
            .map(event => ({...event, start: new Date(event.start)}))
            .sort((a, b) => a.start - b.start)
    }
    static getEventText = (event) => {
        let services = '';
        event.services.forEach(service => services += service.service_name)

        const clientComment = event.client_comment ? `, комментарий от клиента: ${event.client_comment}` : ''
        const index = event.payment_method.indexOf('руб.', 0);

        const price = event.payment_method.slice(0,index);
        const priceText = price ? ` Стоимость ${price} рублей\n` : '';
        return services + ', в ' + event.start.getHours() + ' часов: ' + event.name + priceText
    }
}
