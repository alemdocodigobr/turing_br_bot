/**
 * Turing Bot
 *
 * This file is part of Turing Bot.
 * You are free to modify and share this project or its files.
 *
 * @package  turing_br_bot
 * @license  GPLv3 <http://www.gnu.org/licenses/gpl-3.0.en.html>
 */

import express from "express";
import bodyParser from "body-parser";

export default class App {

    /**
     * Express instance.
     *
     * @var {Express}
     */
    express = express();

    /**
     * Initializing method.
     *
     * @param {Array} controllers
     */
    constructor(controllers) {

        const port = process.env.PORT || 3000;
        this.initializeMiddlewares();
        this.initializeControllers(controllers);

        this.express.listen(port, () => {
            console.log(`Turing Bot listening on port ${port}`);
        });

        if (process.env.TELEGRAM_WEBHOOK_ACTIVE?.toLowerCase() === "false") {
            initializeLongPolling();
        }
    }

    /**
     * Initializes the middlewares.
     */
    initializeMiddlewares() {
        this.express.use(bodyParser.json({ type: "*/*" }));
    }

    /**
     * Initializes the controllers.
     *
     * @param {Array} controllers
     */
    initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.express.use("/", controller.getRoutes());
        });
    }

    /**
     * Makes the long polling to the Telegram API.
     *
     * @param  {number} offset
     */
    initializeLongPolling(offset) {
    }
}
