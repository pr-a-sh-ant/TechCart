import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Loading from "../../../components/loading";
import ErrorPage from "../../../components/error";
import useAxios from "../../../utils/axios";
import toast from "react-hot-toast";

const AdminUsers = () => {
  const queryClient = useQueryClient();
  const api = useAxios();
  const { isLoading, error, data } = useQuery({
    queryKey: ["usersData"],
    queryFn: async () => {
      const response = await api.get("/user/getuser");

      return response.data;
    },
  });

  const { mutate: deleteUser } = useMutation({
    mutationFn: async (id) => await api.delete(`/user/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success("User deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: makeAdmin } = useMutation({
    mutationFn: async (id) => await api.delete(`/user/update/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success("User deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onClickDelete = (id) => {
    deleteUser(id);
  };

  const onClickMakeAdmin = (id) => {
    makeAdmin(id);
  };

  return (
    <div>
      <div className="mt-8"></div>
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <ErrorPage />
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {data.map((user) => (
            <div
              key={user.userId}
              className="flex items-center justify-between p-4 border-b"
            >
              <div>
                <h1 className="text-lg font-bold">{user.name}</h1>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => onClickMakeAdmin(user.userId)}
                >
                  Make Admin
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => onClickDelete(user.userId)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
