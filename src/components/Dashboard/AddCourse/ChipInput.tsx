import React, { useEffect, useState } from "react";
import { RootState } from "@/redux/reducer";
import { useSelector } from "react-redux";
import { MdClose } from "react-icons/md";

interface ChipInputProps {
  label: string;
  name: string;
  placeholder: string;
  register?: any;
  errors?: any;
  setValue?: any;
  defaultData?: string[];
}

const ChipInput: React.FC<ChipInputProps> = ({
  label,
  name,
  placeholder,
  register,
  errors,
  setValue,
  defaultData,
}) => {
  const { editCourse, course } = useSelector(
    (state: RootState) => state.course
  );
  const [chips, setChips] = useState<string[]>([]);

  useEffect(() => {
    if (register) {
      register(name, {
        required: true,
        validate: (value: string[]) => value.length > 0,
      });
    }
  }, [defaultData, name, register]);

  useEffect(() => {
    if (setValue) {
      setValue(name, chips);
    }
  }, [chips, name, setValue]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      const chipValue = (event.target as HTMLInputElement).value.trim();
      if (chipValue && !chips.includes(chipValue)) {
        setChips((prevChips) => [...prevChips, chipValue]);
        (event.target as HTMLInputElement).value = ""; // Clear input after adding chip
      }
    }
  };

  const handleDeleteChip = (chipIndex: number) => {
    setChips((prevChips) =>
      prevChips.filter((_, index) => index !== chipIndex)
    );
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm label-style" htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>
      <div className="flex w-full flex-wrap gap-y-2">
        {chips.map((chip, index) => (
          <div
            key={index}
            className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-gray-900"
          >
            {chip}
            <button
              type="button"
              className="ml-2 focus:outline-none"
              onClick={() => handleDeleteChip(index)}
            >
              <MdClose className="text-sm" />
            </button>
          </div>
        ))}
        <input
          id={name}
          name={name}
          type="text"
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          className="form-style w-full"
        />
      </div>
      {errors && errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  );
};

export default ChipInput;
