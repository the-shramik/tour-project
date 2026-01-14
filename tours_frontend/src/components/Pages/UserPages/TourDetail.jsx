import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  CalendarDays,
  Users,
  DollarSign,
  Building2,
  Bus,
  Star,
  Utensils,
  Target,
} from "lucide-react";
import { UserTourDetail } from "../../../Redux/API/API";

const UserTourDetails = () => {
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [tourImages, setTourImages] = useState([]);

  const { tourId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTourData = async () => {
      try {
        const response = await dispatch(UserTourDetail(tourId));
        const tourDetails = response.payload.tourDetails;
        setTour(tourDetails);

        // Set images directly from API response
        if (tourDetails.tourImages && tourDetails.tourImages.length > 0) {
          setTourImages(tourDetails.tourImages);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching tour details:", error);
        setError("Failed to load tour details");
        setLoading(false);
      }
    };

    fetchTourData();
  }, [tourId, dispatch]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === tourImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? tourImages.length - 1 : prevIndex - 1
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="w-16 h-16 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center space-y-4 max-w-md">
          <h2 className="text-2xl font-semibold text-gray-800">
            Error Loading Tour
          </h2>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Return to Previous Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ChevronLeft className="mr-2" /> Back to Tours
        </button>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Image Section - Fixed Position */}
          <div className="md:sticky md:top-12 h-fit">
            {tourImages.length > 0 ? (
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={tourImages[currentImageIndex]}
                  alt={`Tour image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                {tourImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 rounded-full p-2 hover:bg-white/75 transition-all"
                    >
                      <ChevronLeft className="text-gray-800" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 rounded-full p-2 hover:bg-white/75 transition-all"
                    >
                      <ChevronRight className="text-gray-800" />
                    </button>
                  </>
                )}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {tourImages.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 w-2 rounded-full ${
                        index === currentImageIndex
                          ? "bg-blue-500"
                          : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="w-full aspect-video bg-gray-200 flex items-center justify-center text-gray-500 rounded-2xl">
                No Images Available
              </div>
            )}
          </div>

          {/* Details Section - Scrollable */}
          <div className="md:max-h-[calc(100vh-200px)] md:overflow-y-auto space-y-6 pr-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {tour.tourName}
              </h1>
              <p className="text-gray-600">{tour.tourDescription}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Location Details */}
              <div className="bg-white rounded-xl p-5 shadow-md">
                <div className="flex items-center mb-3">
                  <MapPin className="mr-2 text-blue-500" />
                  <h3 className="text-md font-semibold text-gray-700">
                    Location
                  </h3>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <p className="font-bold text-md">
                    {tour.location.locationDescription}
                  </p>
                  <p>From: {tour.location.fromLocation}</p>
                  <p>To: {tour.location.toLocation}</p>
                  <p>Country: {tour.location.country}</p>
                  <p>Distance: {tour.location.distance} km</p>
                </div>
              </div>

              {/* Dates */}
              <div className="bg-white rounded-xl p-5 shadow-md">
                <div className="flex items-center mb-3">
                  <CalendarDays className="mr-2 text-blue-500" />
                  <h3 className="text-md font-semibold text-gray-700">Date</h3>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>Start: {tour.startDate}</p>
                  <p>End: {tour.endDate}</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Pricing */}
              <div className="bg-white rounded-xl p-5 shadow-md">
                <div className="flex items-center mb-3">
                  <DollarSign className="mr-2 text-green-500" />
                  <h3 className="text-md font-semibold text-gray-700">
                    Pricing
                  </h3>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <p className="text-xl font-bold text-blue-600">
                    ${tour.price}
                  </p>
                  <p>{tour.ticketsAvailable} tickets available</p>
                </div>
              </div>

              {/* Tour Guide */}
              <div className="bg-white rounded-xl p-5 shadow-md">
                <div className="flex items-center mb-3">
                  <Users className="mr-2 text-purple-500" />
                  <h3 className="text-md font-semibold text-gray-700">Guide</h3>
                </div>
                <p className="text-sm text-gray-600">{tour.tourGuide}</p>
              </div>
            </div>

            {/* Additional Details */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Meals */}
              <div className="bg-white rounded-xl p-5 shadow-md">
                <div className="flex items-center mb-3">
                  <Utensils className="mr-2 text-purple-500" />
                  <h3 className="text-md font-semibold text-gray-700">Meals</h3>
                </div>

                <ul className="list-disc list-inside text-sm text-gray-600">
                  {tour.meals.map((meal, index) => (
                    <li key={index}>{meal}</li>
                  ))}
                </ul>
              </div>

              {/* Activities */}
              <div className="bg-white rounded-xl p-5 shadow-md">
                <div className="flex items-center mb-3">
                  <Target className="mr-2 text-blue-500" />
                  <h3 className="text-md font-semibold text-gray-700">
                    Activities
                  </h3>
                </div>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {tour.activities.map((activity, index) => (
                    <li key={index}>{activity}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Lodging and Transport */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Lodging */}
              <div className="bg-white rounded-xl p-5 shadow-md">
                <div className="flex items-center mb-3">
                  <Building2 className="mr-2 text-blue-500" />
                  <h3 className="text-md font-semibold text-gray-700">
                    Lodging
                  </h3>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <p className="font-bold text-md">
                    {tour.lodging.lodgingDescription ||
                      "No description available"}
                  </p>
                  <p>Name: {tour.lodging.lodgingName}</p>
                  <p>Type: {tour.lodging.lodgingType}</p>
                  <div className="flex items-center">
                    <MapPin className="mr-1 text-red-500" size={16} />
                    <p>{tour.lodging.address}</p>
                  </div>
                  <p className="flex items-center">
                    <Star className="mr-1 text-yellow-500" size={16} />
                    {tour.lodging.rating} / 5
                  </p>
                </div>
              </div>

              {/* Transport */}
              <div className="bg-white rounded-xl p-5 shadow-md">
                <div className="flex items-center mb-3">
                  <Bus className="mr-2 text-blue-500" />
                  <h3 className="text-md font-semibold text-gray-700">
                    Transport
                  </h3>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <p className="font-bold text-md">
                    {tour.transport.transportDescription ||
                      "No description available"}
                  </p>
                  <p>Name: {tour.transport.transportName}</p>
                  <p>Type: {tour.transport.transportType}</p>
                  <p>Travel Time: {tour.transport.estimatedTravelTime}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTourDetails;
