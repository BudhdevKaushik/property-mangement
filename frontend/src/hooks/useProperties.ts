import { Property, PropertyFormData } from "@/types/common.types";
import axiosInstance from "@/utils/axios";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryKey,
} from "@tanstack/react-query";

const API_URL = "/api/properties";

export const useProperties = (category: string = "") => {
  return useQuery<Property[]>({
    queryKey: ["properties", category],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        category ? `${API_URL}?category=${category}` : API_URL
      );
      return data;
    },
  });
};

export const useProperty = (id: string | undefined) => {
  return useQuery<Property>({
    queryKey: ["property", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`${API_URL}/${id}`);
      return data;
    },
    enabled: !!id,
  });
};

export const useCreateProperty = () => {
  const queryClient = useQueryClient();
  return useMutation<Property, unknown, FormData>({
    mutationFn: (newProperty) =>
      axiosInstance.post(API_URL, newProperty, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] as QueryKey });
    },
  });
};

export const useUpdateProperty = () => {
  const queryClient = useQueryClient();
  return useMutation<
    Property,
    unknown,
    { id: string; updatedProperty: FormData }
  >({
    mutationFn: ({ id, updatedProperty }) =>
      axiosInstance.put(`${API_URL}/${id}`, updatedProperty, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["properties"] as QueryKey });
      queryClient.invalidateQueries({
        queryKey: ["property", variables.id] as QueryKey,
      });
    },
  });
};

export const useDeleteProperty = () => {
  const queryClient = useQueryClient();
  return useMutation<void, unknown, string>({
    mutationFn: (id) => axiosInstance.delete(`${API_URL}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] as QueryKey });
    },
  });
};
