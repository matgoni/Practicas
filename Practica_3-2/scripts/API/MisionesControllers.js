import MisionesDAO from '../DAO/MisionesDAO.js';

export default class MisionesControllers {
    static async apiGetMisiones(req, res, next){
        const misionesPerPage = req.query.misionesPerPage ? parseInt(req.query.misionesPerPage) : 10;
        const page = req.query.page ? parseInt(req.query.page) : 0;
        const filters = {};
        if (req.query.rated) {
            filters.rated = req.query.rated;
        } else if (req.query.title) {
            filters.title = req.query.title;
        }
        const {misionesList, totalNumMisiones} = await MisionesDAO.getMisiones (
           {filters, page, misionesPerPage},  
        );
        const response = {
            misiones : misionesList,
            page,
            filters,
            entries_per_page: misionesPerPage,
            total_results: totalNumMisiones,
        };
        res.json(response);
     }
}
