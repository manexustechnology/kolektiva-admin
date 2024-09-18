'use client';

import { Suspense } from "react";
import PropertyListingRequestPage from "../components/PropertyListingRequestPage";

export default async function ListedProperty() {
  return (
    <>
      <Suspense>
        <PropertyListingRequestPage />
      </Suspense>
    </>
  );
}
