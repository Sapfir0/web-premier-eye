import {IApiInteractionService} from "../services/typings/ApiTypes";


const TYPES = {
    ApiHelper: Symbol.for('ApiHelper'),
    BaseInteractionService: Symbol.for('BaseInteractionService'),
    ApiInteractionService: Symbol.for('ApiInteractionService'),
    UrlService: Symbol.for('UrlService')

}

export { TYPES }
