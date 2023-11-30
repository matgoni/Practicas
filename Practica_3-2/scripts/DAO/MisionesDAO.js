export default class MisionesDAO{
    static misiones;
    static async injectDB(conn) {
        if (MisionesDAO.misiones) {
            return;
        }
    }

    static async getMovies({ // default filter
        filters = null,
        page = 0,
        MisionesPerPage = 20, // will only get 20 movies at once
    } = {}) {
        let query;
        if (filters) {
            if ('title' in filters) {
                query = { $text: { $search: filters.title } };
            } else if ('rated' in filters) {
                query = { rated: { $eq: filters.rated } };
            }
        }
        let cursor;
        try {
            cursor = await MisionesDAO.misiones
                .find(query)
                .limit(misionessPerPage)
                .skip(misionesPerPage * page);
            const misionesList = await cursor.toArray();
            const totalNumMisiones = await MisioensDAO.misiones.countDocuments(query);
            return { misionesList, totalNumMisiones };
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`);
            return { misionesList: [], totalNumMisiones: 0 };
        }
    }
}