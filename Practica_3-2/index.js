import express from 'express';
import cors from 'cors';
import MisionesRoute from './scripts/API/MisionesRoute.js';
<<<<<<< HEAD
import MisionesDAO from './scripts/DAO/MisionesDAO.js'
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
		const client = new mongodb.MongoClient(process.env.SPACE_DB_URI);
  		console.log('Connection String:', process.env.SPACE_DB_URI);
		const port = process.env.PORT || 8000;
		console.log(port);
		try {
		  // Connect to the MongoDB cluster
		  await client.connect();
			
		  await MisionesDAO.injectDB(client);
	
		  Index.app.listen(port, () => {
			console.log(`server is running on port:${port}`);
		  });
		} catch (e) {
		  console.error(e);
		  process.exit(1);
		}
	}
}

Index.main();
=======
import MisionesDAO from './scripts/DAO/MisionesDAO.js';
import dotenv from 'dotenv';
import mongodb from 'mongodb';

class Index {
    static app = express();
    static router = express.Router();

    static main() {
        dotenv.config();

        // Configura el servidor y la base de datos
        Index.setUpServer();
        Index.setUpDatabase();
    }

    static setUpServer() {
        // Configuración básica del servidor Express
        Index.app.use(cors());
        Index.app.use(express.json());
        Index.app.use(express.urlencoded({ extended: true }));

        // Configuración de rutas
        Index.app.use('/api/v1/misiones', MisionesRoute.configRoutes(Index.router));

        // Manejo de rutas no encontradas
        Index.app.use('*', (req, res) => {
            res.status(404).json({ error: 'not found' });
        });

        // Middleware para manejar errores
        Index.app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).send('Something went wrong!');
        });
    }

    static async setUpDatabase() {
        const connectionString = process.env.SPACE_DB_URI;
        console.log('Connection String:', connectionString);

        // Verifica si la cadena de conexión está definida
        if (!connectionString) {
            console.error('Error: MISIONES_DB_URI is not defined in the .env file.');
            process.exit(1);
        }

        const client = new mongodb.MongoClient(connectionString);
        const port = process.env.PORT || 8000;

        try {
            // Conecta con el clúster de MongoDB
            await client.connect();

            // Inyecta el cliente de MongoDB en el DAO
            await MisionesDAO.injectDB(client);

            // Inicia el servidor
            Index.app.listen(port, () => {
                console.log(`Server is running on port: ${port}`);
				console.log(`el ian vale para  pura verga`);

            });
        } catch (e) {
            console.error(e);
            process.exit(1);
        }
    }
}

// Inicia la aplicación
Index.main();
>>>>>>> 48c95b5cf654b25ee3893e0df2bb81cc9b23a7a8
