import React, { useContext } from "react";
import { filerContext } from "../../FilterUser";

const Input = ({ value, title }) => {
  const { handleOnchange, filterShow, setFilterShow } =
    useContext(filerContext);
  return (
    <div className="form-control  my-1">
      <label
        htmlFor={value.toString()}
        className="label cursor-pointer 
      ">
        <span className="label-text">{value.toString()}</span>
        <input
          type="radio"
          value={value}
          onChange={(e) => {
            handleOnchange(title, e.target.value);
          }}
          id={value.toString()}
          name="radio"
          className="radio radio-primary"
        />
      </label>
    </div>
  );
};

export default Input;
