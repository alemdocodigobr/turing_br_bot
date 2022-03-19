/**
 * Turing Bot
 *
 * This file is part of Turing Bot.
 * You are free to modify and share this project or its files.
 *
 * @package  turing_br_bot
 * @license  GPLv3 <http://www.gnu.org/licenses/gpl-3.0.en.html>
 */

import br from "../lang/br.js";

export default class Lang {

    /**
     * Default country.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @var {string}
     */
    static country = "br";

     /**
      * Langs object.
      *
      * @author Marcos Leandro
      * @since  1.0.0
      */
    static langs = {
        br: br
    };

    /**
     * Returns the lang.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param {string} index
     *
     * @return {string}
     */
    static get(index) {
        return Lang.langs[Lang.country][index] || index;
    }

    /**
     * Sets the active country.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @throws {Error}
     */
    static set(country) {

        if (!Lang.langs.hasOwnProperty(country)) {
            throw new Error("Country not found.");
        }

        Lang.country = country;
    }
}
