import React, { useState } from "react";

const LodgingUpdateModal = ({
  isOpen,
  onClose,
  initialLodging,
  onUpdateLodging,
}) => {
  const [lodging, setLodging] = useState(initialLodging);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLodging((prev) => ({
      ...prev,
      [name]: name === "rating" ? (value === "" ? "" : Number(value)) : value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!lodging.lodgingName?.trim()) {
      newErrors.lodgingName = "Lodging name is required";
    } else if (lodging.lodgingName.trim().length < 2) {
      newErrors.lodgingName = "Lodging name must be at least 2 characters";
    }

    if (!lodging.lodgingType?.trim()) {
      newErrors.lodgingType = "Lodging type is required";
    }

    if (!lodging.lodgingDescription?.trim()) {
      newErrors.lodgingDescription = "Lodging description is required";
    } else if (lodging.lodgingDescription.trim().length < 10) {
      newErrors.lodgingDescription =
        "Description must be at least 10 characters";
    }

    if (!lodging.address?.trim()) {
      newErrors.address = "Address is required";
    }

    if (lodging.rating === "" || lodging.rating === null || lodging.rating === undefined) {
      newErrors.rating = "Rating is required";
    } else if (lodging.rating < 1 || lodging.rating > 5) {
      newErrors.rating = "Rating must be between 1 and 5";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onUpdateLodging(lodging);
    }
  };

  // Error message component
  const ErrorMessage = ({ error }) => {
    if (!error) return null;
    return <p className="mt-1 text-sm text-red-500">{error}</p>;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Update Lodging Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Lodging Name
            </label>
            <input
              type="text"
              name="lodgingName"
              value={lodging.lodgingName}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 ${
                errors.lodgingName ? "border-red-500" : "border-gray-300"
              }`}
            />
            <ErrorMessage error={errors.lodgingName} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Lodging Type
            </label>
            <input
              type="text"
              name="lodgingType"
              value={lodging.lodgingType}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 ${
                errors.lodgingType ? "border-red-500" : "border-gray-300"
              }`}
            />
            <ErrorMessage error={errors.lodgingType} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Lodging Description
            </label>
            <textarea
              name="lodgingDescription"
              value={lodging.lodgingDescription}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 ${
                errors.lodgingDescription ? "border-red-500" : "border-gray-300"
              }`}
              rows="3"
            />
            <ErrorMessage error={errors.lodgingDescription} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={lodging.address}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
            />
            <ErrorMessage error={errors.address} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Rating
            </label>
            <input
              type="number"
              name="rating"
              value={lodging.rating}
              onChange={handleChange}
              min="1"
              max="5"
              step="0.1"
              className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 ${
                errors.rating ? "border-red-500" : "border-gray-300"
              }`}
            />
            <ErrorMessage error={errors.rating} />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Update Lodging
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LodgingUpdateModal;