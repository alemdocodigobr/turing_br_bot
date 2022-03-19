/**
 * Turing Bot
 *
 * This file is part of Turing Bot.
 * You are free to modify and share this project or its files.
 *
 * @package  turing_br_bot
 * @license  GPLv3 <http://www.gnu.org/licenses/gpl-3.0.en.html>
 */

import DefaultModel from "./DefaultModel.js";

export default class ChatsModel extends DefaultModel {

    /**
     * The constructor.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param {object} app
     */
    constructor(app) {
        super(app, "chats");
    }
}
