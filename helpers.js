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
        return services + ', в ' + event.start.getHours() + ' часов: ' + event.name
    }
}
