const getDefaultResponse = (body) => {
    const { version, session } = body
    return {
        version,
        session,
        response: {
            end_session: false,
        }
    }
}

const getTime = (event) => {
    const hours = event.start.getHours();
    const minutes = event.start.getMinutes();
    const timeZone = 3;
    return `Запись в ${hours + timeZone}:${minutes > 0 ? minutes : '00'} \n `
}
const getClientsCount = (event) => {
    const clients = event.services.length;
    return `Количество клиентов - ${clients} \n `
}
const getClientName = (event) => {
    return `Клиент ${event.name} \n `
}
const getPrice = (event) => {
    const index = event.payment_method.indexOf('руб.', 0)
    const price = event.payment_method.slice(0,index).replace(' ','')
    if (price > 0) return `Стоимость ${price} рублей \n `;
    else return ``
}
const getServices = (event) => {
    let services = '';

    event.services.forEach((service,index) => {
        if (index === 0) services += 'Услуги: '

        if (service.service_name.toLowerCase().includes('сертификат')) return;

        services += service.service_name

        if (event.services[index + 1]) services += ','
        else services += '.'
    })
    services += ' \n '
    return services
}
const getClientComment = (event) => {
    const comment = event.client_comment ? `Комментарий от клиента: ${event.client_comment} \n ` : ''
    return comment
}
class EventsTransformer {
    static transformIntoView(events){
        return events
            .filter(event => event.id !== 0)
            .map(event => ({...event, start: new Date(event.start)}))
            .sort((a, b) => a.start - b.start)
    }
    static getEventText = (event) => {
        const time = getTime(event)
        const clientName = getClientName(event)
        const priceText = getPrice(event)
        const services = getServices(event)

        return time + clientName + priceText + services;
    }
}

module.exports = {
    getDefaultResponse,
    EventsTransformer,
}
