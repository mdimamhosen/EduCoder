import Template from '@/components/Authentication/Template';
import React from 'react';

const page = () => {
    return (
        <div>

      <Template
        title="Join the millions learning to code with EduCoder for free"
        description1="Build skills for today, tomorrow, and beyond."
        description2="Education to future-proof your career."
        image={"signupImg"}
        formType="signup"
      />
        </div>
    );
};

export default page;
