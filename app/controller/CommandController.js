/**
 * Turing Bot
 *
 * This file is part of Turing Bot.
 * You are free to modify and share this project or its files.
 *
 * @package  turing_br_bot
 * @license  GPLv3 <http://www.gnu.org/licenses/gpl-3.0.en.html>
 */

import DefaultController from "./DefaultController.js";
import SendMessage from "../library/telegram/resource/SendMessage.js";
import GetChatAdministrators from "../library/telegram/resource/GetChatAdministrators.js";
import Lang from "../helper/Lang.js";

export default class CommandController extends DefaultController {

    /**
     * The constructor.
     *
     * @author Marcos Leandro
     * @siunce  1.0.0
     */
    constructor(app) {
        super(app);
    }

    /**
     * Warns the user about reporting.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param  {Record<string, any>} payload
     */
    async warnUserAboutReporting(payload) {

        const username = payload.message.from.first_name.length ?
            payload.message.from.first_name :
            payload.message.from.username;

        const text = Lang.get("unauthorizedCommand")
            .replace("{userid}", payload.message.from.id)
            .replace("{username}", username);

        const sendMessage = new SendMessage();
        sendMessage
            .setChatId(payload.message.chat.id)
            .setText(text)
            .setParseMode("HTML")
            .post();

        this.reportUnauthorizedCommand(payload);
    }

    /**
     * Reports the unauthorized command.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param  {Record<string, any>} payload
     * @param  {Array<number>}      admins
     */
    async reportUnauthorizedCommand(payload) {

        const username = payload.message.from.first_name.length ?
            payload.message.from.first_name :
            payload.message.from.username;

        const groupKey =  payload.message.chat.username ?
            "{chatname}" :
            "<a href=\"https://t.me/{chaturl}\">{chatname}</a>";

        const text = Lang.get("unauthorizedCommandReport")
            .replaceAll("{userid}", payload.message.from.id)
            .replaceAll("{username}", username)
            .replaceAll(groupKey, payload.message.chat.title)
            .replaceAll("{chaturl}", payload.message.chat.username)
            .replaceAll("{content}", payload.message.text);

        const request = new GetChatAdministrators();
        request.setChatId(payload.message.chat.id);

        const response = await request.post();
        const json = await response.json();

        if (!json.hasOwnProperty("ok") || json.ok !== true) {
            return;
        }

        const admins = json.result;
        for (let i = 0, length = admins.length; i < length; i++) {

            if (admins[i].is_bot) {
                continue;
            }

            const sendMessage = new SendMessage();
            sendMessage
                .setChatId(admins[i].user.id)
                .setText(text)
                .setParseMode("HTML")
                .post();
        }
    }
}
