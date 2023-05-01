const Day = {
    Today: 'сегодня',
    Tomorrow: 'завтра',
}

const BotErrors = {
    FetchDataError: 'Произошла ошибка при запросе данных из салона',
    NoPeriodRecords: 'На выбранный период нет записей',
    ParseDateError: 'Мне не удалось распознать дату',
    InvalidInputDay: 'Я могу говорить запись только на сегодня или на завтра',
    InvalidRequestBody: 'В теле запроса отсутствуют требуемые поля',
    UnhandedException: 'Неопознанная ошибка',
    UnauthorizedException: 'Требуется установить куки для входа в систему профсалон',
}

export {
    Day,BotErrors
}
