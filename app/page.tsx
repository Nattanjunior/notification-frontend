'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/analytics');
  }, [router]);

  return (
    <div className="flex-1 flex items-center justify-center bg-background text-muted-foreground">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <span className="text-sm font-medium animate-pulse">Redirecting to Analytics...</span>
      </div>
    </div>
  );
}
