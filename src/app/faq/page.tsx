import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function FAQ() {
  const faqs = [
    {
      question: "What is AI Marketplace?",
      answer:
        "AI Marketplace is a platform where you can discover, purchase, and deploy cutting-edge AI agents designed to transform your workflow and boost productivity. Our marketplace offers a wide range of AI agents for various purposes, from content creation to data analysis.",
    },
    {
      question: "How do I purchase an AI agent?",
      answer:
        "To purchase an AI agent, you need to create an account, browse our marketplace, select the agent you want, add it to your cart, and complete the checkout process using our secure payment system. Once your purchase is complete, you'll have immediate access to download and use your AI agent.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. All transactions are processed securely through our payment gateway.",
    },
    {
      question: "Can I get a refund if I'm not satisfied with my purchase?",
      answer:
        "Yes, we offer a 30-day money-back guarantee on all AI agents. If you're not satisfied with your purchase for any reason, you can request a refund within 30 days of the purchase date.",
    },
    {
      question: "How do I download my purchased AI agents?",
      answer:
        "After purchasing an AI agent, you can download it from your 'My Purchases' page in your account dashboard. The agents are available in both PDF and JSON formats for maximum flexibility.",
    },
    {
      question: "Do I need technical knowledge to use the AI agents?",
      answer:
        "The level of technical knowledge required depends on the specific agent. Some agents are designed to be user-friendly and require minimal technical knowledge, while others may require more advanced skills. Each agent listing includes information about the technical requirements.",
    },
    {
      question: "Can I use the AI agents for commercial purposes?",
      answer:
        "Yes, once you purchase an AI agent, you can use it for both personal and commercial purposes, subject to the specific license terms provided with each agent.",
    },
    {
      question: "Do you offer customer support?",
      answer:
        "Yes, we provide customer support via email at support@aimarketplace.com. Our support team is available to assist you with any questions or issues you may have regarding your purchases or the use of our platform.",
    },
    {
      question: "Are updates included with my purchase?",
      answer:
        "Yes, when you purchase an AI agent, you receive access to all future updates for that agent at no additional cost. You'll be notified when updates are available, and you can download them from your 'My Purchases' page.",
    },
    {
      question: "Is my data secure when using your AI agents?",
      answer:
        "We take data security very seriously. Our AI agents are designed with privacy and security in mind. However, the specific data handling practices may vary depending on the agent. We recommend reviewing the privacy information provided with each agent before use.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Frequently Asked Questions
        </h1>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-cyan-500/50 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gray-900 border border-gray-800 rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold mb-3">
              Still have questions?
            </h3>
            <p className="text-gray-300 mb-4">
              Our support team is here to help you with any other questions you
              might have.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg hover:opacity-90 transition-all text-white font-medium"
            >
              Contact Us
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
