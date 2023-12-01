export default class MisionesDAO{
    static misiones;
    static async injectDB(conn) {
        if (MisionesDAO.misiones) {
            return;
        }
        try {
            MisionesDAO.misiones = await conn.db(process.env.SPACEASTRONOUTAS_NS)
            .collection('Misiones')
        } catch (e){
            console.error(`error: ${e}`);
        }
    }

    static async getMisiones({ // default filter
        filters = null,
        page = 0,
        misionesPerPage = 20, // will only get 20 movies at once
    } = {}) {
        let query;
        if (filters) {
            if ('name' in filters) {
                query = { $text: { $search: filters.title } };
            } else if ('status' in filters) {
                query = { status: { $eq: filters.rated } };
            }
        }
        let cursor;
        try {
            cursor = await MisionesDAO.misiones
                .find(query)
                .limit(misionessPerPage)
                .skip(misionesPerPage * page);
            const misionesList = await cursor.toArray();
            const totalNumMisiones = await MisionesDAO.misiones.countDocuments(query);
            return { misionesList, totalNumMisiones };
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`);
            return { misionesList: [], totalNumMisiones: 0 };
        }
    }
}