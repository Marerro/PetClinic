import react from "react";
import { useState } from "react";
import Modal from "../../utils/Modal";
import { useForm } from "react-hook-form";

function AddAppointment() {
  const { register, handleSubmit } = useForm();
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  // will continue here with the form
  const onSubmit = () => {};

  return (
    <>
      <div
        onClick={openModal}
        className="bg-violet-800 w-[67rem] mx-auto mt-5 h-[5vh] flex justify-center items-center cursor-pointer rounded-t-[10px]"
      >
        <div>
          <button
            onClick={openModal}
            className="text-white text-center text-[20px]"
          >
            Add Appointment
          </button>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="border-2 bg-red-700 w-[150px] h-[100px]"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex  mt-3 gap-1 w-[100%]">
            <label className="text-black text-[15px] flex items-center justify-end w-[130px] text-center">
              Name
            </label>
            <input
              {...register("name")}
              type="text"
              placeholder="Name"
              className="w-[83%] h-[3.5vh] text-black "
            />
          </div>

          <div className="flex mt-3 gap-1 w-[100%]">
            <label className="text-black text-[15px] flex items-center justify-end w-[130px] text-center">
              Pet Owner
            </label>
            <input
              {...register("petowner")}
              type="text"
              placeholder="Owner's name"
              className="w-[83%] h-[3.5vh] text-black "
            />
          </div>

          <div className="flex mt-3 gap-1">
            <div className="flex justify-between w-[100%]">
              <label className="text-black text-[15px] flex items-center justify-center text-center">
                Date
              </label>
              <input
                type="date"
                {...register("date")}
                className="w-[55%] h-[3.5vh] text-black"
              />

              <label className="text-black text-[15px] flex items-center justify-center text-center">
                Time
              </label>
              <input
                type="time"
                {...register("time")}
                className="w-[15%] h-[3.5vh] text-black"
              />
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default AddAppointment;
