"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { IMAGE_URL } from "@/utils/constants";
import { useProperty } from "@/hooks/useProperties";
import { IoIosArrowRoundBack } from "react-icons/io";

const PropertyDetail: React.FC = () => {
  const { id } = useParams();
  const [src, setSrc] = useState("");
  const { data: property, isLoading, error } = useProperty(id as string);

  useEffect(() => {
    if (property?.image) {
      setSrc(IMAGE_URL + property.image);
    } else {
      setSrc("/management.png");
    }
  }, [property?.image]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading property</div>;

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="mb-6">
        <Link href="/" className="flex items-center ">
          <IoIosArrowRoundBack className="text-2xl font-bold" />
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-4">{property?.title}</h1>
      <p className="text-gray-600 mb-2">Category: {property?.category}</p>
      <p className="text-xl font-bold mb-4">
        Price: ${property?.price.toLocaleString()}
      </p>
      <p className="mb-6">{property?.description}</p>

      {property?.image && (
        <div className="mb-6">
          <Image
            width={0}
            height={0}
            sizes="100vw"
            alt={property?.title}
            src={src || "/management.png"}
            onError={() => setSrc("/management.png")}
            className="w-full h-auto rounded"
          />
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;
