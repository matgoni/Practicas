import MisionesControllers from "./MisionesControllers.js";

export default class MisionesRoute {
    static configRoutes(router){
        router.route("/").get(MisionesControllers.apiGetMisiones);

        return router;
    }
}