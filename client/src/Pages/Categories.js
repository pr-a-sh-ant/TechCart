import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getBaseURL } from "../apiconfig";
import { Link } from "react-router-dom";

const Categories = () => {
  // Fetch categories using useQuery
  const {
    isLoading: isLoadingCategories,
    error: errorCategories,
    data: categories,
  } = useQuery({
    queryKey: ["categoryData"],
    queryFn: () =>
      fetch(`${getBaseURL()}/categories`).then((res) => res.json()),
  });

  // Handle loading state
  if (isLoadingCategories) {
    return <div>Loading categories...</div>;
  }

  // Handle error state
  if (errorCategories) {
    return <div>Error fetching categories: {errorCategories.message}</div>;
  }

  return (
    <div className="p-4 min-h-[58vh]">
      <h1 className="text-xl sm:text-3xl font-bold mb-4">Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categories?.map((category) => {
          return (
            <>
              <div className="relative overflow-hidden rounded-lg shadow-md group cursor-pointer transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
                <Link to={`/products?category=${category.name}`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0 z-10" />
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full object-cover  h-[48] transition-transform duration-300 ease-in-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-end p-6 text-white">
                    <h3 className="text-xl font-semibold mb-2">
                      {category.name}
                    </h3>
                  </div>
                </Link>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
