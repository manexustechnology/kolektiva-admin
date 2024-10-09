"use client";

import { Spinner, Stack } from "@chakra-ui/react";
import { Suspense, useState } from "react";
import MainView from "./components/MainView";

export default function View() {
  const [loading, setLoading] = useState(false);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Stack direction="row" spacing={5}>
          <Spinner size="xl" color="teal.500" thickness="4px" speed="0.7s" />
        </Stack>
      </div>
    );

  return (
    <>
      <Suspense>
        <MainView />
      </Suspense>
    </>
  );
}
