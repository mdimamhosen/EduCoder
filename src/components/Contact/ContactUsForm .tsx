"use client";
import React, { useState } from "react";
import CountryCode from "../../../public/Assets/JSON/CountryCode.json";
import toast from "react-hot-toast"; // Ensure you have this for notifications

interface ContactFormData {
  firstname: string;
  lastname: string;
  email: string;
  phoneNo: string;
  message: string;
  countrycode: string;
}

interface FormErrors {
  firstname?: string;
  lastname?: string;
  email?: string;
  phoneNo?: string;
  message?: string;
}

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    firstname: "",
    lastname: "",
    email: "",
    phoneNo: "",
    countrycode: CountryCode[0].code, // Default to first country code
    message: "",
  });

  // Type the errors state using FormErrors interface
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors: FormErrors = {};
    if (!formData.firstname)
      newErrors.firstname = "Please enter your first name.";
    if (!formData.email) newErrors.email = "Please enter your email address.";
    if (!formData.phoneNo)
      newErrors.phoneNo = "Please enter your phone number.";
    if (!formData.message) newErrors.message = "Please enter your message.";
    if (formData.phoneNo.length < 10 || formData.phoneNo.length > 12) {
      newErrors.phoneNo = "Invalid phone number.";
    }
    return newErrors;
  };

  const submitContactForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      // Here, you would typically send the form data to your server
      toast.success("Your message has been sent successfully!");
      setLoading(false);
      // Reset the form
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        phoneNo: "",
        countrycode: CountryCode[0].code,
        message: "",
      });
      setErrors({});
    } catch (error) {
      const errorMessage =
        (error as Error) ||
        "Something went wrong during submission the contact form.";
      console.log("ERROR MESSAGE - ", errorMessage?.message);
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col   gap-7" onSubmit={submitContactForm}>
      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="firstname" className="lable-style">
            First Name
          </label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            placeholder="Enter your first name"
            className="form-style"
            value={formData.firstname}
            onChange={handleChange}
          />
          {errors.firstname && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              {errors.firstname}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="lastname" className="lable-style">
            Last Name
          </label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Enter your last name"
            className="form-style"
            value={formData.lastname}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="lable-style">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email address"
          className="form-style"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            {errors.email}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="phonenumber" className="lable-style">
          Phone Number
        </label>

        <div className="flex gap-5">
          <div className="flex w-[81px] flex-col gap-2">
            <select
              name="countrycode"
              id="countrycode"
              className="form-style"
              value={formData.countrycode}
              onChange={handleChange}
            >
              {CountryCode.map((ele, i) => (
                <option key={i} value={ele.code}>
                  {ele.code} - {ele.country}
                </option>
              ))}
            </select>
          </div>
          <div className="flex w-[calc(100%-90px)] flex-col gap-2">
            <input
              type="number"
              name="phoneNo"
              id="phoneNo"
              placeholder="12345 67890"
              className="form-style"
              value={formData.phoneNo}
              onChange={handleChange}
            />
          </div>
        </div>
        {errors.phoneNo && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            {errors.phoneNo}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="lable-style">
          Message
        </label>
        <textarea
          name="message"
          id="message"
          cols={30}
          rows={7}
          placeholder="Enter your message here"
          className="form-style"
          value={formData.message}
          onChange={handleChange}
        />
        {errors.message && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            {errors.message}
          </span>
        )}
      </div>

      <button
        disabled={loading}
        type="submit"
        className={`rounded-md bg-yellow-400 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]
         ${
           !loading &&
           "transition-all duration-200 hover:scale-95 hover:shadow-none"
         }
         disabled:bg-gray-800 sm:text-[16px] `}
      >
        Send Message
      </button>
    </form>
  );
};

export default ContactUsForm;
