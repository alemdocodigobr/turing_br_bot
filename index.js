/**
 * Turing Bot
 *
 * This file is part of Turing Bot.
 * You are free to modify and share this project or its files.
 *
 * @package  turing_br_bot
 * @license  GPLv3 <http://www.gnu.org/licenses/gpl-3.0.en.html>
 */

import App from "./src/app.js";
import path from "path";
import dotenv from "dotenv";
import DefaultController from "./src/controller/defaultController.js";
import IncomingController from "./src/controller/incomingController.js";

dotenv.config({
    path : path.resolve() + "/.env"
});

const app = new App([
    // new DefaultController(), new IncomingController()
]);
