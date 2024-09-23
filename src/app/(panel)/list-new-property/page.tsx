"use client";

import { Suspense } from "react";
import PropertyListingForm from "../components/PropertyListingForm";
import PropertyListingRequestPage from "../components/PropertyListingRequestPage";

export default async function ListedProperty() {
  return (
    <>
      <Suspense>
        <PropertyListingForm />
      </Suspense>
    </>
  );
}
