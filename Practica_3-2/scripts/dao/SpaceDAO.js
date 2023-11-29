// SpaceDAO.js

export default class SpaceDAO {
    static missions;

    static async injectDB(conn) {
        if (SpaceDAO.missions) {
            return;
        }
        try {
            SpaceDAO.missions = await conn.db(process.env.SPACEDB_NS).collection('missions');
        } catch (e) {
            console.error(`Unable to connect in SpaceDAO: ${e}`);
        }
    }

    static async getMissions({
        filters = null,
        page = 0,
        missionsPerPage = 20,
    } = {}) {
        let query;
        if (filters) {
            if ('name' in filters) {
                query = { $text: { $search: filters.name } };
            } else if ('status' in filters) {
                query = { status: { $eq: filters.status } };
            }
        }
        let cursor;
        try {
            cursor = await SpaceDAO.missions
                .find(query)
                .limit(missionsPerPage)
                .skip(missionsPerPage * page);
            const missionsList = await cursor.toArray();
            const totalNumMissions = await SpaceDAO.missions.countDocuments(query);
            return { missionsList, totalNumMissions };
        } catch (e) {
            console.error(`Unable to issue find command: ${e}`);
            return { missionsList: [], totalNumMissions: 0 };
        }
    }

    static async getMissionDetails(missionId) {
        try {
            const missionDetails = await SpaceDAO.missions.findOne({ _id: missionId });
            return missionDetails;
        } catch (e) {
            console.error(`Unable to fetch mission details: ${e}`);
            return null;
        }
    }

    // Agregar otras operaciones segun sea necesario
}
