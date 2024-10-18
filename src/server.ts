import { App } from "@/app";
import { AppRoute } from "@/routes/app.route";
import { AuthRoute } from "./routes/auth.route";

const app = new App([new AppRoute(), new AuthRoute()]);

app.listen()
