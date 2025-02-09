import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getBaseURL } from "../../../apiconfig";
import Loading from "../../../components/loading";
import ErrorPage from "../../../components/error";
import { toast } from "react-hot-toast";
import useAxios from "../../../utils/axios";

const AddProduct = () => {
  const api = useAxios();
  const queryParams = new URLSearchParams(window.location.search);
  const isEdit = queryParams.get("edit") === "true";
  const productId = queryParams.get("productId");
  const {
    register,
    handleSubmit,
    setValue,
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
    // fetch data and set default values
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
      fetch(`${getBaseURL()}/products/category`).then((res) => res.json()),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData) => {
      const response = await api.post(
        `/products/${isEdit ? `update/${productId}` : "create"}}`,
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

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-5 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>

        <div className="mb-4">
          <label className="block text-gray-700">Product Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            {...register("price", {
              required: "This field is required",
              validate: {
                positive: (value) =>
                  value > 0 || "Price must be greater than 0",
              },
            })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.price && (
            <span className="text-red-500">{errors.price.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            {...register("description", { required: true })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.description && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <select
            {...register("categoryID", { required: true })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.categoryId}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryID && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <div className="mb-6 md:flex">
          <label className="label md:w-1/5" htmlFor="imageFile">
            Upload Image
          </label>
          <div className="md:w-4/5">
            <input
              type="file"
              className="file-input w-full max-w-md"
              id="imageFile"
              onChange={uploadHandler}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Image URL</label>
          <input
            type="text"
            {...register("image", { required: true })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            readOnly
          />
          {errors.imageUrl && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          disabled={isPending}
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
