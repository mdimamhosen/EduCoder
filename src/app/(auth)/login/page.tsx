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
    }, 2000);

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
        title="Welcome Back to EduCoder"
        description1="Enhance your skills with expert-led courses on CSE subjects."
        description2="Learn today, excel tomorrow."
        formType="login"
      />
    </div>
  );
};

export default Page;
