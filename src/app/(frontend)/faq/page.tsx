export default function FAQPage() {
  const faqs = [
    {
      q: "How much does tiling cost?",
      a: "Pricing depends on the size, tile type, surface condition, and complexity of the project. Contact us for a free, detailed quote tailored to your specific needs."
    },
    {
      q: "Do you remove old tiles?",
      a: "Yes, tile removal and surface preparation can be included as part of the project."
    },
    {
      q: "Do you supply tiles?",
      a: "We can recommend suppliers or source tiles for you, depending on your preferences. We are happy to work with tiles you have already purchased."
    },
    {
      q: "Do you install large format tiles?",
      a: "Yes, our team is highly experienced in the specialized installation techniques required for large format and premium tiles."
    },
    {
      q: "How long does a tiling project take?",
      a: "Project duration depends on the size and complexity of the work. A standard bathroom might take 3-5 days, while larger commercial spaces will take longer. We always provide an estimated timeline with your quote."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-slate-900 text-white py-24 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-outfit font-bold mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Got questions? We've got answers.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="space-y-8">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-3">{faq.q}</h3>
                <p className="text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
