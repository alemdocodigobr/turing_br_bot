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

export default class UnbanChatMember extends TelegramBotApi {

    /**
     * The constructor.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     */
    public constructor() {
        super("unbanChatMember");
    }

    /**
     * Sets the chat id.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param  {number} User Telegram ID
     *
     * @return {UnbanChatMember}
     */
    public setUserId(userId) {
        this.payload.user_id = userId;
        return this;
    }

    /**
     * Sets the chat id.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param  {number} Chat Telegram ID
     *
     * @return {UnbanChatMember}
     */
    public setChatId(chatId) {
        this.payload.chat_id = chatId;
        return this;
    }

    /**
     * Sets the "only if banned" flag.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param  {boolean}
     *
     * @return {UnbanChatMember}
     */
    public setOnlyIfBanned(onlyIfBanned) {
        this.payload.only_if_banned = onlyIfBanned;
        return this;
    }
}
