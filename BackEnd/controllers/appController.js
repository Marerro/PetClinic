const {
  postNewAppointment,
  getAppointments,
  filterAppointments,
  updateAppointment,
  deleteAppointment,
} = require("../models/appModel");

class appController {
  postNewAppointment = async (req, res, next) => {
    try {
      const newAppointment = {
        ...req.body,
        user_id: req.user.id,
        status: "Pending",
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

        const filterAppointments = req.query

        let page = parseInt(filterAppointments.page)
        let limit = parseInt(filterAppointments.limit) 

        if(!page || !limit) {
            const response = await getAppointments();

            return res.status(200).json({
                status: "success",
                data: response
            })
        }

        const offset = (page - 1) * limit

        const response = await getAppointments(limit, offset);

        return res.status(200).json({
            status: "success",
            page: page,
            data: response,
        })
    } catch (error) {
      next(error);
    }
  };

  filterAppointments = async (req, res, next) => {
    try {
      const { search, sort, order } = req.query;
      const { id: user_id, roles } = req.user || {};

      const isAdmin = roles === "admin";


      const response = await filterAppointments(
        user_id,
        search,
        sort,
        order,
        isAdmin
      );

      console.log(response);

      res.status(200).json({
        status: "success",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  };

  updateExistingAppointment = async (req, res, next) => {
    const { id } = req.params;
    const { id: user_id, roles } = req.user || {};

    try {
      const isAdmin = roles === "admin";

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
      const { id: user_id, roles } = req.user || {};

      const isAdmin = roles === "admin";

      const data = isAdmin ? { id } : { id, user_id };

      const appointmentDelete = await deleteAppointment(data, isAdmin);

      res.status(200).json({
        status: "success",
        data: appointmentDelete,
      });
    } catch (error) {
      next(error);
    }
  };

  approveAppointment = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const { roles } = req.user || {};

      const isAdmin = roles === "admin";

      if (isAdmin) {
        const response = await updateAppointment({ id, status }, isAdmin);

        res.status(200).json({
          status: "successfully updated status!",
          data: response,
        });
      } else {
        res.status(403).json({
          status: "error",
          message: "You are not authorized to perform this action",
        });
      }
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new appController();
