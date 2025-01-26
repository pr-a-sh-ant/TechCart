import React from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/loading";
import ErrorPage from "../../../components/error";
import useAxios from "../../../utils/axios";

const AdminUsers = () => {
  const api = useAxios();
  const { isLoading, error, data } = useQuery({
    queryKey: ["usersData"],
    queryFn: async () => {
      const response = await api.get("/user/getuser");
      console.log(response.data);

      return response.data;
    },
  });

  if (isLoading) return <Loading />;

  if (error) return <ErrorPage />;
  return (
    <div>
      <div className="mt-8"></div>
      <h2 className="text-2xl font-bold mb-4">Users</h2>
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
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Edit
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;
