/**
 * Turing Bot
 *
 * This file is part of Turing Bot.
 * You are free to modify and share this project or its files.
 *
 * @package  turing_br_bot
 * @license  GPLv3 <http://www.gnu.org/licenses/gpl-3.0.en.html>
 */

export default class DefaultModel {

    /**
     * Database connection instance.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @var {object}
     */
    static connection;

    /**
     * The constructor.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     */
    constructor(app, collection) {
        this.app = app;
        this.collection = collection;
    }

    /**
     * Returns all registers in collection.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     */
    async findAll() {
        return DefaultModel.connection.collection(this.collection).find().toArray();
    }

    /**
     * Finds a row by given param.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param {object} object
     *
     * @returns {object}
     */
    async findOne(object) {
        return DefaultModel.connection.collection(this.collection).findOne(object);
    }

    /**
     * Inserts a new row in collection.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param {object} object
     *
     * @returns {object}
     */
    async insert(data) {
        return DefaultModel.connection.collection(this.collection).insertOne(data);
    }

    /**
     * Updates a row.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param {object} object Object to be updated.
     * @param {object} data   Update data.
     *
     * @returns {object}
     */
    async update(object, data) {
        return DefaultModel.connection.collection(this.collection).updateOne(object, { $set: data });
    }

    /**
     * Deletes a row.
     *
     * @author Marcos Leandro
     * @since  1.0.0
     *
     * @param {object} object Object to be deleted.
     *
     * @returns {object}
     */
    async delete(object) {
        return DefaultModel.connection.collection(this.collection).deleteOne(object);
    }
}
