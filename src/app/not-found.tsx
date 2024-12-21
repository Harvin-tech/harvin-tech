import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 lg:px-8">
      <div className="text-center space-y-6">
        <h1 className="text-6xl md:text-8xl font-bold text-primary">404</h1>
        
        <div className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-semibold">Page Not Found</h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>

        <div className="pt-4">
          <Link href="/">
            <Button className="text-white bg-primary hover:bg-primary/90">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
