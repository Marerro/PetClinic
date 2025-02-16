import { useForm } from "react-hook-form";
import { useEffect, useContext, useState } from "react";
import axios from "axios";
import AppointmentContext from "../context/AppointmentContext";

const appAPI = import.meta.env.VITE_APP_API;

const EditAppointmentModal = ({ appointment, onClose }) => {
  const { updateAppointmentState } = useContext(AppointmentContext);
  const { register, handleSubmit } = useForm();
  
  const [formData, setFormData] = useState({
    petname: "",
    petowner: "",
    description: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    if (appointment) {
      setFormData({
        petname: appointment.petname || "",
        petowner: appointment.petowner || "",
        description: appointment.description || "",
        date: appointment.date ? appointment.date.split("T")[0] : "",
        time: appointment.time || "",
      });
    }
  }, [appointment]);

  const onSubmit = async () => {
    if (!appointment.id) return;

    try {
      const response = await axios.patch(
        `${appAPI}/${appointment.id}`,
        { id: appointment.id, user_id: appointment.user_id, ...formData },
        { withCredentials: true }
      );

      if (response.data.data) {
        updateAppointmentState(response.data.data);
        onClose();
      }
    } catch (error) {
      console.error("Failed to update appointment:", error);
    }
  };

  return (
    <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
      <div className="relative p-4 w-full max-w-2xl">
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 border-b dark:border-gray-600 border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Edit Appointment</h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={onClose}
            >
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
            </button>
          </div>
          <div className="p-4 space-y-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Pet Name</label>
              <input
                {...register("petname")}
                type="text"
                value={formData.petname}
                onChange={(e) => setFormData({ ...formData, petname: e.target.value })}
                className="input input-bordered w-full"
              />

              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-2">Owner</label>
              <input
                {...register("petowner")}
                type="text"
                value={formData.petowner}
                onChange={(e) => setFormData({ ...formData, petowner: e.target.value })}
                className="input input-bordered w-full"
              />

              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-2">Description</label>
              <input
                {...register("description")}
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="input input-bordered w-full"
              />

              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-2">Date</label>
              <input
                {...register("date")}
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="input input-bordered w-full"
              />

              <div className="flex items-center justify-end p-4 border-t border-gray-200 dark:border-gray-600 mt-4">
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Save
                </button>
                <button type="button" onClick={onClose} className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAppointmentModal;
