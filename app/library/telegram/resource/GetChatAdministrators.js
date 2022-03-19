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

export default class GetChatAdministrators extends TelegramBotApi {

     /**
      * The constructor.
      *
      * @author Marcos Leandro
      * @since  1.0.0
      */
     constructor() {
         super("getChatAdministrators");
     }

    /**
     * Sets the chat id.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param  {number} chatId
     *
     * @return {GetChatAdministrators}
     */
    setChatId(chatId) {
        this.payload.chat_id = chatId;
        return this;
    }
}
