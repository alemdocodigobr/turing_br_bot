/**
 * Turing Bot
 *
 * This file is part of Turing Bot.
 * You are free to modify and share this project or its files.
 *
 * @package  turing_br_bot
 * @license  GPLv3 <http://www.gnu.org/licenses/gpl-3.0.en.html>
 */

import App from "./app/App.js";
import DefaultController from "./app/controller/DefaultController.js";
import IncomingController from "./app/controller/IncomingController.js";
import path from "path";
import dotenv from "dotenv"

console.log(" _____           _               ____        _");
console.log("|_   _|   _ _ __(_)_ __   __ _  | __ )  ___ | |_");
console.log("  | || | | | '__| | '_ \\ / _` | |  _ \\ / _ \\| __|");
console.log("  | || |_| | |  | | | | | (_| | | |_) | (_) | |_");
console.log("  |_| \\__,_|_|  |_|_| |_|\\__, | |____/ \\___/ \\__|");
console.log("                         |___/");
console.log("");

dotenv.config({
    path : path.resolve() + "/.env"
});

const app = new App();

app.addControllers([
    new DefaultController(app),
    new IncomingController(app)
]);

app.listen();

if (process.env.TELEGRAM_WEBHOOK_ACTIVE?.toLowerCase() === "false") {
    app.initializeLongPolling();
}
