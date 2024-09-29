// import { useSelector } from "react-redux";

import HighlightText from "../Core/HighlightText";

// import frameImg from "../../../assets/Images/frame.png"
// import LoginForm from "./LoginForm";
// import SignupForm from "./SignupForm";

function Template({
  title,
  description1,
  description2,
  image,
  formType,
}: {
  title: string;
  description1: string;
  description2: string;
  image: string;
  formType: string;
}) {
  //   const { loading } = useSelector((state) => state.auth);
  const loading = false;

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] bg-slate-800 place-items-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="mx-auto flex w-11/12 max-w-maxContent   border-white flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">
          <div className="mx-auto     max-w-[450px]  ">
            <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-gray-200">
              {
                // in the title there is EduCoder word , i want to change the color of EduCoder word to blue
              }
            </h1>
            <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
              <span className="text-gray-300">{description1}</span>{" "}
              <span className="font-edu-sa font-bold italic text-blue-700">
                {description2}
              </span>
            </p>
            {/* {formType === "signup" ? <SignupForm /> : <LoginForm />} */}
          </div>
        </div>
      )}
    </div>
  );
}
export default Template;
