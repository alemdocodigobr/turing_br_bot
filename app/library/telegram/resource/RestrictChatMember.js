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

export default class RestrictChatMember extends TelegramBotApi {

    /**
      * The constructor.
      *
      * @author Marcos Leandro
      * @since  1.0.0
      */
    constructor() {
        super("restrictChatMember");
    }

    /**
     * Sets the chat id.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param  {number} User Telegram ID
     *
     * @return {RestrictChatMember}
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
     * @param  {number} chatId
     *
     * @return {RestrictChatMember}
     */
    setChatId(chatId) {
        this.payload.chat_id = chatId;
        return this;
    }

    /**
     * Sets the chat permissions.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param  {ChatPermissionsType} chatPermissions
     *
     * @return {RestrictChatMember}
     */
    setChatPermissions(chatPermissions) {
        this.payload.permissions = chatPermissions;
        return this;
    }

    /**
     * Sets the until date.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param  {number} untilDate
     *
     * @return {RestrictChatMember}
     */
    setUntilDate(untilDate) {
        this.payload.until_date = untilDate;
        return this;
    }
}
