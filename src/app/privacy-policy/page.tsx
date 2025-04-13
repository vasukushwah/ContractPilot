import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
        <p>
          Welcome to ContractWingman. We are committed to protecting your
          privacy and handling your data responsibly. This Privacy Policy
          explains how we collect, use, disclose, and protect your
          information when you use our services.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Information We Collect
        </h2>
        <p>
          We collect information to provide and improve our services. The types
          of information we collect include:
        </p>
        <ul className="list-disc list-inside ml-4">
          <li>
            <strong>Personal Information:</strong> When you use our contract
            generation services, you may provide personal information such as
            your name, email address, and other relevant contact details.
          </li>
          <li>
            <strong>Usage Data:</strong> We collect data about how you use our
            services, including the features you use, the contracts you
            generate, and the time spent on our platform.
          </li>
          <li>
            <strong>Generated Contracts:</strong> The content of the contracts
            you generate through our service is also considered data we collect.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          How We Use Your Information
        </h2>
        <p>We use your information to:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Generate and provide contract creation services.</li>
          <li>Improve our services and develop new features.</li>
          <li>Respond to your inquiries and provide customer support.</li>
          <li>Communicate with you about updates and new offerings.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Information Sharing and Disclosure
        </h2>
        <p>
          We do not sell your personal information to third parties. We may
          share your information with trusted service providers who assist us
          in operating our services. We may also disclose information if
          required by law or to protect our rights.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
        <p>
          We implement security measures to protect your data from
          unauthorized access, alteration, or destruction. However, no
          internet-based service can be 100% secure, so we cannot guarantee
          absolute security.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
        <p>
          You have the right to access, correct, or delete your personal
          information. You may also have the right to restrict or object to
          certain processing of your data. Please contact us to exercise
          these rights.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Changes to This Policy
        </h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify
          you of any changes by posting the new policy on this page.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at info@contractwingman.com.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;