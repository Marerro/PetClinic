import react from "react";
import { useState } from "react";
import Modal from "../../utils/Modal";
import { useForm } from "react-hook-form";
import { TiPlus } from "react-icons/ti";
import {postAppointment} from "../helpers/post";

function AddAppointment() {
  const { register, handleSubmit } = useForm();
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen((prev) => !prev);
  };

  const onSubmit = async (data) => {
    if(!data) {
      console.log("missing data")
    }
    const response = await postAppointment(data)
    if (response) {
      setIsOpen(false);
    } else {
      console.log("Appointment creation failed");
    }
  };

  return (
    <>

      <div
        onClick={handleModal}
        className="bg-violet-800 max-w-[67rem] mx-auto mt-5 h-[5vh] flex justify-center items-center cursor-pointer rounded-t-[10px] relative z-50"
      >
        <div className="text-white flex items-center"><TiPlus className="text-[25px]"/> Add Appointment</div>
      </div>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-2 items-center w-full pb-3">
            <label className="text-black text-[15px] items-center w-[130px] text-right">
              Name
            </label>
            <input
              {...register("petname")}
              type="text"
              placeholder="Name"
              className="w-full h-[3.5vh] text-black border rounded px-2"
            />
          </div>

          <div className="flex gap-2 items-center w-full pb-3">
            <label className="text-black text-[15px] w-[130px] text-right">
              Pet Owner
            </label>
            <input
              {...register("petowner")}
              type="text"
              placeholder="Owner's name"
              className="w-full h-[3.5vh] text-black border rounded px-2"
            />
          </div>

          <div className="flex items-center w-full mt-3 pb-3">
            <div className="flex items-center w-1/2">
              <label className="text-black text-[15px] w-1/4 text-right pr-3">
                Date
              </label>
              <input
                type="date"
                {...register("date")}
                className="w-3/4 h-[3.5vh] text-black border rounded px-2"
              />
            </div>

            <div className="flex items-center w-1/2 ml-4">
              <label className="text-black text-[15px] w-1/4 text-right pr-3">
                Time
              </label>
              <input
                type="time"
                {...register("time")}
                className="w-3/4 h-[3.5vh] text-black border rounded px-2"
              />
            </div>
          </div>

          <div className="flex gap-2 items-start w-full pb-3">
            <label className="text-black text-[15px] items-start w-[130px] text-right">
              Apt. Notes
            </label>
            <textarea
              {...register("description")}
              placeholder="Appointment Notes"
              className="w-full h-[10vh] text-black border rounded px-2"
            />
          </div>

          <div className="flex justify-end w-full mt-3">
            <button className="bg-violet-800 text-white px-4 py-2 rounded">
              Add Appointment
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default AddAppointment;
