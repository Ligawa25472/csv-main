export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About MNA Accounting</h1>
          <p className="text-xl text-gray-300">Professional accountancy services you can trust</p>
        </div>
      </section>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            MNA Accounting Ltd is a dedicated accountancy practice providing expert bookkeeping, tax, and compliance services to businesses and self-employed individuals across the UK.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Founded with a commitment to delivering high-quality accounting services at competitive prices, we combine professional expertise with modern technology to provide efficient, reliable support.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            As an AAT-licensed practice with AML supervision and professional indemnity insurance, you can trust us to handle your accounts with care and expertise.
          </p>
        </div>
      </section>
    </div>
  );
}
