import React, { useContext, useRef, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiSolidDownArrow } from "react-icons/bi";
import { filerContext } from "../FilterUser";
import Input from "./Input/Input";
// import "./Button.css";
const Button = ({
  title,
  className,
  lists,
  isActive,
  setActiveFilter,
  users,
}) => {
  const [cng, setCng] = useState(false);
  const [filteusers, setFilterUsers] = useState([]);
  const formRef = useRef();
  const { handleOnchange, filterShow, setFilterShow, submitToFilterProccess } =
    useContext(filerContext);

  // stop bubling
  const handleEventBubling = (e) => {
    e.stopPropagation();
  };
  // Reset form of filter
  const handleReset = () => {
    const form = formRef.current;
    form.reset();
    delete filterShow[title];
    setCng(!cng);
  };
  // submit form of filter
  const handleSubmit = () => {
    const form = formRef.current;
    submitToFilterProccess(filterShow);
    setCng(!cng);
  };
  //
  const handleAllsubmit = () => {
    setActiveFilter(title);
    setFilterShow({});
    submitToFilterProccess("All");
  };

  if (title === "All") {
    //console.log(title);
    return (
      <button
        onClick={handleAllsubmit}
        className={` ${
          (className, isActive && "bg-P-primary")
        } rounded-full relative border-2 py-2 px-8`}
      >
        <div className="flex gap-2 items-center">
          <span>{title}</span>
        </div>
      </button>
    );
  }

  return (
    <div
      className={` ${
        (className, filterShow?.hasOwnProperty(title) && "bg-P-primary")
      }   rounded-full relative border-2 py-2 px-3 cursor-pointer `}
      onClick={() => {
        setActiveFilter(title);
      }}
    >
      <div className="flex gap-2 items-center">
        <span>{title}</span>
        <BiSolidDownArrow />
      </div>

      <div
        onClick={handleEventBubling}
        className={`${
          isActive
            ? "opacity-100  top-[calc(100%+.4rem)]"
            : "opacity-0  top-[calc(100%+.6rem)]"
        }  ${
          isActive ? "visibleP " : "hiddenP "
        } bg-white eq shadow-md rounded border-[1px] text-P-Black absolute z-[10]   left-0  min-w-[400px] p-3`}
      >
        <form
          // onSubmit={handleSubmit}
          ref={formRef}
        >
          <div className="flex">
            <div className="flex-1 text-left max-h-[500px] overflow-y-scroll">
              {lists.map((value, index) => (
                <Input value={value} title={title} key={index} />
              ))}
            </div>
            <span className="pl-2">
              <AiOutlineCloseCircle
                onClick={() => setActiveFilter("")}
                size={24}
                className="cursor-pointer"
              />
            </span>
          </div>
        </form>
        <div className="flex gap-2">
          {filterShow?.hasOwnProperty(title) && (
            <>
              {" "}
              <button
                onClick={handleReset}
                type="reset"
                className="p-2 text-xs font-light rounded-full border-gray-600 border text-gray-600 self-end flex"
              >
                Reset
              </button>
              <button
                onClick={handleSubmit}
                type="submit"
                className="p-2 text-xs font-light rounded-full bg-P-primary text-white self-end flex"
              >
                submit
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Button;
