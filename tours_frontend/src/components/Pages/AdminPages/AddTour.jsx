import React, { useState } from "react";
import axios from "axios";
import { ChevronRight, ChevronLeft, Upload, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddTour = () => {
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState({
    tourName: "",
    tourDescription: "",
    tourGuide: "",
    startDate: "",
    endDate: "",
    country: "",
    price: "",
    ticketsAvailable: "",
    meals: [],
    activities: [],
    fromLocation: "",
    locationDescription: "",
    toLocation: "",
    distance: "",
    estimatedTravelTime: "",
    lodgingName: "",
    lodgingType: "",
    lodgingDescription: "",
    lodgingAddress: "",
    lodgingRating: "",
    transportName: "",
    transportType: "",
    transportEstimatedTravelTime: "",
    transportDescription: "",
  });
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [errors, setErrors] = useState({});

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: [
        "price",
        "ticketsAvailable",
        "distance",
        "lodgingRating",
      ].includes(name)
         ? value === "" ? "" : Number(value)
        : value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleMealChange = (e) => {
    const meal = e.target.value;
    setUserData((prev) => ({
      ...prev,
      meals: prev.meals.includes(meal)
        ? prev.meals.filter((m) => m !== meal)
        : [...prev.meals, meal],
    }));
    if (errors.meals) {
      setErrors((prev) => ({ ...prev, meals: "" }));
    }
  };

  const handleActivityChange = (e) => {
    const activity = e.target.value;
    setUserData((prev) => ({
      ...prev,
      activities: prev.activities.includes(activity)
        ? prev.activities.filter((a) => a !== activity)
        : [...prev.activities, activity],
    }));
    if (errors.activities) {
      setErrors((prev) => ({ ...prev, activities: "" }));
    }
  };

  // Validation for Step 1: Tour Details
  const validateTourDetails = () => {
    const newErrors = {};

    if (!userData.tourName.trim()) {
      newErrors.tourName = "Tour name is required";
    } else if (userData.tourName.trim().length < 3) {
      newErrors.tourName = "Tour name must be at least 3 characters";
    }

    if (!userData.tourGuide.trim()) {
      newErrors.tourGuide = "Tour guide name is required";
    } else if (userData.tourGuide.trim().length < 2) {
      newErrors.tourGuide = "Tour guide name must be at least 2 characters";
    }

    if (!userData.tourDescription.trim()) {
      newErrors.tourDescription = "Tour description is required";
    } else if (userData.tourDescription.trim().length < 10) {
      newErrors.tourDescription = "Description must be at least 10 characters";
    }

    if (!userData.startDate) {
      newErrors.startDate = "Start date is required";
    } else if (new Date(userData.startDate) < new Date().setHours(0, 0, 0, 0)) {
      newErrors.startDate = "Start date cannot be in the past";
    }

    if (!userData.endDate) {
      newErrors.endDate = "End date is required";
    } else if (userData.startDate && new Date(userData.endDate) <= new Date(userData.startDate)) {
      newErrors.endDate = "End date must be after start date";
    }

    if (!userData.country.trim()) {
      newErrors.country = "Country is required";
    }

    if (!userData.price || userData.price <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (!userData.ticketsAvailable || userData.ticketsAvailable <= 0) {
      newErrors.ticketsAvailable = "Tickets available must be greater than 0";
    }

    if (userData.meals.length === 0) {
      newErrors.meals = "Please select at least one meal";
    }

    if (userData.activities.length === 0) {
      newErrors.activities = "Please select at least one activity";
    }

    if (!image1) {
      newErrors.image1 = "Please upload image 1";
    }

    if (!image2) {
      newErrors.image2 = "Please upload image 2";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validation for Step 2: Location Details
  const validateLocationDetails = () => {
    const newErrors = {};

    if (!userData.fromLocation.trim()) {
      newErrors.fromLocation = "From location is required";
    }

    if (!userData.toLocation.trim()) {
      newErrors.toLocation = "To location is required";
    }

    if (userData.fromLocation.trim() && userData.toLocation.trim() && 
        userData.fromLocation.trim().toLowerCase() === userData.toLocation.trim().toLowerCase()) {
      newErrors.toLocation = "To location must be different from From location";
    }

    if (!userData.distance || userData.distance <= 0) {
      newErrors.distance = "Distance must be greater than 0";
    }

    if (!userData.estimatedTravelTime.trim()) {
      newErrors.estimatedTravelTime = "Estimated travel time is required";
    }

    if (!userData.locationDescription.trim()) {
      newErrors.locationDescription = "Location description is required";
    } else if (userData.locationDescription.trim().length < 10) {
      newErrors.locationDescription = "Description must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validation for Step 3: Lodging Details
  const validateLodgingDetails = () => {
    const newErrors = {};

    if (!userData.lodgingName.trim()) {
      newErrors.lodgingName = "Lodging name is required";
    } else if (userData.lodgingName.trim().length < 2) {
      newErrors.lodgingName = "Lodging name must be at least 2 characters";
    }

    if (!userData.lodgingType) {
      newErrors.lodgingType = "Please select a lodging type";
    }

    if (!userData.lodgingDescription.trim()) {
      newErrors.lodgingDescription = "Lodging description is required";
    } else if (userData.lodgingDescription.trim().length < 10) {
      newErrors.lodgingDescription = "Description must be at least 10 characters";
    }

    if (!userData.lodgingAddress.trim()) {
      newErrors.lodgingAddress = "Lodging address is required";
    }

    if (userData.lodgingRating < 0 || userData.lodgingRating > 5) {
      newErrors.lodgingRating = "Rating must be between 0 and 5";
    }

    if (!userData.lodgingRating && userData.lodgingRating !== 0) {
      newErrors.lodgingRating = "Lodging rating is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validation for Step 4: Transport Details
  const validateTransportDetails = () => {
    const newErrors = {};

    if (!userData.transportName.trim()) {
      newErrors.transportName = "Transport name is required";
    } else if (userData.transportName.trim().length < 2) {
      newErrors.transportName = "Transport name must be at least 2 characters";
    }

    if (!userData.transportType) {
      newErrors.transportType = "Please select a transport type";
    }

    if (!userData.transportEstimatedTravelTime.trim()) {
      newErrors.transportEstimatedTravelTime = "Estimated travel time is required";
    }

    if (!userData.transportDescription.trim()) {
      newErrors.transportDescription = "Transport description is required";
    } else if (userData.transportDescription.trim().length < 10) {
      newErrors.transportDescription = "Description must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle next step with validation
  const handleNextStep = (nextStep) => {
    let isValid = false;

    switch (currentStep) {
      case 1:
        isValid = validateTourDetails();
        break;
      case 2:
        isValid = validateLocationDetails();
        break;
      case 3:
        isValid = validateLodgingDetails();
        break;
      default:
        isValid = true;
    }

    if (isValid) {
      setCurrentStep(nextStep);
      setErrors({});
    }
  };

  const submitData = async (e) => {
    e.preventDefault();

    if (!validateTransportDetails()) {
      return;
    }

    try {
      setLoading(true);
      // Location API
      const locationData = {
        fromLocation: userData.fromLocation,
        toLocation: userData.toLocation,
        distance: userData.distance,
        locationDescription: userData.locationDescription,
        estimatedTravelTime: userData.estimatedTravelTime,
        country: userData.country,
      };
      const locationResponse = await axios.post(
        `${baseUrl}/admin/locations`,
        locationData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Lodging API
      const lodgingData = {
        lodgingName: userData.lodgingName,
        lodgingType: userData.lodgingType,
        lodgingDescription: userData.lodgingDescription,
        address: userData.lodgingAddress,
        rating: userData.lodgingRating,
      };
      const lodgingResponse = await axios.post(
        `${baseUrl}/admin/lodgings`,
        lodgingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Transport API
      const transportData = {
        transportName: userData.transportName,
        transportType: userData.transportType,
        estimatedTravelTime: userData.transportEstimatedTravelTime,
        transportDescription: userData.transportDescription,
      };
      const transportResponse = await axios.post(
        `${baseUrl}/admin/transports`,
        transportData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Tour API
      const tourData = {
        tourName: userData.tourName,
        tourDescription: userData.tourDescription,
        tourGuide: userData.tourGuide,
        startDate: userData.startDate,
        endDate: userData.endDate,
        meals: userData.meals,
        activities: userData.activities,
        price: userData.price,
        ticketsAvailable: userData.ticketsAvailable,
      };

      const formData = new FormData();
      formData.append("tour", JSON.stringify(tourData));
      if (image1) formData.append("image1", image1[0]);
      if (image2) formData.append("image2", image2[0]);

      const tourResponse = await axios.post(
        `${baseUrl}/admin/tours`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Reset form
      setUserData({
        tourName: "",
        tourDescription: "",
        tourGuide: "",
        startDate: "",
        endDate: "",
        country: "",
        price: "",
        ticketsAvailable: "",
        meals: [],
        activities: [],
        fromLocation: "",
        locationDescription: "",
        toLocation: "",
        distance: "",
        estimatedTravelTime: "",
        lodgingName: "",
        lodgingType: "",
        lodgingDescription: "",
        lodgingAddress: "",
        lodgingRating: "",
        transportName: "",
        transportType: "",
        transportEstimatedTravelTime: "",
        transportDescription: "",
      });
      setImage1(null);
      setImage2(null);
      setCurrentStep(1);
      setErrors({});

      console.log("All responses:", {
        locationResponse,
        lodgingResponse,
        transportResponse,
        tourResponse,
      });
      toast.success("Added successfully");
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Error submitting tour:", error);
    } finally {
      setLoading(false);
    }
  };

  // Error message component
  const ErrorMessage = ({ error }) => {
    if (!error) return null;
    return <p className="mt-1 text-sm text-red-500">{error}</p>;
  };

  // Progress Indicator Component
  const ProgressIndicator = () => {
    const steps = [
      "Tour Details",
      "Location Details",
      "Lodging Details",
      "Transport Details",
    ];

    return (
      <div className="flex items-center justify-between p-4 mb-8 bg-gray-100 rounded-lg">
        {steps.map((step, index) => (
          <div
            key={step}
            className={`flex items-center ${
              currentStep === index + 1
                ? "text-blue-600 font-bold"
                : currentStep > index + 1
                ? "text-green-600"
                : "text-gray-400"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                currentStep === index + 1
                  ? "bg-blue-100"
                  : currentStep > index + 1
                  ? "bg-green-100"
                  : "bg-gray-200"
              }`}
            >
              {currentStep > index + 1 ? <CheckCircle size={20} /> : index + 1}
            </div>
            {step}
          </div>
        ))}
      </div>
    );
  };

  // Tour Details Form (Step 1)
  const renderTourDetailsForm = () => (
    <div className="space-y-6">
      <h2 className="mb-6 text-3xl font-bold text-gray-800">Tour Details</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <input
            type="text"
            name="tourName"
            value={userData.tourName}
            onChange={handleChange}
            placeholder="Tour Name"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.tourName ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          <ErrorMessage error={errors.tourName} />
        </div>
        <div>
          <input
            type="text"
            name="tourGuide"
            value={userData.tourGuide}
            onChange={handleChange}
            placeholder="Tour Guide"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.tourGuide ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          <ErrorMessage error={errors.tourGuide} />
        </div>
      </div>

      <div>
        <textarea
          name="tourDescription"
          value={userData.tourDescription}
          onChange={handleChange}
          placeholder="Tour Description"
          className={`w-full h-32 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.tourDescription ? "border-red-500" : "border-gray-300"
          }`}
        />
        <ErrorMessage error={errors.tourDescription} />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="block mb-2 text-gray-700">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={userData.startDate}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.startDate ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          <ErrorMessage error={errors.startDate} />
        </div>
        <div>
          <label className="block mb-2 text-gray-700">End Date</label>
          <input
            type="date"
            name="endDate"
            value={userData.endDate}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.endDate ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          <ErrorMessage error={errors.endDate} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <input
            type="text"
            name="country"
            value={userData.country}
            onChange={handleChange}
            placeholder="Country"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.country ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          <ErrorMessage error={errors.country} />
        </div>
        <div>
          <input
            type="number"
            name="price"
            value={userData.price}
            min="0"
            onChange={handleChange}
            placeholder="Price"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.price ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          <ErrorMessage error={errors.price} />
        </div>
        <div>
          <input
            type="number"
            name="ticketsAvailable"
            value={userData.ticketsAvailable}
            min="0"
            onChange={handleChange}
            placeholder="Tickets Available"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.ticketsAvailable ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          <ErrorMessage error={errors.ticketsAvailable} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="mb-4 text-lg font-semibold text-gray-700">Meals</h3>
          <div className="space-y-2">
            {["Breakfast", "Lunch", "Dinner"].map((meal) => (
              <label key={meal} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={meal}
                  checked={userData.meals.includes(meal)}
                  onChange={handleMealChange}
                  className="w-5 h-5 text-blue-600 form-checkbox"
                />
                <span>{meal}</span>
              </label>
            ))}
          </div>
          <ErrorMessage error={errors.meals} />
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold text-gray-700">
            Activities
          </h3>
          <div className="space-y-2">
            {["Hiking", "Swimming", "Sightseeing", "Cultural Tour"].map(
              (activity) => (
                <label key={activity} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={activity}
                    checked={userData.activities.includes(activity)}
                    onChange={handleActivityChange}
                    className="w-5 h-5 text-blue-600 form-checkbox"
                  />
                  <span>{activity}</span>
                </label>
              )
            )}
          </div>
          <ErrorMessage error={errors.activities} />
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold text-gray-700">
          Tour Images
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center justify-center w-full">
            <label
              className={`flex flex-col items-center w-full p-4 bg-white border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 ${
                errors.image1 ? "border-red-500" : "border-gray-300"
              }`}
            >
              <Upload className="w-8 h-8 text-gray-500" />
              <span className="mt-2 text-sm text-gray-500">
                {image1 ? image1[0].name : "Upload Image 1"}
              </span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  setImage1(e.target.files);
                  if (errors.image1) {
                    setErrors((prev) => ({ ...prev, image1: "" }));
                  }
                }}
              />
            </label>
            <ErrorMessage error={errors.image1} />
          </div>
          <div className="flex flex-col items-center justify-center w-full">
            <label
              className={`flex flex-col items-center w-full p-4 bg-white border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 ${
                errors.image2 ? "border-red-500" : "border-gray-300"
              }`}
            >
              <Upload className="w-8 h-8 text-gray-500" />
              <span className="mt-2 text-sm text-gray-500">
                {image2 ? image2[0].name : "Upload Image 2"}
              </span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  setImage2(e.target.files);
                  if (errors.image2) {
                    setErrors((prev) => ({ ...prev, image2: "" }));
                  }
                }}
              />
            </label>
            <ErrorMessage error={errors.image2} />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => handleNextStep(2)}
          className="flex items-center px-6 py-3 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Next: Location Details
          <ChevronRight className="ml-2" />
        </button>
      </div>
    </div>
  );

  // Location Details Form (Step 2)
  const renderLocationDetailsForm = () => (
    <div className="space-y-6">
      <h2 className="mb-6 text-3xl font-bold text-gray-800">
        Location Details
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <input
            type="text"
            name="fromLocation"
            value={userData.fromLocation}
            onChange={handleChange}
            placeholder="From Location"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.fromLocation ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          <ErrorMessage error={errors.fromLocation} />
        </div>
        <div>
          <input
            type="text"
            name="toLocation"
            value={userData.toLocation}
            onChange={handleChange}
            placeholder="To Location"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.toLocation ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          <ErrorMessage error={errors.toLocation} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <input
            type="number"
            name="distance"
            min="0"
            value={userData.distance}
            onChange={handleChange}
            placeholder="Distance (km)"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.distance ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          <ErrorMessage error={errors.distance} />
        </div>
        <div>
          <input
            name="estimatedTravelTime"
            value={userData.estimatedTravelTime}
            onChange={handleChange}
            placeholder="Estimated Travel Time"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.estimatedTravelTime ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          <ErrorMessage error={errors.estimatedTravelTime} />
        </div>
      </div>

      <div>
        <textarea
          name="locationDescription"
          value={userData.locationDescription}
          onChange={handleChange}
          placeholder="Location Description"
          className={`w-full h-32 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.locationDescription ? "border-red-500" : "border-gray-300"
          }`}
        />
        <ErrorMessage error={errors.locationDescription} />
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setCurrentStep(1)}
          className="flex items-center px-6 py-3 text-gray-700 transition-colors bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          <ChevronLeft className="mr-2" />
          Previous: Tour Details
        </button>
        <button
          onClick={() => handleNextStep(3)}
          className="flex items-center px-6 py-3 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Next: Lodging Details
          <ChevronRight className="ml-2" />
        </button>
      </div>
    </div>
  );

  // Lodging Details Form (Step 3)
  const renderLodgingDetailsForm = () => (
    <div className="space-y-6">
      <h2 className="mb-6 text-3xl font-bold text-gray-800">Lodging Details</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <input
            type="text"
            name="lodgingName"
            value={userData.lodgingName}
            onChange={handleChange}
            placeholder="Lodging Name"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.lodgingName ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          <ErrorMessage error={errors.lodgingName} />
        </div>
        <div>
          <select
            name="lodgingType"
            value={userData.lodgingType}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.lodgingType ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Lodging Type</option>
            <option value="Hotel">Hotel</option>
            <option value="Resort">Resort</option>
            <option value="Hostel">Hostel</option>
            <option value="Camping">Camping</option>
          </select>
          <ErrorMessage error={errors.lodgingType} />
        </div>
      </div>

      <div>
        <textarea
          name="lodgingDescription"
          value={userData.lodgingDescription}
          onChange={handleChange}
          placeholder="Lodging Description"
          className={`w-full h-32 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.lodgingDescription ? "border-red-500" : "border-gray-300"
          }`}
        />
        <ErrorMessage error={errors.lodgingDescription} />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <input
            type="text"
            name="lodgingAddress"
            value={userData.lodgingAddress}
            onChange={handleChange}
            placeholder="Lodging Address"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.lodgingAddress ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          <ErrorMessage error={errors.lodgingAddress} />
        </div>
        <div>
          <input
            type="number"
            name="lodgingRating"
            value={userData.lodgingRating}
            onChange={handleChange}
            placeholder="Lodging Rating (0-5)"
            min="0"
            max="5"
            step="0.1"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.lodgingRating ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          <ErrorMessage error={errors.lodgingRating} />
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setCurrentStep(2)}
          className="flex items-center px-6 py-3 text-gray-700 transition-colors bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          <ChevronLeft className="mr-2" />
          Previous: Location Details
        </button>
        <button
          onClick={() => handleNextStep(4)}
          className="flex items-center px-6 py-3 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Next: Transport Details
          <ChevronRight className="ml-2" />
        </button>
      </div>
    </div>
  );

  // Transport Details Form (Step 4)
  const renderTransportDetailsForm = () => (
    <div className="space-y-6">
      <h2 className="mb-6 text-3xl font-bold text-gray-800">
        Transport Details
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <input
            type="text"
            name="transportName"
            value={userData.transportName}
            onChange={handleChange}
            placeholder="Transport Name"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.transportName ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          <ErrorMessage error={errors.transportName} />
        </div>
        <div>
          <select
            name="transportType"
            value={userData.transportType}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.transportType ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Transport Type</option>
            <option value="Bus">Bus</option>
            <option value="Train">Train</option>
            <option value="Flight">Flight</option>
            <option value="Private Vehicle">Private Vehicle</option>
          </select>
          <ErrorMessage error={errors.transportType} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <input
            type="text"
            name="transportEstimatedTravelTime"
            value={userData.transportEstimatedTravelTime}
            onChange={handleChange}
            placeholder="Estimated Travel Time"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.transportEstimatedTravelTime ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          <ErrorMessage error={errors.transportEstimatedTravelTime} />
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={submitData}
            disabled={loading}
            className="flex items-center justify-center w-full px-6 py-3 text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed"
          >
            <CheckCircle className="mr-2" />
            {loading ? "adding..." : "Add Tour"}
          </button>
        </div>
      </div>

      <div>
        <textarea
          name="transportDescription"
          value={userData.transportDescription}
          onChange={handleChange}
          placeholder="Transport Description"
          className={`w-full h-32 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.transportDescription ? "border-red-500" : "border-gray-300"
          }`}
        />
        <ErrorMessage error={errors.transportDescription} />
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setCurrentStep(3)}
          className="flex items-center px-6 py-3 text-gray-700 transition-colors bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          <ChevronLeft className="mr-2" />
          Previous: Lodging Details
        </button>
      </div>
    </div>
  );

  // Render current step
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderTourDetailsForm();
      case 2:
        return renderLocationDetailsForm();
      case 3:
        return renderLodgingDetailsForm();
      case 4:
        return renderTransportDetailsForm();
      default:
        return renderTourDetailsForm();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gray-50">
      <div className="w-full max-w-4xl p-8 bg-white shadow-xl rounded-2xl">
        <ProgressIndicator />
        {renderCurrentStep()}
      </div>
    </div>
  );
};

export default AddTour;