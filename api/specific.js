const {EventsTransformer} = require("../helpers");
const SalonService = require("../services/Salon");

const specific = async (req,res) => {
    let data = [];
    try {
        data = await SalonService.loadEvents(true)
    } catch (e) {
        return res.status(500).send();
    }

    const events = EventsTransformer.transformIntoView(data.events);
    let eventsText = ''
    events.forEach(event => eventsText += EventsTransformer.getEventText(event));

    res.send(eventsText)
}

export default specific;
