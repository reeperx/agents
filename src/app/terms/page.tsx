import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>

        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300 mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
          <p className="text-gray-300 mb-4">
            Welcome to AI Marketplace. These terms and conditions outline the
            rules and regulations for the use of our website and services.
          </p>
          <p className="text-gray-300 mb-4">
            By accessing this website, we assume you accept these terms and
            conditions in full. Do not continue to use AI Marketplace if you do
            not accept all of the terms and conditions stated on this page.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            2. License to Use
          </h2>
          <p className="text-gray-300 mb-4">
            Unless otherwise stated, AI Marketplace and/or its licensors own the
            intellectual property rights for all material on AI Marketplace. All
            intellectual property rights are reserved.
          </p>
          <p className="text-gray-300 mb-4">
            When you purchase an AI agent from our marketplace, you are granted
            a limited, non-exclusive, non-transferable license to use the agent
            for your personal or business purposes, subject to the specific
            license terms provided with each agent.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Restrictions</h2>
          <p className="text-gray-300 mb-4">
            You are specifically restricted from all of the following:
          </p>
          <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
            <li>
              Publishing any website material in any other media without proper
              attribution
            </li>
            <li>
              Selling, sublicensing and/or otherwise commercializing any website
              material
            </li>
            <li>
              Publicly performing and/or showing any website material without
              proper attribution
            </li>
            <li>
              Using this website in any way that is or may be damaging to this
              website
            </li>
            <li>
              Using this website in any way that impacts user access to this
              website
            </li>
            <li>
              Using this website contrary to applicable laws and regulations, or
              in any way may cause harm to the website, or to any person or
              business entity
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">4. User Accounts</h2>
          <p className="text-gray-300 mb-4">
            When you create an account with us, you must provide information
            that is accurate, complete, and current at all times. Failure to do
            so constitutes a breach of the Terms, which may result in immediate
            termination of your account on our Service.
          </p>
          <p className="text-gray-300 mb-4">
            You are responsible for safeguarding the password that you use to
            access the Service and for any activities or actions under your
            password, whether your password is with our Service or a third-party
            service.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Purchases</h2>
          <p className="text-gray-300 mb-4">
            If you wish to purchase any product or service made available
            through the Service ("Purchase"), you may be asked to supply certain
            information relevant to your Purchase including, without limitation,
            your credit card number, the expiration date of your credit card,
            your billing address, and your shipping information.
          </p>
          <p className="text-gray-300 mb-4">
            You represent and warrant that: (i) you have the legal right to use
            any credit card(s) or other payment method(s) in connection with any
            Purchase; and that (ii) the information you supply to us is true,
            correct and complete.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Refunds</h2>
          <p className="text-gray-300 mb-4">
            Our refund policy is as follows: We offer a 30-day money-back
            guarantee on all AI agents purchased through our marketplace. If you
            are not satisfied with your purchase, you may request a refund
            within 30 days of the purchase date.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            7. Changes to Terms
          </h2>
          <p className="text-gray-300 mb-4">
            We reserve the right, at our sole discretion, to modify or replace
            these Terms at any time. If a revision is material we will try to
            provide at least 30 days' notice prior to any new terms taking
            effect. What constitutes a material change will be determined at our
            sole discretion.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Contact Us</h2>
          <p className="text-gray-300 mb-4">
            If you have any questions about these Terms, please contact us at:
          </p>
          <p className="text-gray-300 mb-4">
            Email: terms@aimarketplace.com
            <br />
            Address: 123 AI Street, Tech City, TC 12345
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
