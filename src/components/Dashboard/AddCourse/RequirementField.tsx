import React, { useEffect, useState } from "react";
import { RootState } from "@/redux/reducer";
import { useSelector } from "react-redux";

interface RequirementsFieldProps {
  name: string;
  label?: string;
  register: any;
  setValue: any;
  errors: any;
  defaultData?: string[];
}

const RequirementsField: React.FC<RequirementsFieldProps> = ({
  name,
  label,
  register,
  setValue,
  errors,
  defaultData,
}) => {
  const { editCourse, course } = useSelector(
    (state: RootState) => state.course
  );
  const [requirement, setRequirement] = useState<string>("");
  const [requirementsList, setRequirementsList] = useState<string[]>([]);

  useEffect(() => {
    if (defaultData && defaultData.length > 0) {
      //
    }
    if (register) {
      register(name, {
        required: true,
        validate: (value: string[]) => value.length > 0,
      });
    }
  }, [defaultData, editCourse, course, name, register]);

  useEffect(() => {
    if (setValue) {
      setValue(name, requirementsList);
    }
  }, [requirementsList, setValue, name]);

  const handleAddRequirement = () => {
    const trimmedRequirement = requirement.trim();
    if (trimmedRequirement && !requirementsList.includes(trimmedRequirement)) {
      setRequirementsList((prev) => [...prev, trimmedRequirement]);
      setRequirement("");
    }
  };

  const handleRemoveRequirement = (index: number) => {
    setRequirementsList((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm label-style" htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>
      <div className="flex flex-col items-start space-y-2">
        <input
          type="text"
          id={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          className="form-style w-full"
          placeholder="Enter requirement..."
        />
        <button
          type="button"
          onClick={handleAddRequirement}
          className="font-semibold text-yellow-400 bg-gray-900 px-2 py-1 rounded focus:outline-none hover:scale-95 transition-all duration-300 ease-linear"
        >
          Add
        </button>
      </div>
      {requirementsList.length > 0 && (
        <ul className="mt-2 list-inside list-disc">
          {requirementsList.map((req, index) => (
            <li key={index} className="flex items-center text-gray-200">
              <span>{req}</span>
              <button
                type="button"
                className="ml-2 text-xs text-pure-greys-300 bg-gray-700 p-1 rounded focus:outline-none"
                onClick={() => handleRemoveRequirement(index)}
              >
                Clear
              </button>
            </li>
          ))}
        </ul>
      )}
      {errors && errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  );
};

export default RequirementsField;
