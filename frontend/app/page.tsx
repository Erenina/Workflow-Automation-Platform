export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Workflow Automation
          </h1>
          <p className="text-gray-600">
            İş akışlarınızı otomatikleştirin
          </p>
        </div>

        <div className="space-y-4">
          <a
            href="/auth/login"
            className="block w-full bg-indigo-600 text-white text-center py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            Giriş Yap
          </a>
          <a
            href="/auth/register"
            className="block w-full bg-white text-indigo-600 text-center py-3 px-4 rounded-lg font-medium border-2 border-indigo-600 hover:bg-indigo-50 transition"
          >
            Kayıt Ol
          </a>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <h2 className="font-semibold text-gray-900 mb-3">Özellikler:</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              No-code workflow builder
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              AI destekli otomasyon
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Türk entegrasyonları (e-Fatura, Paraşüt)
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Ücretsiz başlangıç planı
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
