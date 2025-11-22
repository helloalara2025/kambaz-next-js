"use client";

import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";

import type { RootState } from "@/app/(Kambaz)/store";

type Props = {
  children: ReactNode;
};

const CourseLayout = ({ children }: Props) => {
  const router = useRouter();
  const { cid } = useParams<{ cid: string }>();

  const { courseIds: enrolledCourseIds } = useSelector(
    (state: RootState) => state.enrollments
  );

  const isEnrolled = cid && enrolledCourseIds.includes(cid);

  useEffect(() => {
    if (!cid) return;
    if (!isEnrolled) {
      router.replace("/Dashboard");
    }
  }, [cid, isEnrolled, router]);

  if (!isEnrolled) {
    return null;
  }

  return <>{children}</>;
};

export default CourseLayout;