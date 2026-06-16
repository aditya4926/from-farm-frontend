import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100">
      <nav className="px-10 py-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-green-700">
          From Farm 🌾
        </h1>

        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-5 py-2 rounded-xl text-green-700 font-semibold"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-green-600 text-white px-5 py-2 rounded-xl shadow"
          >
            Register
          </Link>
        </div>
      </nav>

      <section className="grid md:grid-cols-2 gap-10 px-10 py-20 items-center">
        <div>
          <h2 className="text-6xl font-bold text-gray-800 leading-tight">
            Fresh Products <br />
            Direct From Farmers
          </h2>

          <p className="text-gray-600 text-lg mt-6 leading-8">
            From Farm connects farmers directly with customers.
            Buy fresh vegetables, fruits, grains and more without middlemen.
          </p>

          <div className="flex gap-4 mt-8">
            <Link
              to="/register"
              className="bg-green-600 text-white px-8 py-4 rounded-xl shadow hover:bg-green-700"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="bg-white text-green-700 px-8 py-4 rounded-xl shadow hover:bg-green-50"
            >
              Login
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-10 text-center">
          <div className="text-9xl mb-6">🚜</div>
          <h3 className="text-3xl font-bold text-green-700">
            Farmer ↔ Customer
          </h3>
          <p className="text-gray-500 mt-4">
            Sell and buy farm products directly with trusted users.
          </p>
        </div>
      </section>

      <section className="px-10 py-16">
        <h2 className="text-4xl font-bold text-center mb-10">
          Why From Farm?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <Feature icon="🌾" title="Direct From Farmer" />
          <Feature icon="💰" title="Better Prices" />
          <Feature icon="📍" title="Nearby Farmers" />
          <Feature icon="💬" title="Real-Time Chat" />
          <Feature icon="🚚" title="Order Tracking" />
          <Feature icon="💳" title="Online Payment" />
        </div>
      </section>

      <footer className="text-center py-6 text-gray-500">
        From Farm © 2026 | Made with ❤️ by Aditya Katkar
      </footer>
    </div>
  );
}

function Feature({ icon, title }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-1 transition">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-800">
        {title}
      </h3>
    </div>
  );
}

export default Home;