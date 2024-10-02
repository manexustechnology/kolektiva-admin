"use client";

import { Suspense } from "react";
import PropertyListingForm from "../components/PropertyListingForm";
import PropertyListingRequestPage from "../components/PropertyListingRequestPage";

export default function ListedProperty() {
  if (typeof window !== "undefined") {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <PropertyListingForm />
      </Suspense>
    );
  }
}
