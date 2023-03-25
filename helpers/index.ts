import { DefaultResponse, Event, Events } from "../models/Entities";

export const getDefaultResponse = (body): DefaultResponse => {
    const { version, session, request } = body;
    return {
        version,
        session,
        request,
        response: {
            end_session: false,
        },
    };
};

const getRandomPhrase = (arr: unknown[]) => {
    const indexOfPhrase = Math.floor(Math.random() * arr.length);
    return arr[indexOfPhrase];
};

const getTime = (event: Event) => {
    const hours = event.start.getHours();
    const minutes = event.start.getMinutes();
    const timeZone = 3;
    return `Запись в ${hours + timeZone}:${minutes > 0 ? minutes : "00"} \n `;
};
const getClientsCount = (event: Event) => {
    const clients = event.services.length;
    return `Количество клиентов - ${clients} \n `;
};
const getClientComment = (event: Event) => {
    const comment = event.client_comment
        ? `Комментарий от клиента: ${event.client_comment} \n `
        : "";
    return comment;
};
const getClientName = (event: Event) => {
    return `Клиент - ${event.name} \n `;
};
const getPrice = (event: Event) => {
    const index = event.payment_method.indexOf("руб.", 0);
    const price = event.payment_method.slice(0, index).replace(" ", "");
    if (+price > 0) return `Стоимость ${price} рублей \n `;
    else return ``;
};
const getServices = (event: Event) => {
    let services = "";

    event.services.forEach((service, index) => {
        if (index === 0) services += "Услуги: ";

        if (service.service_name.toLowerCase().includes("сертификат")) return;

        services += service.service_name;

        if (event.services[index + 1]) services += ",";
        else services += ".";
    });
    services += " \n ";
    return services;
};

export class EventsTransformer {
    static transformIntoView(events: Events): Events {
        return events
            .filter((event) => event.id !== 0)
            .map((event) => ({ ...event, start: new Date(event.start) }))
            .sort((a, b) => +a.start - +b.start);
    }
    static getEventText = (event: Event) => {
        const time = getTime(event);
        const clientName = getClientName(event);
        const priceText = getPrice(event);
        const services = getServices(event);

        return time + clientName + priceText + services;
    };
}
