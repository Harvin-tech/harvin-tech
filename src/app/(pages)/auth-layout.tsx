'use client';

import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
}

export function AuthLayout({ children, title }: AuthLayoutProps) {
  return (
    <div className="flex flex-col items-center justify-center pt-6 pb-16 bg-background text-foreground">
      <div className="text-center text-xl md:text-2xl pb-4 font-semibold tracking-tight">
        {title}
      </div>
      <div className="max-w-sm md:max-w-md w-full space-y-8 p-8 bg-card rounded-lg shadow-md border border-border">
        {children}
      </div>
    </div>
  );
}
