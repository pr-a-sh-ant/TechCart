import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { Range } from "react-range";
import { getBaseURL } from "../apiconfig";
import Card from "../components/card";
import Loading from "../components/loading";
import ErrorPage from "../components/error";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const MIN_PRICE = 0;
  const MAX_PRICE = 1000000;
  const STEP = 1000;

  const [tempPriceRange, setTempPriceRange] = useState([
    parseInt(searchParams.get("minPrice") || MIN_PRICE),
    parseInt(searchParams.get("maxPrice") || MAX_PRICE),
  ]);

  const [priceRange, setPriceRange] = useState([...tempPriceRange]);

  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "",
    search: searchParams.get("search") || "",
  });

  const [searchInput, setSearchInput] = useState(filters.search);

  const {
    isLoading: isLoadingProducts,
    error: productsError,
    data: products,
  } = useQuery({
    queryKey: [
      "productData",
      { ...filters, minPrice: priceRange[0], maxPrice: priceRange[1] },
    ],
    queryFn: () => {
      const queryParams = new URLSearchParams({
        ...filters,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
      });
      return fetch(`${getBaseURL()}/products?${queryParams.toString()}`).then(
        (res) => res.json()
      );
    },
  });

  console.log(products);

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      fetch(`${getBaseURL()}/categories`).then((res) => res.json()),
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchBlur = () => {
    setFilters((prev) => ({ ...prev, search: searchInput }));
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      e.target.blur();
    }
  };

  const handlePriceRangeChange = (values) => {
    setTempPriceRange(values);
  };

  const handlePriceRangeBlur = () => {
    setPriceRange(tempPriceRange);
  };

  const resetFilters = () => {
    setPriceRange([MIN_PRICE, MAX_PRICE]);
    setFilters({
      category: "",
      search: "",
    });
    setSearchInput("");
  };

  useEffect(() => {
    const newSearchParams = new URLSearchParams({
      ...filters,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    });
    setSearchParams(newSearchParams);
  }, [filters, priceRange, setSearchParams]);

  if (isLoadingProducts || isLoadingCategories)
    return <Loading variant="dots" size="large" fullScreen={true} />;

  if (productsError) return <ErrorPage message={productsError} />;

  return (
    <div className="container mx-auto p-6">
      <div className="flex gap-6">
        {/* Left Sidebar Filters */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-white p-4 rounded-lg shadow sticky top-6">
            <h2 className="text-xl font-semibold mb-6">Filters</h2>

            {/* Price Range Slider */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Price Range: Rs.{tempPriceRange[0]} - Rs.{tempPriceRange[1]}
              </label>
              <div className="px-2 py-4">
                <Range
                  values={tempPriceRange}
                  step={STEP}
                  min={MIN_PRICE}
                  max={MAX_PRICE}
                  onChange={handlePriceRangeChange}
                  onFinalChange={handlePriceRangeBlur}
                  renderTrack={({ props, children }) => (
                    <div
                      {...props}
                      className="h-2 w-full bg-gray-200 rounded-full"
                    >
                      <div
                        className="h-2 bg-blue-500 rounded-full"
                        style={{
                          position: "absolute",
                          left: `${(tempPriceRange[0] / MAX_PRICE) * 100}%`,
                          right: `${100 - (tempPriceRange[1] / MAX_PRICE) * 100}%`,
                        }}
                      />
                      {children}
                    </div>
                  )}
                  renderThumb={({ props }) => (
                    <div
                      {...props}
                      className="h-5 w-5 rounded-full bg-blue-600 shadow focus:outline-none hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="w-full p-2 border rounded"
              >
                <option value="">All Categories</option>
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <input
                type="text"
                name="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onBlur={handleSearchBlur}
                onKeyUp={handleSearchKeyPress}
                className="w-full p-2 border rounded"
                placeholder="Search products..."
              />
            </div>

            {/* Reset Filters Button */}
            <button
              onClick={resetFilters}
              className="w-full bg-gray-100 text-gray-600 px-4 py-2 rounded hover:bg-gray-200"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-6">Our Products</h1>
          {products?.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              No products found matching your filters
            </div>
          ) : (
            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
              {products?.map((product) => (
                <Card key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
