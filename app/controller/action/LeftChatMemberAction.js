/**
 * Turing Bot
 *
 * This file is part of Turing Bot.
 * You are free to modify and share this project or its files.
 *
 * @package  turing_br_bot
 * @license  GPLv3 <http://www.gnu.org/licenses/gpl-3.0.en.html>
 */

import ActionController from "../ActionController.js";
import ChatsModel from "../../model/ChatsModel.js";

export default class NewChatMember extends ActionController {

    /**
     * The constructor.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     */
    constructor(app) {
        super(app);
    }

    /**
     * Action routines.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param payload
     */
    async run(payload) {

        await this.saveUserAndChat(payload.message.new_chat_member, payload.message.chat);

        const chats = new ChatsModel();
        const chat = await chats.findOne({ id: payload.message.chat.id });

        if (!chat) {
            return;
        }

        if (typeof chat.config?.eventMessages !== "undefined" && !chat.config.eventMessages) {
            this.deleteMessage(payload.message.message_id, payload.message.chat.id);
        }
    }
}
