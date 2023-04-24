export type DefaultResponse = {
    version: string;
    session: {
        end_session: boolean;
    };
    request: {
        nlu: {
            tokens: string[];
            entities: Entities;
        };
    };
    response: {
        text?: string;
        end_session: boolean;
    };
};

export type Entity = {
    type: string;
    value: {
        day: string;
        month: string;
    };
};
export type Entities = Entity[];

export type Event = {
    id: number;
    name: string;
    start: Date;
    services: Service[];
    client_comment: string | null;
    payment_method: string;
};

export type Events = Event[];

export type Service = {
    service_name: string;
};

export enum Day {
    Today = "сегодня",
    Tomorrow = "завтра",
}

export enum BotErrors {
    FetchDataError = "Произошла ошибка при запросе данных из салона",
    NoPeriodRecords = "На выбранный период нет записей",
    ParseDateError = "Мне не удалось распознать дату",
    InvalidInputDay = "Я могу говорить запись только на сегодня или на завтра",
    UnhandedException = "Неопознанная ошибка",
    UnauthorizedException = "Не могу авторизироваться в вашем личном кабинете проф салон, обновите куки"
}
