/**
 * Turing Bot
 *
 * This file is part of Turing Bot.
 * You are free to modify and share this project or its files.
 *
 * @package  turing_br_bot
 * @license  GPLv3 <http://www.gnu.org/licenses/gpl-3.0.en.html>
 */

import DefaultController from "./defaultController.js";
import express from "express";

export default class IncomingController extends DefaultController {

    /**
     * Controller path.
     *
     * @var {String}
     */
     path = "/incoming";

    /**
     * Express Router Object.
     *
     * @var {Express.Router}
     */
    router = express.Router();

     /**
      * The constructor.
      */
    constructor() {
        super();
    }

    /**
     * Controller's main route.
     * It just sends a forbidden (403) error.
     */
    index(request, response) {
        response.sendStatus(403);
    }

    /**
     * Forbidden route.
     * It just sends a forbidden (401) error.
     *
     * @param {object} request  HTTP request
     * @param {object} response HTTP response
     */
    forbidden(request, response) {
        response.status(401).send("Forbidden");
    }

    /**
     * Initialize all routes.
     */
    initializeRoutes() {
        this.router.post(this.path + "/:auth", this.index.bind(this));
        this.router.all(this.path, this.forbidden.bind(this));
    }
}
