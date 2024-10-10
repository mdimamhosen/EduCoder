export default function IconBtn({
  text,
  onclick,
  children,
  disabled,
  outline = false,
  customClasses,
  type,
}: {
  text: string;
  onclick: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
  outline?: boolean;
  customClasses?: string;
  type?: "button" | "submit" | "reset";
}) {
  return (
    <button
      disabled={disabled}
      onClick={onclick}
      className={`flex items-center ${
        outline ? "border border-yellow-400 bg-transparent" : "bg-yellow-400"
      } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-gray-900 hover:shadow-none hover:scale-95 transition-all duration-300 ${customClasses}`}
      type={type}
    >
      {children ? (
        <>
          <span className={`${outline && "text-yellow-50"}`}>{text}</span>
          {children}
        </>
      ) : (
        text
      )}
    </button>
  );
}
