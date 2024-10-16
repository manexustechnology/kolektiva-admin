"use client";

import { Suspense } from "react";
import MainForm from "./components/MainForm";

export default function EditProperty() {
  if (typeof window !== "undefined") {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <MainForm />
      </Suspense>
    );
  }
}
