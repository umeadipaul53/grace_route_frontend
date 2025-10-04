function PrivacyPolicy() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <details className="mb-4">
        <summary className="cursor-pointer font-semibold">Data Collection</summary>
        <p className="mt-2">We collect basic personal data for account creation.</p>
      </details>
      <details>
        <summary className="cursor-pointer font-semibold">Cookies</summary>
        <p className="mt-2">We use cookies to improve your experience.</p>
      </details>
    </div>
  );
}
export default PrivacyPolicy;