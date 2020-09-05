import ApiHelper from "../services/ApiHelper";
import {TYPES} from "../services/typings/types";
import {IApiHelper, IApiInteractionService, IBaseInteractionService} from "../services/typings/ApiTypes";
import {Container} from "inversify";
import BaseInteractionService from "../services/BaseInteractionService";
import ApiInteractionService from "../services/ApiInteractionService";

const myContainer = new Container();


myContainer.bind<IApiHelper>(TYPES.ApiHelper).to(ApiHelper)
myContainer.bind<IBaseInteractionService>(TYPES.BaseInteractionService).to(BaseInteractionService)

myContainer.bind<IApiInteractionService>(TYPES.ApiInteractionService).to(ApiInteractionService)
