const router = require('express');
const appController = require('../controllers/appController');

const appRouter = router();

appRouter.post('/appointment', appController.postNewAppointment);
appRouter.get('/appointment', appController.getAllAppointments);

module.exports = appRouter;