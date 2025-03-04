import BasicForm from '@/components/form';
import react from 'react';
import { Suspense } from "react";

export default async function Page() {
    

    <Suspense fallback={<div>Loading...</div>}>
      <BasicForm />
    </Suspense>
}