'use client';

import { Suspense } from "react";
import PropertyListingRequestPage from "../components/PropertyListingRequestPage";

export default function ListedProperty() {
  return (
    <>
      <Suspense>
        <PropertyListingRequestPage />
      </Suspense>
    </>
  );
}
