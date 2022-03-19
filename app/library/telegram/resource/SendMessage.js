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

export default class SendMessage extends TelegramBotApi {

    /**
     * The constructor.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     */
    constructor() {
        super("sendMessage");
    }

    /**
     * Sets the chat id.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param  {number} chatId
     *
     * @return {SendMessage}
     */
    setChatId(chatId) {
        this.payload.chat_id = chatId;
        return this;
    }

    /**
     * Sets the message content.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param  {String} text
     *
     * @return {SendMessage}
     */
    setText(text) {
        this.payload.text = text;
        return this;
    }

    /**
     * Sets the parse mode.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param  {String} parseMode
     *
     * @return {SendMessage}
     */
    setParseMode(parseMode) {
        this.payload.parse_mode = parseMode;
        return this;
    }

    /**
     * Sets the entitites.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param  {Array} entities
     *
     * @return {SendMessage}
     */
    setEntities(entities) {
        this.payload.entities = entities;
        return this;
    }

    /**
     * Sets the disable web page preview.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param  {Boolean} disableWebPagePreview
     *
     * @return {SendMessage}
     */
    setDisableWebPagePreview(disableWebPagePreview) {
        this.payload.disable_web_page_preview = disableWebPagePreview;
        return this;
    }

    /**
     * Sets the disable notification.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param  {Boolean} disableNotification
     *
     * @return {SendMessage}
     */
    setDisableNotification(disableNotification) {
        this.payload.disable_notification = disableNotification;
        return this;
    }

    /**
     * Sets the reply to message id.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param  {number} replyToMessageId
     *
     * @return {SendMessage}
     */
    setReplyToMessageId(replyToMessageId) {
        this.payload.reply_to_message_id = replyToMessageId;
        return this;
    }

    /**
     * Sets the reply markup.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param  {Object} replyMarkup
     *
     * @return {SendMessage}
     */
    setReplyMarkup(replyMarkup) {
        this.payload.reply_markup = replyMarkup;
        return this;
    }
}
