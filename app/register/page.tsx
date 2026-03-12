import { Suspense } from "react";
import RegistrationForm from "@/components/registration/registration-form";

function RegistrationFallback() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center font-mono">
      <div className="inline-block border-2 border-red-primary bg-red-primary/15 px-4 py-2 mb-6">
        <p className="text-red-primary text-xs tracking-wider">
          LOADING_MODULE
        </p>
      </div>

      <h2 className="text-xl md:text-2xl font-bold tracking-wide mb-4">
        INITIALIZING_REGISTRATION
      </h2>

      <div className="w-16 h-1 bg-red-primary mb-6" />

      <p className="text-gray-400 text-sm tracking-wider">
        ESTABLISHING_CONNECTION_WITH_SERVER...
      </p>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <section className="bg-dark-red text-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <Suspense fallback={<RegistrationFallback />}>
          {/* Header */}
          <div className="flex gap-4 mb-12 md:mb-16">
            <div className="w-1 bg-red-primary flex-shrink-0" />
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                REGISTRATION
              </h1>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                ESTABLISH CONNECTION FOR COMPETITIONS,
                <br />
                SPONSORSHIPS AND STRATEGIC ALLIANCES.
              </p>
            </div>
          </div>

          <RegistrationForm />
        </Suspense>
      </div>
    </section>
  );
}