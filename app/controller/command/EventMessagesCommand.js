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

export default class EventMessagesCommand extends CommandController {

    /**
     * The constructor.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param {object} app
     */
    constructor(app) {
        super(app);
    }

    /**
     * Main action. Does nothing.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     */
    index() {
        return;
    }

    /**
     * Enables the event messages.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param {object} payload
     */
    async on(payload) {
        this.changeEventMessagesStatus(payload, true);
    }

    /**
     * Disables the event messages.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param {object} payload
     */
    async off(payload) {
        this.changeEventMessagesStatus(payload, false);
    }

    /**
     * Changes the event messages status.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     */
    async changeEventMessagesStatus(payload, status) {

        if (!this.isAdmin(payload)) {
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

        chat.config.eventMessages = status;

        chats.update(
            { id: payload.message.chat.id },
            { config: chat.config }
        );

        const messageIndex = "eventMessages" + (status === true ? "Activated" : "Deactivated");
        const sendMessage = new SendMessage();
        console.log(Lang.get(messageIndex));
        sendMessage
            .setChatId(payload.message.chat.id)
            .setText(Lang.get(messageIndex))
            .post();
    }
}
