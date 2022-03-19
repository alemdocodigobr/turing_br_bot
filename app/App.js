/**
 * Turing Bot
 *
 * This file is part of Turing Bot.
 * You are free to modify and share this project or its files.
 *
 * @package  turing_br_bot
 * @license  GPLv3 <http://www.gnu.org/licenses/gpl-3.0.en.html>
 */

import fs from "fs";
import express from "express";
import bodyParser from "body-parser";
import mongodb from "mongodb";
import GetUpdates from "./library/telegram/resource/GetUpdates.js";
import IncomingController from "./controller/IncomingController.js";
import DefaultModel from "./model/DefaultModel.js";

export default class App {

    /**
     * The constructor.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     */
    constructor() {
        this.app  = express();
        this.port = (process.env.PORT || 3000);

        this.initializeMiddlewares();
        this.connectToDatabase();
    }

    /**
     * Starts to listen in the specified port.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @return {void}
     */
    addControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use("/", controller.getRoutes());
        });
    }

    /**
     * Starts to listen in the specified port.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @return {void}
     */
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Listening on port ${this.port}`);
        });
    }

    /**
     * Makes the long polling to the Telegram API.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param  {number} offset
     */
    async initializeLongPolling(offset) {

        const request = new GetUpdates();

        if (typeof offset !== "undefined" && offset.toString().length) {
            request.setOffset(offset);
        }

        try {

            const response = await request.post();
            const json     = await response.json();

            let newOffset;

            for (let i = 0, length = json.result.length; i < length; i++) {

                const update = json.result[i];
                newOffset    = update.update_id + 1;

                (new IncomingController(this)).handle(update);
            }

            this.initializeLongPolling(newOffset);

        } catch (err) {
            console.log(err);
            this.initializeLongPolling();
        }
    }

    /**
     * Saves an entry to the log.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param content
     */
    log(content) {

        const date = new Date();

        const year  = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day   = (date.getDate()).toString().padStart(2, "0");

        const hours   = (date.getHours()).toString().padStart(2, "0");
        const minutes = (date.getMinutes()).toString().padStart(2, "0");
        const seconds = (date.getSeconds()).toString().padStart(2, "0");

        const filename = `${year}-${month}-${day}.log`;
        fs.appendFileSync(`../log/${filename}`, `${hours}:${minutes}:${seconds} :: ${content}\n`);
    }

    /**
     * Initializes the middlewares.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @return {void}
     */
    initializeMiddlewares() {
        this.app.use(bodyParser.json({ type: "*/*" }));
    }

    /**
     * Connects to the database.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     */
    connectToDatabase() {
        mongodb.MongoClient
            .connect(process.env.MONGODB_STRING)
            .then(conn => DefaultModel.connection = conn.db(process.env.MONGODB_DATATASE))
            .catch(err => console.log(err));
    }
}
