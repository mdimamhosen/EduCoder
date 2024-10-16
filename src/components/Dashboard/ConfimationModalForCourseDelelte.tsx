import IconBtn from "../common/IconBtn";
import React from "react";

export default function ConfirmationModalForCourseDelete({
  modalData,
}: {
  modalData: {
    text1: string;
    text2: string;
    btn1Text: string;
    btn2Text: string;
    btn1Handler: () => void;
    btn2Handler: () => void;
  };
}) {
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="w-11/12 max-w-[350px] rounded-lg border border-gray-600 bg-gray-800 p-6">
        <p className="text-2xl font-semibold text-gray-300">
          {modalData?.text1}
        </p>
        <p className="mt-3 mb-5 leading-6 text-gray-400">{modalData?.text2}</p>
        <div className="flex items-center gap-x-4">
          <IconBtn
            onclick={modalData?.btn1Handler}
            text={modalData?.btn1Text}
          />
          <button
            className="cursor-pointer rounded-md bg-gray-600 py-[8px] px-[20px] font-semibold text-gray-300"
            onClick={modalData?.btn2Handler}
          >
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  );
}
