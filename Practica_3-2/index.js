import express from 'express';
import cors from 'cors';
import MisionesRoute from './scripts/API/MisionesRoute.js';
import MisionesDAO from './scripts/DAO/MisionesDAO.js';
import dotenv from 'dotenv';
import mongodb from 'mongodb';

class Index {
    static app = express();
    static router = express.Router();

    static main() {
        dotenv.config();
        Index.setUpServer();
        Index.setUpDatabase();
    }

    static setUpServer() {
        Index.app.use(cors());
        Index.app.use(express.json());
        Index.app.use(express.urlencoded({ extended: true }));
        Index.app.use('/api/v1/misiones', MisionesRoute.configRoutes(Index.router));
        Index.app.use('*', (req, res) => {
            res.status(404).json({ error: 'not found' });
        });
    }
	static async setUpDatabase() {
		const connectionString = process.env.SPACE_DB_URI;
		console.log('Connection String:', connectionString);
	
		if (!connectionString) {
			console.error('Error: MISIONES_DB_URI is not defined in the .env file.');
			process.exit(1);
		}
	
		const client = new mongodb.MongoClient(connectionString);
		const port = process.env.PORT || 8000;
	
		try {
			// Connect to the MongoDB cluster
			await client.connect();
	
			// Inject MongoDB client to DAO
			await MisionesDAO.injectDB(client);
	
			// Start the server
			Index.app.listen(port, () => {
				console.log(`Server is running on port: ${port}`);
			});
		} catch (e) {
			console.error(e);
			process.exit(1);
		}
	}
	
}
Index.main();
