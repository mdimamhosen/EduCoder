import React, { useState } from "react";
import { MdClose } from "react-icons/md";

interface ChipInputProps {
  label: string;
  name: string;
  placeholder: string;
  tags: string[];
  errors: { [key: string]: string | undefined };
  onChange: (value: string[]) => void;
}

export default function ChipInput({
  label,
  name,
  placeholder,
  tags,
  errors,
  onChange,
}: ChipInputProps) {
  const [chips, setChips] = useState<string[]>(tags || []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      const chipValue = event.currentTarget.value.trim();
      if (chipValue && !chips.includes(chipValue)) {
        const newChips = [...chips, chipValue];
        setChips(newChips);
        onChange(newChips); // Update parent component
        event.currentTarget.value = "";
      }
    }
  };

  const handleDeleteChip = (chipIndex: number) => {
    const newChips = chips.filter((_, index) => index !== chipIndex);
    setChips(newChips);
    onChange(newChips); // Update parent component
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
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {errors[name]}
        </span>
      )}
    </div>
  );
}
