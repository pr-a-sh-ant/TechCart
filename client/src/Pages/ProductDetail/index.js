import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCart, Calendar, ChevronRight } from "lucide-react";
import { getBaseURL } from "../../apiconfig";
import useCartService from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { increase } = useCartService();
  const { isAuthenticated, userId } = useAuth();
  const [quantity, setQuantity] = React.useState(1);

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["productDetail", productId],
    queryFn: async () => {
      const response = await fetch(`${getBaseURL()}/products/${+productId}`);
      const data = await response.json();
      return data[0];
    },
  });

  const { data: relatedProducts } = useQuery({
    queryKey: ["relatedProducts", product?.categoryId],
    enabled: !!product?.category,
    queryFn: async () => {
      const response = await fetch(
        `${getBaseURL()}/products?category=${product.category}`
      );
      const data = await response.json();
      return data.filter((p) => p.productId !== product.productId);
    },
  });

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      window.location.href = "/login";
    }
    increase(
      {
        productId: product.productId,
        image: product.image,
        price: product.price,
        name: product.name,
      },
      userId,
      quantity
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {isLoading ? (
        <div className="flex h-screen items-center justify-center">
          <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-blue-600"></div>
        </div>
      ) : error ? (
        <div className="flex h-screen items-center justify-center">
          <div className="text-lg text-red-600">Error loading product</div>
        </div>
      ) : (
        <div className="mx-auto max-w-6xl px-4">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center space-x-2 text-sm text-gray-600">
            <span>Products</span>
            <ChevronRight className="h-4 w-4" />
            <span>{product.category}</span>
            <ChevronRight className="h-4 w-4" />
            <span className="text-blue-600">{product.name}</span>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Product Image */}
            <div className="overflow-hidden rounded-xl bg-white p-6 shadow-lg">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-contain"
              />
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {product.name}
                </h1>
                <span className="mt-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                  {product.category}
                </span>
              </div>

              <div className="space-y-2">
                <p className="text-3xl font-bold text-blue-600">
                  Rs.{product.price}
                </p>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Listed on{" "}
                    {new Date(product.createdDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Description
                </h2>
                <p className="mt-2 text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="space-y-4 border-t border-gray-200 pt-6">
                <div className="flex items-center space-x-4">
                  <label className="font-medium text-gray-700">Quantity:</label>
                  <div className="flex items-center rounded-lg border">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-4 py-2">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex w-full items-center justify-center space-x-2 rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>

          {/* Related Products Section */}
          <div className="mt-16">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              More from {product.category}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts?.length === 0 ? (
                <div>No Other Products in this category.</div>
              ) : (
                relatedProducts?.map((relatedProduct) => (
                  <div
                    key={relatedProduct.productId}
                    className="group cursor-pointer overflow-hidden rounded-lg bg-white p-4 shadow-sm transition-all hover:shadow-lg"
                    onClick={() =>
                      navigate(`/products/${relatedProduct.productId}`)
                    }
                  >
                    <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="mt-4 space-y-2">
                      <h3 className="text-lg font-medium text-gray-900">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-lg font-bold text-blue-600">
                        ${relatedProduct.price}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
