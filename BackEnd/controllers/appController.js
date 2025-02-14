const {postNewAppointment, getAppointments, filterAppointments} = require('../models/appModel');

class appController {

    postNewAppointment = async (req, res, next) => {
        try {
            const petData = req.body;

            const response = await postNewAppointment(petData);

            console.log(response);

            res.status(200).json({
                status: "success",
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    getAllAppointments = async (req, res, next) => {
        try {
            const response = await getAppointments();

            res.status(200).json({
                status: "success",
                data: response
            })
        } catch (error) {
            next(error);
        }
    }

    filterAppointments = async (req, res, next) => {
        try {
            const query = req.query.search

            console.log(query)

            const response = await filterAppointments(query);

            console.log(response);

            res.status(200).json({
                status: "success",  
                data: response,
            })
        } catch (error) {
            next(error);
        }
    }

}

module.exports = new appController();   