const {postNewAppointment, getAppointments, filterAppointments, updateAppointment, deleteAppointment} = require('../models/appModel');

class appController {

    postNewAppointment = async (req, res, next) => {
        try { 
      
          const newAppointment = {
            ...req.body,
            user_id: req.user.id,
          };
      
          const response = await postNewAppointment(newAppointment);
      
          res.status(200).json({
            status: "success",
            data: response,
          });
        } catch (error) {
          next(error);
        }
      };

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
            const { search, sort, order } = req.query

            console.log(sort)

            const response = await filterAppointments(search, sort, order);

            console.log(response);

            res.status(200).json({
                status: "success",  
                data: response,
            })
        } catch (error) {
            next(error);
        }
    }

    updateExistingAppointment = async (req, res, next) => {
        const { id } = req.params;
        const { id: user_id, role } = req.user || {};  
    
        try {
            const isAdmin = role === "admin";
    
            const updatedData = isAdmin
                ? { ...req.body, id }
                : { ...req.body, id, user_id };
    
    
            const appointment = await updateAppointment(updatedData, isAdmin);
    
            res.status(200).json({
                status: "success",
                data: appointment,
            });
        } catch (error) {
            next(error);
        }
    };

    deleteAppointment = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { id: user_id, role } = req.user || {};

            const isAdmin = role === "admin";

            const data = isAdmin ? { id } : { id, user_id };

            const appointmentDelete = await deleteAppointment(data, isAdmin);
    
            res.status(200).json({
                status: "success",
                data: appointmentDelete
            })
        } catch (error) {
            next(error);
        }
    }


}

module.exports = new appController();   