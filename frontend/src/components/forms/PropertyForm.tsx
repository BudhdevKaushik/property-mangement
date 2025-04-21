"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { IMAGE_URL } from "@/utils/constants";
import { PropertyFormData } from "@/types/common.types";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useCreateProperty, useUpdateProperty } from "@/hooks/useProperties";
import {
  setFormModal,
  setFormMode,
  setPropertyId,
} from "@/store/propertySlice";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .required("Price is required")
    .moreThan(0, "Price must be greater than 0"),
  category: Yup.string().required("Category is required"),
  image: Yup.mixed().notRequired(),
});

const initialValues: PropertyFormData = {
  title: "",
  description: "",
  price: 0,
  category: "",
  image: null,
};

const PropertyForm = () => {
  const dispatch = useAppDispatch();
  const createMutation = useCreateProperty();
  const updateMutation = useUpdateProperty();
  const [preview, setPreview] = useState<string | null>(null);
  const { formMode, propertyId, properties } = useAppSelector(
    (state) => state.property
  );

  const propertyToEdit = propertyId
    ? properties.find((p) => p._id === propertyId)
    : null;

  const formik = useFormik<PropertyFormData>({
    initialValues: propertyToEdit
      ? ({
          title: propertyToEdit.title,
          description: propertyToEdit.description,
          price: propertyToEdit.price,
          category: propertyToEdit.category,
          image: null,
        } as PropertyFormData)
      : initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        Object.entries(values).forEach(([key, val]) => {
          if (val !== null && val !== undefined) {
            formData.append(key, val as any);
          }
        });

        if (formMode === "create") {
          await createMutation.mutateAsync(formData as any);
          toast.success("Property created successfully!");
        } else {
          await updateMutation.mutateAsync({
            id: propertyId,
            updatedProperty: formData as any,
          });
          toast.success("Property updated successfully!");
        }
        resetStates();
      } catch (error) {
        toast.error("Error submitting form");
      }
    },
  });

  useEffect(() => {
    if (propertyToEdit?.image) {
      setPreview(
        propertyToEdit.image ? IMAGE_URL + propertyToEdit.image : null
      );
    }
  }, [propertyToEdit]);

  const resetStates = () => {
    setPreview(null);
    dispatch(setPropertyId(""));
    dispatch(setFormModal(false));
    dispatch(setFormMode("create"));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (file) {
      formik.setFieldValue("image", file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    formik.setFieldValue("image", null);
    setPreview(null);
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-4xl mx-auto p-4 md:p-6 space-y-4 md:space-y-6 bg-white rounded-lg shadow-sm"
    >
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Image (Optional)
        </label>
        <div className="flex flex-col space-y-2">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
          {preview && (
            <div className="mt-2 flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <img
                src={preview}
                alt="Image Preview"
                className="w-full sm:w-32 h-32 object-cover rounded-md shadow"
              />
              <div className="flex items-center justify-center">
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="py-1 px-4 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition duration-200 self-start"
                >
                  Remove Image
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          name="title"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title || ""}
          className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {formik.touched.title && formik.errors.title && (
          <p className="text-sm text-red-500">{formik.errors.title}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Price</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500">$</span>
          </div>
          <input
            type="number"
            name="price"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.price || ""}
            className="w-full py-2 px-3 pl-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {formik.touched.price && formik.errors.price && (
          <p className="text-sm text-red-500">{formik.errors.price}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          name="category"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.category || ""}
          className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="" label="Select category" />
          <option value="Residential" label="Residential" />
          <option value="Commercial" label="Commercial" />
          <option value="Plot" label="Plot" />
          <option value="Other" label="Other" />
        </select>
        {formik.touched.category && formik.errors.category && (
          <p className="text-sm text-red-500">{formik.errors.category}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description || ""}
          className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows={4}
        />
        {formik.touched.description && formik.errors.description && (
          <p className="text-sm text-red-500">{formik.errors.description}</p>
        )}
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {formik.isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default PropertyForm;
