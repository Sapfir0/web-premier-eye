import {push} from "connected-react-router";
import {inject} from "inversify";
import {TYPES} from "../../typings/types";
import {ActionTypePayload} from "../../typings/common";


export default class SliderSaga implements ISliderSaga {
    private readonly usersFetcher: IUsersApiInteractionService
    private _actions: ILoginAction

    constructor(
        @inject(TYPES.UsersApiInteractionService) usersFetcher: IUsersApiInteractionService,
        @inject(TYPES.LoginAction) actions: ILoginAction,
    ) {
        this._actions = actions
        this.usersFetcher = usersFetcher

        this.login = this.login.bind(this)
        this.getUserInfo = this.getUserInfo.bind(this)

    }

    public *getImagesFromCamera(action: ActionTypePayload<AuthDataPayload, AUTH_ACTIONS>) {
        const either: Either<ValidationError, TokensDataExtended> = yield this.usersFetcher.login(action.payload.username, action.payload.password)

        if(either.isRight()) { // TODO пришлось воспользоваться такой записью, потому что я не знаю как сделать две саги друг за другом последовательно
            yield put(this._actions.setTokens(either.value))
            yield put(this._actions.getUserInfo())
            yield put(push(ClientRoutes.ProjectsList))
        } else {
            yield put(this._actions.setError(either.value))
        }
    }

    public *watch(): Generator {
        yield takeEvery(LOGIN, this.login)
        yield takeEvery(GET_USER_INFO, this.getUserInfo)
    }

}
