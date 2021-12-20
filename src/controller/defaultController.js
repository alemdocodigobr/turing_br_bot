/**
 * Turing Bot
 *
 * This file is part of Turing Bot.
 * You are free to modify and share this project or its files.
 *
 * @package  turing_br_bot
 * @license  GPLv3 <http://www.gnu.org/licenses/gpl-3.0.en.html>
 */

 export default class DefaultController {

    /**
     * Controller path.
     *
     * @var {String}
     */
    path = "/";

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
        this.initializeRoutes();
    }

    /**
     * Controller main route.
     * It just sends a forbidden (403) error.
     *
     * @param {object} request  HTTP request
     * @param {object} response HTTP response
     */
    index(request, response) {
        response.sendStatus(403);
    }

    /**
     * Initialize all routes.
     */
    initializeRoutes() {
        this.router.all(this.path, this.index.bind(this));
    }
 }
