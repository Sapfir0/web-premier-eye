import {Either} from "@sweet-monads/either";
import {BaseInteractionError} from "../Errors/BaseInteractionError";


export type AsyncEither<T> = Promise<Either<BaseInteractionError, T>>
