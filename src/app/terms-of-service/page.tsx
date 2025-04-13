// src/app/terms-of-service.tsx
import React from 'react';

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
        <p className="text-gray-700">
          Welcome to ContractWingman! These Terms of Service ("Terms") govern your access to and use of the ContractWingman website and its contract generation services. By using our service, you agree to be bound by these Terms.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">2. Acceptance of Terms</h2>
        <p className="text-gray-700">
          By accessing or using ContractWingman, you confirm that you have read, understood, and agree to be bound by these Terms and all applicable laws and regulations. If you do not agree with any part of these Terms, you are prohibited from using or accessing this site.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">3. Description of Service</h2>
        <p className="text-gray-700">
          ContractWingman provides a contract generation service that allows users to create draft contracts based on the information they provide. These drafts are intended for informational purposes and may require review and modification by a legal professional before being used in any legal context.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">4. User Responsibilities</h2>
        <p className="text-gray-700">
          You agree to provide accurate and complete information when using our service. You are responsible for ensuring that your use of ContractWingman complies with all applicable laws and regulations.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">5. Intellectual Property</h2>
        <p className="text-gray-700">
          All intellectual property rights related to ContractWingman, including the software, design, and content, are owned by us. While you retain ownership of the information you input and the generated contracts, you grant us a license to use and process this information to provide the service.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">6. Disclaimers</h2>
        <p className="text-gray-700">
          ContractWingman makes no warranties about the accuracy, reliability, or suitability of the generated contracts. The contracts are provided "as is" and "as available." It is essential to consult with a legal professional to ensure the contracts meet your specific needs and comply with relevant laws.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">7. Limitation of Liability</h2>
        <p className="text-gray-700">
          ContractWingman shall not be liable for any damages, including direct, indirect, incidental, or consequential damages, arising from the use or inability to use our service, or the reliance on the generated contracts.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">8. Changes to Terms</h2>
        <p className="text-gray-700">
          We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">9. Governing Law</h2>
        <p className="text-gray-700">
          These Terms shall be governed by the laws of [Your Country/State], without regard to its conflict of law provisions.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">10. Contact Us</h2>
        <p className="text-gray-700">If you have any questions about these Terms, please contact us at [Your Contact Email/Form].</p>
      </section>
    </div>
  );
};

export default TermsOfServicePage;