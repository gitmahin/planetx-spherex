import { Container } from "inversify";
import { DITokens } from "./ditokens";
import { ApiRouter } from "./routes";

export const container = new Container();

container.bind(ApiRouter).toSelf().inSingletonScope();
