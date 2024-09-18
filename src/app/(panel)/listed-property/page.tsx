'use client';

import { Suspense } from "react";
import ListedPropertyPage from "../components/ListedPropertyPage";

export default async function ListedProperty() {
  return (
    <>
      <Suspense>
        <ListedPropertyPage />
      </Suspense>
    </>
  );
}
