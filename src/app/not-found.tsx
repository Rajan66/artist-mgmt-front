import Link from "next/link";

import { ArrowLeft, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="relative mb-8">
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <MapPin className="w-64 h-64 text-foreground" strokeWidth={1} />
        </div>
        <h1 className="text-9xl font-extrabold tracking-tight text-foreground relative z-10">
          404
        </h1>
      </div>

      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
        Page not found
      </h2>

      <p className="mt-2 text-lg text-primary opacity-90 max-w-md mb-8">
        Sorry, we couldn't find the page you're looking for. It might have been
        moved or doesn't exist.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild size="lg" variant="outline">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>
        </Button>
      </div>
    </div>
  );
}
