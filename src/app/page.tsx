'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (router) {
      if (data) {
        router.push('/property-listing-request');
      } else {
        router.push('/signin');
      }
    }
  }, [router]);

  return (
    <></>
  );
}
