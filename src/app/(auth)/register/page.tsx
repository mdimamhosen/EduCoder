"use client";
import Template from "@/components/Authentication/Template";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const { data: session, status } = useSession();
  const token = session?.user;
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      if (token) {
        router.replace("/");
      } else {
        setLoading(false);
      }
    }, 1500);

    return () => clearTimeout(delayTimer);
  }, [token, router]);

  if (status === "loading" || loading) {
    return (
      <div className="w-screen min-h-[calc(100vh-3.5rem)] flex bg-slate-800 justify-center items-center text-gray-200 font-semibold text-lg">
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div>
      <Template
        title="Unlock Your Future with EduCoder"
        description1="Master Computer Science & Engineering subjects with our expertly designed courses."
        description2="Join EduCoder to gain the skills needed to excel in the tech-driven world."
        formType="signup"
      />
    </div>
  );
};

export default Page;
