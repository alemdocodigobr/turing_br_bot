/**
 * Turing Bot
 *
 * This file is part of Turing Bot.
 * You are free to modify and share this project or its files.
 *
 * @package  turing_br_bot
 * @license  GPLv3 <http://www.gnu.org/licenses/gpl-3.0.en.html>
 */

import CommandController from "../CommandController.js";
import ChatsModel from "../../model/ChatsModel.js";
import SendMessage from "../../library/telegram/resource/SendMessage.js";
import Lang from "../../helper/Lang.js";

export default class GreetingsCommand extends CommandController {

    /**
     * The constructor.
     *
     * @author Marcos Leandro
     * @since 1.0.0
     */
    constructor(app) {
        super(app);
    }

    /**
     * Command main route.
     *
     * @author Marcos Leandro
     * @since 1.0.0
     */
    index() {
        return;
    }

    /**
     * Activates the greetings message.
     *
     * @author Marcos Leandro
     * @since 1.0.0
     *
     * @param payload
     */
    async on(payload) {

        const isAdmin = await this.isAdmin(payload);
        if (!isAdmin) {
            this.warnUserAboutReporting(payload);
            return;
        }

        const chats = new ChatsModel();
        const chat = await chats.findOne({ id: payload.message.chat.id });

        if (!chat) {
            return;
        }

        if (!chat.config) {
            chat.config = {};
        }

        if (typeof chat.config.greetings !== "object") {
            chat.config.greetings = {};
        }

        chat.config.greetings.status = false;

        chats.update(
            { id: payload.message.chat.id },
            { config: chat.config }
        );

        const sendMessage = new SendMessage();
        sendMessage
            .setChatId(payload.message.chat.id)
            .setText(Lang.get("commandGreetingsActivated"));

        sendMessage.post();
    }

    /**
     * Deactivates the greetings message.
     *
     * @author Marcos Leandro
     * @since 1.0.0
     *
     * @param payload
     */
    async off(payload) {

        const isAdmin = await this.isAdmin(payload);
        if (!isAdmin) {
            this.warnUserAboutReporting(payload);
            return;
        }

        const chats = new ChatsModel();
        const chat = await chats.findOne({ id: payload.message.chat.id });

        if (!chat) {
            return;
        }

        if (!chat.config) {
            chat.config = {};
        }

        if (typeof chat.config.greetings !== "object") {
            chat.config.greetings = {};
        }

        chat.config.greetings.status = false;

        chats.update(
            { id: payload.message.chat.id },
            { config: chat.config }
        );

        const sendMessage = new SendMessage();
        sendMessage
            .setChatId(payload.message.chat.id)
            .setText(Lang.get("commandGreetingsDeactivated"));

        sendMessage.post();
    }

    /**
     * Sets the greetings message.
     *
     * @author Marcos Leandro
     * @since 1.0.0
     *
     * @param payload Telegram payload.
     */
    async set(payload) {

        const isAdmin = await this.isAdmin(payload);
        if (!isAdmin) {
            this.warnUserAboutReporting(payload);
            return;
        }

        const chats = new ChatsModel();
        const chat = await chats.findOne({ id: payload.message.chat.id });

        if (!chat) {
            return;
        }

        if (!chat.config) {
            chat.config = {};
        }

        if (typeof chat.config.greetings !== "object") {
            chat.config.greetings = {};
        }

        let greetings = "";
        for (let i = 1, length = arguments.length; i < length; i++) {
            greetings += `${arguments[i]} `;
        }

        greetings = greetings.trim();
        chat.config.greetings.message = greetings;

        chats.update(
            { id: payload.message.chat.id },
            { config: chat.config }
        );
    }
}
