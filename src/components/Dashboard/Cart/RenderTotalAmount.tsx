import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom"

// import IconBtn from "../../../common/IconBtn"
// import { buyCourse } from "../../../../services/operations/studentFeaturesAPI"
import React from "react";
import { RootState } from "@/redux/reducer";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import IconBtn from "@/components/common/IconBtn";
import axios from "axios";
import { useSession } from "next-auth/react";
import { resetCart } from "@/redux/slices/cartSlice";

export default function RenderTotalAmount() {
  const { total, cart } = useSelector((state: RootState) => state.cart);
  const { data: session } = useSession();
  const userId = session?.user._id;
  const { user } = useSelector((state: RootState) => state.profile);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleBuyCourse = async () => {
    const courses = cart.map((course) => course._id);
    console.log(courses);
    try {
      const response = await axios.post("/api/buy-course-from-cart", {
        userId,
        courseIds: courses,
      });
      if (response.data.success) {
        dispatch(resetCart());
        router.push("/dashboard/enrolled-courses");
        toast.success("Course bought successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Internal server error");
    }
  };

  return (
    <div className="min-w-[280px] rounded-md border-[1px] border-gray-600 bg-gray-800 p-6">
      <p className="mb-1 text-sm font-medium text-gray-300">Total:</p>
      <p className="mb-6 text-3xl font-medium text-yellow-400">₹ {total}</p>
      <IconBtn
        text="Buy Now"
        onclick={handleBuyCourse}
        customClasses="w-full justify-center"
      />
    </div>
  );
}
