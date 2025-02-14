import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getBaseURL } from "../../../apiconfig";
import Loading from "../../../components/loading";
import ErrorPage from "../../../components/error";
import { toast } from "react-hot-toast";
import useAxios from "../../../utils/axios";
import { ImagePlus, Loader2 } from "lucide-react";

const AddProduct = () => {
  const api = useAxios();
  const queryParams = new URLSearchParams(window.location.search);
  const isEdit = queryParams.get("edit") === "true";
  const productId = queryParams.get("productId");
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      price: "",
      description: "",
      categoryID: "",
      image: "",
    },
  });

  if (isEdit) {
    fetch(`${getBaseURL()}/products/${productId}`)
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            setValue("name", data[0].name);
            setValue("price", data[0].price);
            setValue("description", data[0].description);
            setValue("image", data[0].image);
          });
        } else {
          throw new Error("Failed to fetch product data");
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }

  const {
    isLoading,
    error,
    data: categories,
  } = useQuery({
    queryKey: ["categoryData"],
    queryFn: () =>
      fetch(`${getBaseURL()}/categories`).then((res) => res.json()),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData) => {
      const response = await api.post(
        `/products/${isEdit ? `update/${productId}` : `create`}`,
        formData
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Product added successfully");
      window.location.href = "/";
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  if (isLoading) return <Loading />;
  if (error) return <ErrorPage message={error.message} />;

  const onSubmit = (data) => {
    mutate(data);
  };

  const uploadHandler = async (e) => {
    const toastId = toast.loading("Uploading image...");
    try {
      const resSign = await api.post(`${getBaseURL()}/cloudinary-sign`);
      const { signature, timestamp } = await resSign.data;
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("signature", signature);
      formData.append("timestamp", timestamp);
      formData.append("api_key", process.env.REACT_APP_CLOUDINARY_API_KEY);
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (res.status !== 200) {
        throw new Error("Failed to upload image");
      }
      const data = await res.json();
      setValue("image", data.secure_url);
      toast.success("File uploaded successfully", {
        id: toastId,
      });
    } catch (err) {
      toast.error(err.message, {
        id: toastId,
      });
    }
  };

  const imageUrl = watch("image");

  return (
    <div className="bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          {isEdit ? "Edit Product" : "Add New Product"}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {isEdit
            ? "Update your product details"
            : "Add a new product to your store"}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl border border-gray-100 sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  {...register("name", {
                    required: "Product name is required",
                  })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter product name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  {...register("price", {
                    required: "Price is required",
                    validate: {
                      positive: (value) =>
                        value > 0 || "Price must be greater than 0",
                    },
                  })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter price"
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.price.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <div className="mt-1">
                <textarea
                  {...register("description", {
                    required: "Description is required",
                  })}
                  rows={4}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter product description"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <div className="mt-1">
                <select
                  {...register("categoryID", {
                    required: "Category is required",
                  })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.categoryId}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.categoryID && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.categoryID.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Image
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <ImagePlus className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="imageFile"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                    >
                      <span>Upload a file</span>
                      <input
                        id="imageFile"
                        type="file"
                        className="sr-only"
                        onChange={uploadHandler}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>

            {imageUrl && (
              <div className="relative rounded-lg overflow-hidden h-32">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <input
              type="hidden"
              {...register("image", { required: "Image is required" })}
            />
            {errors.image && (
              <p className="mt-1 text-sm text-red-600">
                {errors.image.message}
              </p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : isEdit ? (
                "Update Product"
              ) : (
                "Add Product"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
