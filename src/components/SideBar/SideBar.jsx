import { Link } from "react-router-dom";
import { FiAlignLeft } from "react-icons/fi";
import { FaRegClock, FaRegUser } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdOutlineManageAccounts, MdShoppingBag } from "react-icons/md";
import { TbReport } from "react-icons/tb";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";

function Sidebar() {
  const [open, setOpen] = useState(false);
  return (
    <div className="drawer lg:drawer-open max-w-7xl mx-auto z-40">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content group flex flex-col items-center justify-center">
        <label
          htmlFor="my-drawer-2"
          className="group-hover:bg-[#3bb77e] ml-8 btn bg-transparent border-none drawer-button lg:hidden"
        >
          <FiAlignLeft className="text-2xl text-black group-hover:text-white" />
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="font-custom text-base menu pt-14 lg:pt-4 w-60 lg:rounded-md min-h-full lg:min-h-[100%] bg-white text-black border-r">
          <li onClick={() => setOpen(false)}>
            <Link
              to="/"
              className="text-[#292f46] flex items-center gap-[10px]"
            >
              <MdShoppingBag className="text-[#adb5bd] text-2xl" /> Products
            </Link>
          </li>

          <li>
            <Link
              to="/product-report"
              className="text-[#292f46] flex items-center justify-between mb-2"
              onClick={() => setOpen(!open)}
            >
              <span className="flex items-center gap-[10px]">
                <TbReport className="text-[#adb5bd] text-2xl" /> Report
              </span>
              <span>
                <IoIosArrowDown
                  className={`text-[#adb5bd] transition-transform duration-200 ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </span>
            </Link>
            <ul
              className={`overflow-hidden transition-all duration-200 list-disc list-inside ${
                open ? "max-h-14" : "max-h-0"
              }`}
            >
              <li className="cursor-pointer">All Products</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
