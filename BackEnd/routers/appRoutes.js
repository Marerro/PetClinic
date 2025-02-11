const router = require('express');
const appController = require('../controllers/appController');

const appRouter = router();

appRouter.post('/appointment', appController.postNewAppointment);

module.exports = appRouter;