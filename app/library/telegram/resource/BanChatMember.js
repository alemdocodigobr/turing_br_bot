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

export default class BanChatMember extends TelegramBotApi {

    /**
     * The constructor.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     */
     constructor() {
        super("banChatMember");
    }

    /**
     * Sets the chat id.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param  {number} User Telegram ID
     *
     * @return {BanChatMember}
     */
     setUserId(userId) {
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
     * @return {BanChatMember}
     */
     setChatId(chatId) {
        this.payload.chat_id = chatId;
        return this;
    }

    /**
     * Sets the ban until date.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param  {number} untilDate
     *
     * @return {BanChatMember}
     */
    setUntilDate(untilDate) {
        this.payload.until_date = untilDate;
        return this;
    }

    /**
     * Sets the message revoking.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param  {boolean} revokeMessages
     *
     * @return {BanChatMember}
     */
    setRevokeMessages(revokeMessages) {
        this.payload.revoke_messages = revokeMessages;
        return this;
    }
}
