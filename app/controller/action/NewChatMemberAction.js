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
import SendMessage from "../../library/telegram/resource/SendMessage.js";
import RestrictChatMember from "../../library/telegram/resource/RestrictChatMember.js";

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

        if (chat.config?.greetings?.enabled === false) {
            return;
        }

        const users = new UsersModel();
        const user = await users.findOne({ id: payload.message.new_chat_member.id });

        if (!user) {
            return;
        }

        if (chat.config?.restrictNewUsers) {
            this.restrictUser(user, chat);
        }

        let text = chat.config?.greetings?.message || Lang.get("defaultGreetings");

        text = text.replace("{userid}", payload.message.new_chat_member.id);
        text = text.replace(
            "{username}",
            payload.message.new_chat_member.first_name || payload.message.new_chat_member.username
        );

        const sendMessage = new SendMessage();
        sendMessage
            .setChatId(payload.message.chat.id)
            .setText(text)
            .setParseMode("HTML")
            .post();
    }

    /**
     * Restricts the user for the next 24 hours.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param user
     * @param chat
     *
     * @return void
     */
    async restrictUser(user, chat) {

        const untilDate = Math.floor(Date.now() / 1000) + 86400;

        const chatPermissions = {
            can_send_messages         : true,
            can_send_media_messages   : false,
            can_send_polls            : false,
            can_send_other_messages   : false,
            can_add_web_page_previews : false,
            can_change_info           : false,
            can_invite_users          : false,
            can_pin_messages          : false
        };

        const restrictChatMember = new RestrictChatMember();
        restrictChatMember
            .setUserId(user.user_id)
            .setChatId(chat.chat_id)
            .setChatPermissions(chatPermissions)
            .setUntilDate(untilDate)
            .post();
    }
}
