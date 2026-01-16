import React, { useState } from "react";

const LocationUpdateModal = ({
  isOpen,
  onClose,
  initialLocation,
  onUpdateLocation,
}) => {
  const [location, setLocation] = useState(initialLocation);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocation((prev) => ({
      ...prev,
      [name]: name === "distance" ? (value === "" ? "" : Number(value)) : value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!location.fromLocation?.trim()) {
      newErrors.fromLocation = "From location is required";
    }

    if (!location.toLocation?.trim()) {
      newErrors.toLocation = "To location is required";
    }

    if (
      location.fromLocation?.trim() &&
      location.toLocation?.trim() &&
      location.fromLocation.trim().toLowerCase() ===
        location.toLocation.trim().toLowerCase()
    ) {
      newErrors.toLocation = "To location must be different from From location";
    }

    if (!location.locationDescription?.trim()) {
      newErrors.locationDescription = "Location description is required";
    } else if (location.locationDescription.trim().length < 10) {
      newErrors.locationDescription =
        "Description must be at least 10 characters";
    }

    if (!location.country?.trim()) {
      newErrors.country = "Country is required";
    }

    if (!location.distance || location.distance <= 0) {
      newErrors.distance = "Distance must be greater than 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onUpdateLocation(location);
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
        <h2 className="text-xl font-bold mb-4">Update Location Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              From Location
            </label>
            <input
              type="text"
              name="fromLocation"
              value={location.fromLocation}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 ${
                errors.fromLocation ? "border-red-500" : "border-gray-300"
              }`}
            />
            <ErrorMessage error={errors.fromLocation} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              To Location
            </label>
            <input
              type="text"
              name="toLocation"
              value={location.toLocation}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 ${
                errors.toLocation ? "border-red-500" : "border-gray-300"
              }`}
            />
            <ErrorMessage error={errors.toLocation} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location Description
            </label>
            <textarea
              name="locationDescription"
              value={location.locationDescription}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 ${
                errors.locationDescription ? "border-red-500" : "border-gray-300"
              }`}
              rows="3"
            />
            <ErrorMessage error={errors.locationDescription} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <input
              type="text"
              name="country"
              value={location.country}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 ${
                errors.country ? "border-red-500" : "border-gray-300"
              }`}
            />
            <ErrorMessage error={errors.country} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Distance (km)
            </label>
            <input
              type="number"
              name="distance"
              min="0"
              value={location.distance}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 ${
                errors.distance ? "border-red-500" : "border-gray-300"
              }`}
            />
            <ErrorMessage error={errors.distance} />
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
              Update Location
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default LocationUpdateModal;