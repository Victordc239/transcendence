export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-bgPrimary text-textPrimary">
      <div className="mx-auto max-w-5xl p-8">
        <h1 className="mt-6 text-4xl font-bold">
          Terms of Service
        </h1>

        <p className="mt-2 text-sm text-gray-400">
          Last updated: July 2026
        </p>

        <div className="mt-10 space-y-10">

          <section>
            <h2 className="mb-3 text-2xl font-semibold">
              1. Acceptance of Terms
            </h2>

            <p className="leading-8 text-gray-300">
              By creating an account or using Parchís Online, you agree
              to comply with these Terms of Service. If you do not agree
              with these terms, you should stop using the application.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold">
              2. About the Project
            </h2>

            <p className="leading-8 text-gray-300">
              Parchís Online is a multiplayer web application developed
              as an academic project at 42 Madrid. The application is
              intended for educational purposes and may change,
              temporarily become unavailable or be reset during
              development.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold">
              3. User Accounts
            </h2>

            <p className="leading-8 text-gray-300 mb-4">
              Users are responsible for the information associated with
              their accounts. Each user agrees to:
            </p>

            <ul className="list-disc pl-8 space-y-2 text-gray-300">
              <li>Provide accurate registration information.</li>
              <li>Keep login credentials confidential.</li>
              <li>Be responsible for all activity performed using their account.</li>
              <li>Respect other users while using the platform.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold">
              4. Fair Play
            </h2>

            <p className="leading-8 text-gray-300 mb-4">
              Players are expected to participate fairly in every match.
              The following behaviour is prohibited:
            </p>

            <ul className="list-disc pl-8 space-y-2 text-gray-300">
              <li>Cheating or exploiting software bugs.</li>
              <li>Modifying the client to gain an unfair advantage.</li>
              <li>Attempting to manipulate game results.</li>
              <li>Using automated tools or bots.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold">
              5. Community Rules
            </h2>

            <p className="leading-8 text-gray-300 mb-4">
              Users must behave respectfully while interacting with
              others through the application.
            </p>

            <ul className="list-disc pl-8 space-y-2 text-gray-300">
              <li>No harassment or abusive language.</li>
              <li>No spam or advertising.</li>
              <li>No impersonation of other users.</li>
              <li>No offensive or illegal content.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold">
              6. Intellectual Property
            </h2>

            <p className="leading-8 text-gray-300">
              The source code, interface design and original assets of
              this project are the work of its development team. Any
              third-party libraries, icons or resources remain the
              property of their respective owners.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold">
              7. Availability
            </h2>

            <p className="leading-8 text-gray-300">
              Since this application is an academic project, continuous
              availability is not guaranteed. Maintenance, updates or
              database resets may occur without prior notice.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold">
              8. Limitation of Liability
            </h2>

            <p className="leading-8 text-gray-300">
              The application is provided for educational purposes.
              Although reasonable efforts are made to ensure stability
              and security, the development team cannot guarantee that
              the service will always operate without interruptions or
              errors.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold">
              9. Termination
            </h2>

            <p className="leading-8 text-gray-300">
              Access to the application may be restricted or suspended
              if a user violates these Terms of Service or intentionally
              disrupts the normal operation of the platform.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold">
              10. Changes to These Terms
            </h2>

            <p className="leading-8 text-gray-300">
              These Terms of Service may be updated whenever new
              functionality is added or project requirements change.
              Continued use of the application constitutes acceptance of
              the latest version.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold">
              11. Contact
            </h2>

            <p className="leading-8 text-gray-300">
              Questions regarding these Terms of Service may be directed
              to the development team responsible for this academic
              project at 42 Madrid.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}