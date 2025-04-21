"use client";
import React, { Fragment } from "react";
import Modal from "../common/Modal";
import PropertyForm from "../forms/PropertyForm";
import { setFormModal } from "@/store/propertySlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

const PropertyFormModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { formModal, formMode } = useAppSelector((state) => state.property);
  return (
    <Fragment>
      {formModal && (
        <Modal
          isOpen={formModal}
          onClose={() => dispatch(setFormModal(false))}
          title={formMode === "create" ? "Add Property" : "Edit Property"}
        >
          <PropertyForm />
        </Modal>
      )}
    </Fragment>
  );
};

export default PropertyFormModal;
