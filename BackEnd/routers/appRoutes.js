const router = require('express');
const appController = require('../controllers/appController');
const authController = require('../controllers/authController');

const appRouter = router();

appRouter.post('/appointment', authController.protect, appController.postNewAppointment);
appRouter.get('/appointment', appController.getAllAppointments);
appRouter.get('/', appController.filterAppointments);
appRouter.patch('/:id', authController.protect, appController.updateExistingAppointment);
appRouter.delete('/:id', authController.protect, appController.deleteAppointment);

module.exports = appRouter;