/**
 * Turing Bot
 *
 * This file is part of Turing Bot.
 * You are free to modify and share this project or its files.
 *
 * @package  turing_br_bot
 * @license  GPLv3 <http://www.gnu.org/licenses/gpl-3.0.en.html>
 */

export default {
    startButton : "Adicione-me ao seu grupo",
    defaultGreetings : "Olá <a href=\"tg://user?id={userid}\">{username}</a>, te desejo as boas-vindas ao grupo! Em caso de dúvidas, por favor contate um administrador.",
    commandGreetingsActivated : "Saudações ativadas",
    commandGreetingsDeactivated : "Saudações desativadas",
    warnNameChanging : "<a href=\"tg://user?id={userid}\">{oldname}</a> mudou seu nome para <a href=\"tg://user?id={userid}\">{newname}</a>",
    unauthorizedCommand : "<a href=\"tg://user?id={userid}\">{username}</a>, você não está autorizado a enviar este comando aqui.\nEste incidente será reportado.",
    unauthorizedCommandReport : "O usuário <a href=\"tg://user?id={userid}\">{username}</a> está tentando enviar um comando não autorizado em <a href=\"https://t.me/{chaturl}\">{chatname}</a>:\n<pre>{content}</pre>",
};
