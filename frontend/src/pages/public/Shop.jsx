import Searchbar from "../../components/Searchbar";
import Cards from "../../components/Cards"; // Generic card reuse kar rahe ho

const Shop = ({ ref }) => {

  const products = [
    {
      id: 1,
      name: "Football",
      price: "₹1500",
      img: "https://plus.unsplash.com/premium_photo-1720433273520-80ff8a59a6f6?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 2,
      name: "Tennis Racket",
      price: "₹4500",
      img: "https://images.unsplash.com/photo-1558594187-6ac6484bf5d4?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 3,
      name: "Cricket Bat",
      price: "₹3500",
      img: "https://plus.unsplash.com/premium_photo-1722086350831-3cc30b7d68a7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 4,
      name: "Shoes",
      price: "₹4500",
      img: "https://images.unsplash.com/photo-1524532787116-e70228437bbe?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
  ];

  return (
    <div ref={ref} className="relative z-30 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 pb-32 mt-20">

        {/* Section Title */}
        <h2 className="text-6xl font-bold text-white mb-10 text-center drop-shadow-lg">
          Shop Module
        </h2>

        {/* Features */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12 text-center">
          <div className="bg-black/40 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:scale-105 hover:bg-black/50 transition duration-300">
            <h3 className="text-lg font-semibold text-white">🛒 Wide Range of Products</h3>
          </div>
          <div className="bg-black/40 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:scale-105 hover:bg-black/50 transition duration-300">
            <h3 className="text-lg font-semibold text-white">💳 Secure Payments</h3>
          </div>
          <div className="bg-black/40 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:scale-105 hover:bg-black/50 transition duration-300">
            <h3 className="text-lg font-semibold text-white">🚚 Fast Delivery</h3>
          </div>
          <div className="bg-black/40 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:scale-105 hover:bg-black/50 transition duration-300">
            <h3 className="text-lg font-semibold text-white">⭐ Top Quality Brands</h3>
          </div>
          <div className="bg-black/40 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:scale-105 hover:bg-black/50 transition duration-300">
            <h3 className="text-lg font-semibold text-white">🏷️ Best Prices</h3>
          </div>
          <div className="bg-black/40 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:scale-105 hover:bg-black/50 transition duration-300">
            <h3 className="text-lg font-semibold text-white">🔄 Easy Returns</h3>
          </div>
        </div>

        {/* Products Section */}
        <div className="w-full sm:flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-semibold text-white mb-6 text-center">
              Products available for you
            </h3>
          </div>
          {/* <div className="mb-5">
            <Searchbar width={"2xl"} customIcon={true} placeholder={'Search products...'} />
          </div> */}
        </div>

        <div className="flex gap-6 overflow-x-auto scrollbar-hide sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible">
          {products.map((product) => (
            <Cards key={product.id} {...product} module={"shop"} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
