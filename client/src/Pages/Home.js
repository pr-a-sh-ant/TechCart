import React from "react";
import { ArrowRight, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/loading";
import ErrorPage from "../components/error";
import { getBaseURL } from "../apiconfig";
import Banner from "../banner.png";

const HomePage = () => {
  const {
    isLoading,
    error,
    data: products,
  } = useQuery({
    queryKey: ["productData"],
    queryFn: () => fetch(`${getBaseURL()}/products/`).then((res) => res.json()),
  });

  const {
    isLoading: isLoadingCategories,
    error: errorCategories,
    data: categories,
  } = useQuery({
    queryKey: ["categoryData"],
    queryFn: () =>
      fetch(`${getBaseURL()}/products/category`).then((res) => res.json()),
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-white md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Discover the Latest Tech Innovations
              </h1>
              <p className="text-lg mb-8 text-blue-100">
                Shop the most cutting-edge gadgets and electronics at unbeatable
                prices
              </p>
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Shop Now
              </button>
            </div>
            <div className="md:w-1/2 flex justify-center items-center">
              <img
                src={Banner}
                alt="Latest Technology"
                className="rounded-lg shadow-xl"
                height={150}
                width={300}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Top Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Categories</h2>
        {isLoadingCategories ? (
          <Loading variant="dots" size="small" fullScreen={false} />
        ) : errorCategories ? (
          <ErrorPage />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories?.slice(0, 4).map((category) => {
              return (
                <div className="relative overflow-hidden rounded-lg shadow-md group cursor-pointer transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0 z-10" />
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    width={300}
                    height={200}
                    className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-end p-6 text-white">
                    <h3 className="text-xl font-semibold mb-2">
                      {category.name}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Latest Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Latest Products</h2>
          <button className="flex items-center text-blue-500 hover:text-blue-600">
            View All <ArrowRight className="h-4 w-4 ml-2" />
          </button>
        </div>

        {isLoading ? (
          <Loading variant="dots" size="small" fullScreen={false} />
        ) : error ? (
          <ErrorPage />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products?.slice(0, 8).map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative pb-[100%]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="absolute h-full w-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-blue-500">
                      ${product.price}
                    </span>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Trending Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center mb-8">
          <TrendingUp className="h-6 w-6 text-blue-500 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900">Trending Now</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products
            ?.filter((p) => p.trending)
            ?.slice(0, 4)
            .map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative pb-[100%]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="absolute h-full w-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                    Trending
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-blue-500">
                      ${product.price}
                    </span>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
