"use client";
import React, { useEffect } from "react";
import { useProperties } from "../hooks/useProperties";
import FilterDropdown from "@/components/common/FilterDropdown";
import PropertyCard from "@/components/cards/PropertyCard";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setFormModal, setProperties } from "@/store/propertySlice";
import PropertyFormModal from "@/components/Modals/PropertyFormModal";
import { categoryOptions } from "@/utils/constants";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { filterCategory, properties } = useAppSelector(
    (state) => state.property
  );
  const { data, isLoading, error } = useProperties(filterCategory);

  useEffect(() => {
    dispatch(setProperties((data as any) || []));
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading properties</div>;

  const handleOpenModal = () => {
    dispatch(setFormModal(true));
  };

  return (
    <div className="container mx-auto p-4">
      <PropertyFormModal />
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-center md:text-left">
          Properties
        </h1>
        <div className="flex flex-col md:flex-row gap-4">
          <FilterDropdown options={categoryOptions as [object]} label="All" />
          <button
            type="button"
            onClick={handleOpenModal}
            className="bg-blue-600 text-white py-1 px-4 rounded hover:bg-blue-700"
          >
            Add Property
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.length ? (
          properties?.map((property) => (
            <PropertyCard key={property._id} property={property as any} />
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-lg font-semibold text-gray-700">
              No Properties Found
            </p>
            <p className="text-sm text-gray-500">
              Please add a property to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
