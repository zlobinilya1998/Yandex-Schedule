import request from 'supertest';
import app from '../index.js';
import * as chai from "chai";

chai.should();

const specificRequest = {
    "meta": {
        "locale": "ru-RU",
        "timezone": "UTC",
        "client_id": "ru.yandex.searchplugin/7.16 (none none; android 4.4.2)",
        "interfaces": {
            "screen": {},
            "payments": {},
            "account_linking": {}
        }
    },
    "session": {
        "message_id": 0,
        "session_id": "72003b1a-a2e4-4acc-b574-48b1fab746f6",
        "skill_id": "3c5fcf9c-1047-40ef-8303-7a5709716377",
        "user": {
            "user_id": "BBB990747884D7A1FA13183AB1A726C154AD8C458FFFD137B296E5685853B940"
        },
        "application": {
            "application_id": "595C594102BF82F8C8FB67190C7EF0A5571149D82883DB428389C54AF5E1CB27"
        },
        "new": true,
        "user_id": "595C594102BF82F8C8FB67190C7EF0A5571149D82883DB428389C54AF5E1CB27"
    },
    "request": {
        "command": "скажи запись за 25 октября",
        "original_utterance": "скажи запись за 25 октября",
        "nlu": {
            "tokens": [
                "скажи",
                "запись",
                "за",
                "25",
                "октября"
            ],
            "entities": [
                {
                    "type": "YANDEX.NUMBER",
                    "tokens": {
                        "start": 3,
                        "end": 4
                    },
                    "value": 25
                },
                {
                    "type": "YANDEX.DATETIME",
                    "tokens": {
                        "start": 3,
                        "end": 5
                    },
                    "value": {
                        "month": 10,
                        "day": 25,
                        "month_is_relative": false,
                        "day_is_relative": false
                    }
                }
            ],
            "intents": {}
        },
        "markup": {
            "dangerous_context": false
        },
        "type": "SimpleUtterance"
    },
    "version": "1.0"
}

describe('POST /specific', () => {
    it('should respond with events', (done) => {
        request(app)
            .post('/specific')
            .send(specificRequest)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                res.body.response.should.have.property('text');
                done();
            });
    });
});

