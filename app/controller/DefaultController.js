/**
 * Turing Bot
 *
 * This file is part of Turing Bot.
 * You are free to modify and share this project or its files.
 *
 * @package  turing_br_bot
 * @license  GPLv3 <http://www.gnu.org/licenses/gpl-3.0.en.html>
 */

import express from "express";
import ChatsModel from "../model/ChatsModel.js";
import UsersModel from "../model/UsersModel.js";
import TelegramBotApi from "../library/telegram/TelegramBotApi.js";
import DeleteMessage from "../library/telegram/resource/DeleteMessage.js";
import SendMessage from "../library/telegram/resource/SendMessage.js";
import GetChatAdministrators from "../library/telegram/resource/GetChatAdministrators.js";
import Lang from "../helper/Lang.js";

export default class DefaultController {

    /**
     * The constructor.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param {string} path
     */
    constructor(app, path) {
        this.app = app;
        this.path = path || "/";
        this.router = express.Router();
        this.initializeRoutes();
        TelegramBotApi.setToken(process.env.TELEGRAM_BOT_TOKEN || "");
    }

    /**
     * Controller's main route.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     */
    index(request, response) {
        response.sendStatus(403);
    }

    /**
     * Returns the controller's routes.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @returns {express.Router}
     */
    getRoutes() {
        return this.router;
    }

    /**
     * Returns the user's Telegram ID by its username.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param {string} username
     *
     * @returns {Promise<number|null>}
     */
    async getUserByMention(username) {

        const user = await UserHelper.getUserByUsername(username);

        if (user) {
            return user.user_id;
        }

        return null;
    }

    /**
     * Saves the user and group.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param payload
     */
    async saveUserAndChat(userObject, chatObject) {

        if (!userObject || !chatObject) {
            return;
        }

        const chats = new ChatsModel();
        let chat  = await chats.findOne({ id: chatObject.id });

        if (!chat) {
            chat = await this.createChat(chatObject);
        }

        const users = new UsersModel();
        let user = await users.findOne({ id: userObject.id });
        if (!user) {
            user = await this.createUser(userObject);
        }

        if (!chat.users) {
            chat.users = [];
        }

        if (!chat.users.includes(user.id)) {
            chat.users.push(user.id);
            await chats.update({ id : chat.id }, { users: chat.users });
        }

        if (!user.chats) {
            user.chats = [];
        }

        if (!user.chats.includes(chat.id)) {
            user.chats.push(chat.id);
            await users.update({ id : user.id }, { chats: user.chats });
        }

        await chats.update({ id : chat.id }, {
            id: chatObject.id,
            title: chatObject.title,
            type: chatObject.type
        });

        await users.update({ id : user.id }, {
            isBot: userObject.is_bot,
            firstName: userObject.first_name,
            lastName: userObject.last_name,
            username: userObject.username,
            languageCode: userObject.language_code
        });

        this.warnNamechanging(user, userObject, chat);
    }

    /**
     * Saves the chat in database.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param {object} chatObject
     */
    async createChat(chatObject) {

        const data = {
            id: chatObject.id,
            title: chatObject.title,
            type: chatObject.type,
            config: {}
        };

        const chats = new ChatsModel();
        await chats.insert(data);

        return await chats.findOne({ id: chatObject.id });
    }

    /**
     * Saves the user in database.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param {object} chatObject
     */
    async createUser(userObject) {

        const data = {
            id: userObject.id,
            isBot: userObject.is_bot,
            firstName: userObject.first_name,
            lastName: userObject.last_name,
            username: userObject.username,
            languageCode: userObject.language_code
        };

        const users = new UsersModel();
        await users.insert(data);

        return await users.findOne({ id: userObject.id });
    }

    /**
     * Warns if the users has changed their name.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param {object} oldUser
     * @param {object} newUser
     * @param {object} chat
     */
    async warnNamechanging(oldUser, newUser, chat) {

        if (!chat.config.nameChangingWarning) {
            return;
        }

        if (oldUser.firstName === newUser.first_name && oldUser.lastName === newUser.last_name) {
            return;
        }

        let oldName, newName;

        if (oldUser.firstName?.length) {
            oldName = oldUser.firstName;
        }

        if (oldUser.lastName?.length) {
            oldName = (oldName.length) ? `${oldName} ${oldUser.lastName}` : oldUser.lastName;
        }

        if (newUser.first_name?.length) {
            newName = newUser.first_name;
        }

        if (newUser.last_name?.length) {
            newName = (newName.length) ? `${newName} ${newUser.last_name}` : newUser.last_name;
        }

        if (oldName === newName) {
            return;
        }

        const text = Lang.get("warnNameChanging")
            .replaceAll("{userid}", newUser.id)
            .replaceAll("{oldname}", oldName)
            .replaceAll("{newname}", newName);

        const sendMessage = new SendMessage();
        sendMessage
            .setChatId(chat.id)
            .setText(text)
            .setParseMode("HTML")
            .post();
    }

    /**
     * Deletes a message.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     */
    async deleteMessage(messageId, chatId) {

        const deleteMessage = new DeleteMessage();
        deleteMessage
            .setMessageId(messageId)
            .setChatId(chatId)
            .post();
    }

    /**
     * Verifies if the user is one of the chat admins.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param  {number}  chatId
     * @param  {boolean} report
     *
     * @return {boolean}
     */
    async isAdmin(payload) {

        if (payload.message.chat.type === "private") {
            return true;
        }

        const request = new GetChatAdministrators();
        request.setChatId(payload.message.chat.id);

        const response = await request.post();
        const json     = await response.json();

        if (!json.hasOwnProperty("ok") || json.ok !== true) {
            return false;
        }

        let admins = [];
        for (let i = 0, length = json.result.length; i < length; i++) {
            admins.push(json.result[i].user.id);
        }

        return admins.includes(payload.message.from.id);
    }

    /**
     * Returns the user's Telegram ID.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param {string} username
     *
     * @returns {Promise<number|null>}
     */
     async getUserId(payload) {

        if (typeof payload.message?.reply_to_message?.from?.id !== "undefined") {
            return payload.message.reply_to_message.from.id;
        }

        const message = payload.message.text || "";
        const content = message.split(" ");

        if (content.length < 2) {
            return null;
        }

        if (Number(content[1]) == content[1]) {
            return Number(content[1]);
        }

        if (payload.message?.entities?.length) {
            for (let i = 0, length = payload.message?.entities?.length; i < length; i++) {

                if (payload.message.entities[i].type === "mention") {
                    return await this.getUserByMention(
                        content[1].replace(/^@/, "")
                    );
                }
            }
        }

        return null;
    }

    /**
     * Returns the user's Telegram ID by its username.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param {string} username
     *
     * @return {Promise<number|null>}
     */
     async getUserByMention(username) {
        const users = new UsersModel();
        const user = await users.findOne({ username : username });
        return user?.id || null;
    }

    /**
     * Initializes the controller's routes.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     */
    initializeRoutes() {
        this.router.all(this.path, this.index.bind(this));
    }
}
