'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const HomeClientPage: React.FC = () => {
  const { data } = useSession();
  const router = useRouter();

  if (data) {
    router.push('/dashboard');
  } else {
    router.push('/signin');
  }

  return (<></>)
};

export default HomeClientPage;