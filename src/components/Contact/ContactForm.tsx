import React from "react";
import ContactUsForm from "./ContactUsForm ";
import HighlightText from "../Core/HighlightText";

const ContactForm = () => {
  return (
    <div className="border border-gray-600 bg-slate-900 text-gray-700 rounded-xl p-7 lg:p-14 flex gap-3 flex-col">
      <h1 className="text-4xl leading-10 font-semibold text-gray-200 ">
        Have an Idea? Let&apos;s Bring It to Life Together
      </h1>
      <p className="text-base text-gray-200 font-bold">
        Share your vision and how{" "}
        <span>
          <HighlightText text={"EduCoder"} />
        </span>{" "}
        can help make it a reality.
      </p>

      <div className="mt-7 b">
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactForm;
