/**
 * Turing Bot
 *
 * This file is part of Turing Bot.
 * You are free to modify and share this project or its files.
 *
 * @package  turing_br_bot
 * @license  GPLv3 <http://www.gnu.org/licenses/gpl-3.0.en.html>
 */

import TelegramBotApi from "../TelegramBotApi.js";

export default class GetUpdates extends TelegramBotApi {

    /**
     * The constructor.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     */
    constructor() {
        super("getUpdates");
    }

    /**
     * Sets the offset.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param  {number} offset
     *
     * @return {GetUpdates}
     */
    setOffset(offset) {
        this.payload = {};
        this.payload.offset = offset || "";
        return this;
    }

    /**
     * Sets the limit.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param  {number} limit
     *
     * @return {GetUpdates}
     */
    setLimit(limit) {
        this.payload.limit = limit;
        return this;
    }

    /**
     * Sets the timeout.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param  {number} timeout
     *
     * @return {GetUpdates}
     */
    setTimeout(timeout) {
        this.payload.timeout = timeout;
        return this;
    }

    /**
     * Sets the allowed updates.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param  {Array<string>} allowedUpdates
     *
     * @return {GetUpdates}
     */
    setAllowedUpdates(allowedUpdates) {
        this.payload.allowed_updates = allowedUpdates;
        return this;
    }
}
