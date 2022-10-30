import request from 'supertest';
import app from '../index.js';
import * as chai from "chai";

chai.should();

const todayRequest = {
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
        "session_id": "e3ae31ed-82e0-4c96-a247-effe23d14fd9",
        "skill_id": "d402b792-a344-44d6-9487-5930a0937374",
        "user": {
            "user_id": "8875B3B1D379E796847D191C6C719600F122999360E2DA889B37C208B9E49F96"
        },
        "application": {
            "application_id": "4EDB718E201C868BC548E67E8302C72F4698E004DEF76818E18A044501B7959A"
        },
        "new": true,
        "user_id": "4EDB718E201C868BC548E67E8302C72F4698E004DEF76818E18A044501B7959A"
    },
    "request": {
        "command": "скажи запись на сегодня",
        "original_utterance": "скажи запись на сегодня",
        "nlu": {
            "tokens": [
                "скажи",
                "запись",
                "на",
                "сегодня"
            ],
            "entities": [
                {
                    "type": "YANDEX.DATETIME",
                    "tokens": {
                        "start": 2,
                        "end": 4
                    },
                    "value": {
                        "day": 0,
                        "day_is_relative": true
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
const tomorrowRequest = {
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
        "session_id": "955106e7-c267-4616-a518-38b4fed3460c",
        "skill_id": "d402b792-a344-44d6-9487-5930a0937374",
        "user": {
            "user_id": "8875B3B1D379E796847D191C6C719600F122999360E2DA889B37C208B9E49F96"
        },
        "application": {
            "application_id": "4EDB718E201C868BC548E67E8302C72F4698E004DEF76818E18A044501B7959A"
        },
        "new": true,
        "user_id": "4EDB718E201C868BC548E67E8302C72F4698E004DEF76818E18A044501B7959A"
    },
    "request": {
        "command": "скажи запись на завтра",
        "original_utterance": "скажи запись на завтра",
        "nlu": {
            "tokens": [
                "сегодня"
            ],
            "entities": [
                {
                    "type": "YANDEX.DATETIME",
                    "tokens": {
                        "start": 2,
                        "end": 4
                    },
                    "value": {
                        "day": 1,
                        "day_is_relative": true
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

describe('POST /record today', () => {
    it('should respond with text', (done) => {
        request(app)
            .post('/record')
            .send(todayRequest)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                res.body.should.have.property('response');
                console.log(res.body.response)
                done();
            });
    });
});
describe('POST /record tomorrow', () => {
    it('should respond with text', (done) => {
        request(app)
            .post('/record')
            .send(tomorrowRequest)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                res.body.should.have.property('response');
                console.log(res.body.response)
                done();
            });
    });
});
