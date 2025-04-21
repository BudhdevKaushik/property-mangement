import Property from "../models/property.mjs";

export const findProperty = async (filter, select = "") => {
  return await Property.findOne(filter).select(select);
};

export const findProperties = async (filter = {}, select = "") => {
  return await Property.find(filter).select(select);
};

export const insertProperty = async (values) => {
  return await Property.create(values);
};

export const updateProperty = async (filter, values, options = {}) => {
  return await Property.updateOne(filter, values, options);
};

export const deleteProperty = async (filter) => {
  return await Property.deleteOne(filter);
};
