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
import UsersModel from "../../model/UsersModel.js";

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

        const chats = new ChatsModel();
        const chat = await chats.findOne({ id: payload.message.chat.id });

        if (!chat) {
            return;
        }

        if (typeof chat.config?.eventMessages !== "undefined" && !chat.config.eventMessages) {
            this.deleteMessage(payload.message.message_id, payload.message.chat.id);
        }

        this.removeUserFromChat(
            payload.message.left_chat_member.id,
            payload.message.chat.id
        );

        this.removeChatFromUser(
            payload.message.left_chat_member.id,
            payload.message.chat.id
        );
    }

    /**
     * Removes the user from the chat.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param {number} userId
     * @param {number} chatId
     */
    async removeUserFromChat(userId, chatId) {

        const chats = new ChatsModel();
        const chat = await chats.findOne({ id: chatId });

        if (!chat) {
            return;
        }

        if (!Array.isArray(chat.users)) {
            return;
        }

        const index = chat.users.indexOf(userId);
        if (index === -1) {
            return;
        }

        chat.users.splice(index, 1);
        chats.update({ id : chatId }, { users: chat.users });
    }

    /**
     * Removes the chat from user.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param {number} userId
     * @param {number} chatId
     */
    async removeChatFromUser(userId, chatId) {

        const users = new UsersModel();
        const user = await users.findOne({ id: userId });

        if (!user) {
            return;
        }

        if (!Array.isArray(user.chats)) {
            return;
        }

        const index = user.chats.indexOf(chatId);
        if (index === -1) {
            return;
        }

        user.chats.splice(index, 1);
        users.update({ id : userId }, { chats: user.chats });
    }
}
