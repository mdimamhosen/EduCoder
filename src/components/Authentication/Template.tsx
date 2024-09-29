import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function Template({
  title,
  description1,
  description2,
  formType,
}: {
  title: string;
  description1: string;
  description2: string;

  formType: string;
}) {
  //   const { loading } = useSelector((state) => state.auth);
  const loading = false;

  return (
    <div className="grid min-h-[calc(100vh-3rem)] bg-slate-900 place-items-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="mx-auto flex w-11/12 max-w-maxContent   border-white flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">
          <div className="mx-auto   py-4 px-6 rounded-xl max-w-[470px]  ">
            <h1 className=" text-2xl md:text-[1.875rem] font-semibold leading-[2.374rem] text-gray-300">
              {title}
            </h1>
            <p className="mt-4 text-xs md:text-sm leading-[1.625rem]">
              <span className="text-gray-300">{description1}</span>{" "}
              <span className="font-edu-sa font-bold italic text-yellow-400">
                {description2}
              </span>
            </p>
            {formType === "signup" ? <SignupForm /> : <LoginForm />}
          </div>
        </div>
      )}
    </div>
  );
}
export default Template;
