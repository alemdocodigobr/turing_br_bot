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
import BanChatMember from "../../library/telegram/resource/BanChatMember.js";

export default class BanCommand extends CommandController {

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
     * Command main route.
     *
     * @author Marcos Leandro
     * @since 1.0.0
     *
     * @param payload
     */
     async index(payload) {

        const isAdmin = await this.isAdmin(payload);
        if (!isAdmin) {
            this.warnUserAboutReporting(payload);
            return;
        }

        const userId = await this.getUserId(payload);
        const chatId = payload.message.chat.id;

        if (!userId || !chatId) {
            return;
        }

        const ban = new BanChatMember();
        ban
            .setUserId(userId)
            .setChatId(chatId)
            .post();
    }
}
