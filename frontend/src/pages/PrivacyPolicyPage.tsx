export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-bgPrimary text-textPrimary">
      <div className="mx-auto max-w-5xl p-8">

        <h1 className="mt-6 text-4xl font-bold">
          Privacy Policy
        </h1>

        <p className="mt-2 text-sm text-gray-400">
          Last updated: July 2026
        </p>

        <div className="mt-10 space-y-10">

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              1. Introduction
            </h2>

            <p className="text-gray-300 leading-8">
              Welcome to Parchís Online.
              This Privacy Policy explains how personal information is
              collected, stored and used while using this application.
              The project has been developed as an academic project at
              42 Madrid and is intended for educational purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              2. Information We Collect
            </h2>

            <p className="text-gray-300 leading-8 mb-4">
              Depending on how you use the application, the following
              information may be stored:
            </p>

            <ul className="list-disc pl-8 space-y-2 text-gray-300">
              <li>Username.</li>
              <li>Email address.</li>
              <li>Encrypted password.</li>
              <li>Profile avatar.</li>
              <li>Friend relationships.</li>
              <li>Match history.</li>
              <li>Game statistics.</li>
              <li>Messages sent through the lobby chat.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              3. How We Use Your Information
            </h2>

            <p className="text-gray-300 leading-8 mb-4">
              The collected information is only used to provide the
              services offered by the application, including:
            </p>

            <ul className="list-disc pl-8 space-y-2 text-gray-300">
              <li>User authentication.</li>
              <li>Creating multiplayer matches.</li>
              <li>Displaying player profiles.</li>
              <li>Managing friends.</li>
              <li>Showing online status.</li>
              <li>Saving match history and statistics.</li>
              <li>Displaying chat messages.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              4. Data Security
            </h2>

            <p className="text-gray-300 leading-8">
              Reasonable technical measures are implemented to protect
              user information. Passwords are never stored in plain text
              and authenticated users can only access resources
              permitted by the application. HTTPS is used to protect
              communications between the browser and the server.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              5. Information Sharing
            </h2>

            <p className="text-gray-300 leading-8">
              Personal information is never sold or shared with third
              parties. Other players may only see the information that
              is necessary for the application to function correctly,
              such as usernames, avatars, public game statistics and
              online presence.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              6. Cookies and Local Storage
            </h2>

            <p className="text-gray-300 leading-8">
              The application may use browser storage or authentication
              tokens to keep users signed in and improve the user
              experience. No advertising or tracking cookies are used.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              7. User Rights
            </h2>

            <p className="text-gray-300 leading-8 mb-4">
              Users can:
            </p>

            <ul className="list-disc pl-8 space-y-2 text-gray-300">
              <li>Update their profile information.</li>
              <li>Change their avatar.</li>
              <li>Review their match history.</li>
              <li>Manage their friends list.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              8. Data Retention
            </h2>

            <p className="text-gray-300 leading-8">
              User information remains stored while the account exists
              and is only retained for the normal operation of the
              application. Data may be removed if the project database
              is reset as part of academic development or testing.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              9. Changes to this Policy
            </h2>

            <p className="text-gray-300 leading-8">
              This Privacy Policy may be updated whenever the project
              evolves or new features are implemented. Users are
              encouraged to review this page periodically.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              10. Contact
            </h2>

            <p className="text-gray-300 leading-8">
              Questions regarding this Privacy Policy may be directed to
              the development team responsible for this academic project
              at 42 Madrid.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}