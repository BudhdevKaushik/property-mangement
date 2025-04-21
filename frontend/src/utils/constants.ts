export const categoryOptions = [
  { value: "", label: "All" },
  { value: "Residential", label: "Residential" },
  { value: "Commercial", label: "Commercial" },
  { value: "Plot", label: "Plot" },
  { value: "Other", label: "Other" },
];

export const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
export const IMAGE_URL = API_URL + "/public/property/";
