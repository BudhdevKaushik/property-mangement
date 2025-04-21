"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Property } from "@/types/common.types";
import { IMAGE_URL } from "@/utils/constants";
import { useAppDispatch } from "@/hooks/redux";
import { FiEdit, FiTrash2, FiEye } from "react-icons/fi";
import { useDeleteProperty } from "@/hooks/useProperties";
import {
  setFormModal,
  setFormMode,
  setPropertyId,
} from "@/store/propertySlice";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const [src, setSrc] = useState("");
  const dispatch = useAppDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const deleteMutation = useDeleteProperty();

  useEffect(() => {
    if (property.image) {
      setSrc(IMAGE_URL + property.image);
    } else {
      setSrc("/management.png");
    }
  }, [property.image]);

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("id", id);
    await deleteMutation.mutateAsync(id);
  };

  const handleEdit = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(setPropertyId(id));
    dispatch(setFormModal(true));
    dispatch(setFormMode("edit"));
  };

  return (
    <div
      className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-48 relative">
        <Image
          fill
          alt={property.title}
          className="object-cover"
          src={src || "/management.png"}
          onError={() => setSrc("/management.png")}
        />

        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center gap-4 transition-opacity">
            <Link
              href={`/properties/${property._id}`}
              className="text-white hover:text-blue-300 transition-colors"
            >
              <FiEye
                size={24}
                className="hover:scale-110 transition-transform"
              />
            </Link>

            <button
              onClick={(e) => handleEdit(e, property._id)}
              className="text-white hover:text-yellow-300 transition-colors"
            >
              <FiEdit
                size={24}
                className="hover:scale-110 transition-transform"
              />
            </button>

            <button
              onClick={(e) => handleDelete(e, property._id)}
              className="text-white hover:text-red-300 transition-colors"
            >
              <FiTrash2
                size={24}
                className="hover:scale-110 transition-transform"
              />
            </button>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
        <p className="text-gray-600 mb-2">{property.category}</p>
        <p className="text-lg font-bold mb-4">
          ${property.price.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default PropertyCard;
