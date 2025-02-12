import { FaRegCopyright } from "react-icons/fa";
function Footer() {
  return (
    <>
      <footer className="fixed bottom-0 bg-violet-800 w-full h-[7vh]">
        <div className="flex max-w-[67rem] mx-auto justify-between items-center h-full">
          <p className="text-white">All contents <FaRegCopyright  className="text-[10px] inline"/> 2025</p>
          <div className="justify-center flex flex-col items-center">
            <p className="text-white">Privacy Policy</p>
            <p className="text-white">Terms of Use</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
