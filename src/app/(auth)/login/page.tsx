import Template from "@/components/Authentication/Template";
import React from "react";

const page = () => {
  return (
    <div>
      <Template
        title="Welcome Back to EduCoder"
        description1="Enhance your skills with expert-led courses on CSE subjects."
        description2="Learn today, excel tomorrow."
        formType="login"
      />
    </div>
  );
};

export default page;
