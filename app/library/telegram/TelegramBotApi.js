/**
 * Turing Bot
 *
 * This file is part of Turing Bot.
 * You are free to modify and share this project or its files.
 *
 * @package  turing_br_bot
 * @license  GPLv3 <http://www.gnu.org/licenses/gpl-3.0.en.html>
 */

import fetch from 'node-fetch';

export default class TelegramBotApi {

    /**
     * The constructor.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     */
    constructor(method) {
        this.endpoint = "https://api.telegram.org";
        this.method = method;
        this.token = "";
        this.payload = {};
    }

    /**
     * Sets the Telegram Bot token.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param  {string} token
     */
    static setToken(token) {
        TelegramBotApi.token = token;
    }

    /**
     * Makes a GET request to the Telegram Bot API.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @returns {Promise<any>}
     */
    async get() {
        return this.request("GET", this.payload);
    }

    /**
     * Makes a POST request to the Telegram Bot API.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @returns {Promise<any>}
     */
    async post() {
        return this.request("POST", this.payload);
    }

    /**
     * Makes a POST request to the Telegram Bot API.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @returns {Promise<any>}
     */
    async put() {
        return this.request("PUT", this.payload);
    }

    /**
     * Makes a POST request to the Telegram Bot API.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @returns {Promise<any>}
     */
    async delete() {
        return this.request("DELETE", this.payload);
    }

    /**
     * Makes the request to the Telegram Bot API.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param method
     * @param payload
     *
     * @returns {Promise<any>}
     */
    async request(method, payload) {

        const url = `${this.endpoint}/bot${TelegramBotApi.token}/${this.method}`;
        const body = JSON.stringify(payload) || "";

        const headers = {
            "Content-Type" : "application/json",
            "Content-Length" : body.length.toString()
        };

        const params = {
            method  : method,
            headers : headers,
            body    : body
        };

        return fetch(url, params);
    }
}
