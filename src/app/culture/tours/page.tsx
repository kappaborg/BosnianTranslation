'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ToursRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/tours');
  }, [router]);

  return null;
} 