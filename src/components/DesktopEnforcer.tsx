import { Monitor } from "lucide-react";

export default function DesktopEnforcer({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Mobile blocker */}
      <div className="lg:hidden min-h-screen flex items-center justify-center p-6 bg-background">
        <div className="text-center max-w-sm">
          <Monitor size={48} className="mx-auto mb-4 text-muted-foreground" />
          <h2 className="font-serif text-xl font-semibold text-foreground mb-2">
            Desktop Required
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The code editor and practice environment require a desktop browser for the best learning experience. Please switch to a computer to continue.
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            Theory lessons are available on all devices.
          </p>
        </div>
      </div>

      {/* Desktop content */}
      <div className="hidden lg:block">
        {children}
      </div>
    </>
  );
}
