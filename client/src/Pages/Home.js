import React from "react";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/loading";
import ErrorPage from "../components/error";
import { getBaseURL } from "../apiconfig";
import Banner from "../banner.png";
import { Link } from "react-router-dom";
import Card from "../components/card";

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
      fetch(`${getBaseURL()}/categories`).then((res) => res.json()),
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
              <button
                onClick={() => (window.location.href = "/products")}
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Shop Now
              </button>
            </div>
            <div className="md:w-1/2 flex justify-center items-center">
              <img
                src={Banner}
                alt="Latest Technology"
                className="rounded-lg shadow-xl"
                height={400}
                width={400}
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
                <>
                  <Link
                    to={`/products?category=${category.name}`}
                    key={category.categoryId}
                  >
                    <div className="relative h-[300px] overflow-hidden rounded-lg shadow-md group cursor-pointer transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0 z-10" />
                      <img
                        src={category.image}
                        alt={category.name}
                        className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 z-20 flex flex-col items-center justify-end p-6 text-white">
                        <h3 className="text-xl font-semibold mb-2">
                          {category.name}
                        </h3>
                      </div>
                    </div>
                  </Link>
                </>
              );
            })}
          </div>
        )}
      </section>

      {/* Latest Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white mb-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Latest Products</h2>
          <button
            className="flex items-center text-blue-500 hover:text-blue-600"
            onClick={() => {
              window.location.href = "/products";
            }}
          >
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
              <Card key={product.id} product={product} isHome={true} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
