import {BotErrors} from "../models/Entities";

export class ApiError extends Error {
    status;
    response;
    constructor(status, message, response) {
        super(message);
        this.status = status;
        this.response = response
    }
    static ParseDateException(response) {
        response.response.text = BotErrors.ParseDateError;
        response.session.end_session = true;
        return new ApiError(200, BotErrors.ParseDateError, response)
    }
    static InvalidInputDay(response) {
        response.response.text = BotErrors.InvalidInputDay;
        response.response.end_session = true;
        return new ApiError(200, BotErrors.InvalidInputDay, response)
    }
    static InvalidRequestBody(response) {
        response.response.text = BotErrors.InvalidRequestBody;
        response.response.end_session = true;
        return new ApiError(200, BotErrors.InvalidRequestBody, response)
    }
}
