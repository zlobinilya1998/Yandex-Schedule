export class EventsTransformer {
    static transformIntoView(events){
        return events
            .filter(event => event.id)
            .map(event => ({...event, start: new Date(event.start)}))
            .sort((a, b) => a.start - b.start)
    }
    static getEventText = (event) => ', в ' + event.start.getHours() + ' часов: ' + event.name
}
