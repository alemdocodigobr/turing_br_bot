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

import BanCommand from "./command/BanCommand.js";
import EventMessagesCommand from "./command/EventMessagesCommand.js";
import GreetingsCommand from "./command/GreetingsCommand.js";
import NameChangingWarning from "./command/NameChangingWarning.js";

import LeftChatMemberAction from "./action/LeftChatMemberAction.js";
import NewChatMemberAction from "./action/NewChatMemberAction.js";

export default class IncomingController extends DefaultController {

    /**
     * The constructor.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     */
    constructor(app) {

        super(app, "/incoming");

        this.actions = {};
        this.commands = {};

        this.initializeActions();
        this.initializeCommands();
    }

    /**
     * Controller's main route.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     */
    index(request, response) {

        if (request.params.auth !== process.env.AUTH) {
            response.status(401).send("Forbidden");
        }

        const payload = request.body;

        if (!payload.message) {
            response.status(200).send();
        }

        this.handle(payload);
        response.status(200).send();
    }

    /**
     * Handles the incoming message.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param {Record<string, any>} payload
     */
    handle(payload) {

        let message;

        if (typeof payload.message !== "undefined") {
            message = payload.message;

        } else if (typeof payload.edited_message !== "undefined") {
            message = payload.edited_message;
        }

        switch (true) {

            case this.isCommand(payload):
                this.handleCommand(payload);
                break;

            default:
                this.handleAction(payload);
        }
    }

    /**
     * Forbidden action.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param request
     * @param response
     */
    forbidden(request, response) {
        response.status(401).send("Forbidden");
    }

    /**
     * Initializes the controller's routes.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     */
    initializeRoutes() {
        this.router.post(this.path + "/:auth", this.index.bind(this));
        this.router.all(this.path, this.forbidden.bind(this));
    }

    /**
     * Returns whether the incoming message is a command or not.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     */
    isCommand(payload) {
        return (
            typeof payload.message !== "undefined" &&
            typeof payload.message.entities !== "undefined" &&
            payload.message.entities[0].type === "bot_command"
        );
    }

    /**
     * Handles the incoming command.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     */
    async handleCommand(payload) {

        this.deleteMessage(
            payload.message.message_id,
            payload.message.chat.id
        );

        const instruction = payload.message.text.replace("/", "").split(" ");
        const command = instruction[0].split("@")[0];
        const callable = typeof instruction[1] !== "undefined" ? instruction[1] : "index";

        if (typeof this.commands[command] !== "undefined") {

            const className = this.commands[command];
            const commandObject = new className(this.app);
            const method = typeof commandObject[callable] !== "undefined" ? callable : "index";

            const argumentsIndex = typeof commandObject[callable] !== "undefined" ? 2 : 1;
            const args = instruction.length > argumentsIndex ? instruction.slice(argumentsIndex) : [];

            try {
                commandObject[method](payload, ...args);

            } catch (err) {
                this.app.log(err.toString());
            }
        }
    }

    /**
     * Handles the incoming action.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     */
    async handleAction(payload) {

        if (typeof payload.message === "undefined") {
            return;
        }

        for (let action in this.actions) {
            if (payload.message.hasOwnProperty(action)) {
                this.actions[action].map(classname => (new classname(this.app)).run(payload));
            }
        }
    }

    /**
     * Initializes the BOT's actions.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     */
    initializeActions() {
        this.actions = {
            new_chat_member: [NewChatMemberAction],
            left_chat_member: [LeftChatMemberAction]
        };
    }

    /**
     * Initializes the BOT's commands.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     */
    initializeCommands() {
        this.commands = {
            ban: BanCommand,
            eventmessages: EventMessagesCommand,
            greetings: GreetingsCommand,
            namechangingwarning: NameChangingWarning
        };
    }
}
