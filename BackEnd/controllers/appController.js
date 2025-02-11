const {postNewAppointment} = require('../models/appModel');

class appController {

    postNewAppointment = async (req, res, next) => {
        try {
            const petData = req.body;

            const response = await postNewAppointment(petData);
            res.status(200).json({
                status: "success",
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

}

module.exports = new appController();   