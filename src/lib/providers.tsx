'use client';

/**
 * A wrapper component that provides all Providers  like redux, theme to the application
 */
export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    // <NextUIProvider>
    <>{children}</>
    // </NextUIProvider>
  );
}
