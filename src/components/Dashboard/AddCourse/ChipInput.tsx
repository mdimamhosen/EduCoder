import { RootState } from "@/redux/reducer";
import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";
export default function ChipInput({
  label,
  name,
  placeholder,
  register,
  errors,
  setValue,
  getValues,
}: {
  label: string;
  name: string;
  placeholder: string;
  register?: any;
  errors?: any;
  setValue?: any;
  getValues?: any;
}) {
  const { editCourse, course } = useSelector(
    (state: RootState) => state.course
  );

  const [chips, setChips] = useState<string[]>([]);

  useEffect(() => {
    if (editCourse) {
      setChips(course?.tag || []);
    }
    register(name, {
      required: true,
      validate: (value: string[]) => value.length > 0,
    });
  }, []);

  useEffect(() => {
    setValue(name, chips);
  }, [chips]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      const chipValue = (event.target as HTMLInputElement).value.trim();
      if (chipValue && !chips.includes(chipValue)) {
        const newChips = [...chips, chipValue];
        setChips(newChips);
        (event.target as HTMLInputElement).value = "";
      }
    }
  };

  const handleDeleteChip = (chipIndex: number) => {
    const newChips = chips.filter((_, index) => index !== chipIndex);
    setChips(newChips);
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm lable-style" htmlFor={name}>
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
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  );
}
