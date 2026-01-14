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
  Pencil,
} from "lucide-react";
import {
  editLocation,
  editLodging,
  editTransport,
  fetchTourDetails,
} from "../../../Redux/API/API";
import { toast } from "sonner";
import LocationUpdateModal from "./Location/UpdateLocation";
import TransportUpdateModal from "./Transport/UpdateTransport";
import LodgingUpdateModal from "./Lodging/UpdateLodging";

const TourDetailsPage = () => {
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isTransportModalOpen, setIsTransportModalOpen] = useState(false);
  const [isLodgingModalOpen, setIsLodgingModalOpen] = useState(false);


  const { tourId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateLocation = async (updatedLocation) => {
    try {
      const token = localStorage.getItem('token');
      if(!token){
        return;
      }
      const response = await dispatch(
        editLocation({ locationId: updatedLocation.id, updatedLocation })
      ).unwrap(); // Use unwrap() to handle potential errors
         console.log(response,"location response")
      const updatedTourResponse = await dispatch(fetchTourDetails(tourId));
      setTour(updatedTourResponse.payload);

      // Close modal
      setIsLocationModalOpen(false);
      toast.success("Location updated");
    } catch (error) {
      console.error("Error updating location:", error);
      toast.error("Failed to update location");
    }
  };

  // Update Transport API Call
  const updateTransport = async (updatedTransport) => {
    try {
      const token = localStorage.getItem('token');
      if(!token){
        return;
      }
      const response = await dispatch(
        editTransport({ transportId: updatedTransport.id, updatedTransport })
      ).unwrap(); // Use unwrap() to handle potential errors

      const updatedTourResponse = await dispatch(fetchTourDetails(tourId));
      setTour(updatedTourResponse.payload);

      // Close modal
      setIsTransportModalOpen(false);
      toast.success("transport updated");
    } catch (error) {
      console.error("Error updating location:", error);
      toast.error("Failed to update transport");
    }
  };

  // Update Lodging API Call
  const updateLodging = async (updatedLodging) => {
    const token = localStorage.getItem('token');
    if(!token){
      return;
    }
    try {
      const response = await dispatch(
        editLodging({ lodgingId: updatedLodging.id, updatedLodging })
      ).unwrap(); // Use unwrap() to handle potential errors
      console.log(response,'response lodging')

      const updatedTourResponse = await dispatch(fetchTourDetails(tourId));
      setTour(updatedTourResponse.payload);
      // Close modal
      setIsLodgingModalOpen(false);
      toast.success("lodging updated");
    } catch (error) {
      console.error("Error updating location:", error);
      toast.error("Failed to update lodging");
    }
  };
  const [tourImages, setTourImages] = useState([]);

  useEffect(() => {
    const fetchTourData = async () => {
      try {
        const response = await dispatch(fetchTourDetails(tourId));
        console.log(response.payload.tourImages, "res");
        setTour(response.payload);

        if (
          response.payload.tourImages &&
          response.payload.tourImages.length > 0
        ) {
          setTourImages(response.payload.tourImages);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tour details:", error);
        setError("Failed to load tour details");
        setLoading(false);
      }
    };

    fetchTourData();
  }, [tourId, dispatch,navigate]);

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
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-16 h-16 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="max-w-md p-8 space-y-4 text-center bg-white shadow-lg rounded-2xl">
          <h2 className="text-2xl font-semibold text-gray-800">
            Error Loading Tour
          </h2>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Return to Previous Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="container max-w-6xl px-4 mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center mb-6 text-gray-600 transition-colors hover:text-gray-800"
        >
          <ChevronLeft className="mr-2" /> Back to Tours
        </button>

        <div className="grid gap-10 md:grid-cols-2">
          {/* Image Section - Fixed Position */}
          <div className="md:sticky md:top-12 h-fit">
            {tourImages.length > 0 ? (
              <div className="relative w-full overflow-hidden shadow-lg aspect-video rounded-2xl">
                <img
                  src={tourImages[currentImageIndex]}
                  alt={`Tour image ${currentImageIndex + 1}`}
                  className="object-cover w-full h-full"
                />
                {tourImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute p-2 transition-all -translate-y-1/2 rounded-full left-4 top-1/2 bg-white/50 hover:bg-white/75"
                    >
                      <ChevronLeft className="text-gray-800" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute p-2 transition-all -translate-y-1/2 rounded-full right-4 top-1/2 bg-white/50 hover:bg-white/75"
                    >
                      <ChevronRight className="text-gray-800" />
                    </button>
                  </>
                )}
                <div className="absolute flex space-x-2 -translate-x-1/2 bottom-4 left-1/2">
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
              <div className="flex items-center justify-center w-full text-gray-500 bg-gray-200 aspect-video rounded-2xl">
                No Images Available
              </div>
            )}
          </div>

          {/* Details Section - Scrollable */}
          <div className="md:max-h-[calc(100vh-200px)] md:overflow-y-auto space-y-6 pr-4">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-gray-900">
                {tour.tourName}
              </h1>
              <p className="text-gray-600">{tour.tourDescription}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Location Details */}
              <div className="p-5 bg-white shadow-md rounded-xl">
                <div className="flex items-center mb-3">
                  <MapPin className="mr-2 text-blue-500" />
                  <h3 className="font-semibold text-gray-700 text-md">
                    Location
                  </h3>
                  <Pencil
                    className="ml-auto text-blue-500 cursor-pointer size-6 hover:text-blue-700"
                    onClick={() => setIsLocationModalOpen(true)}
                  />
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
              <div className="p-5 bg-white shadow-md rounded-xl">
                <div className="flex items-center mb-3">
                  <CalendarDays className="mr-2 text-blue-500" />
                  <h3 className="font-semibold text-gray-700 text-md">Date</h3>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>Start: {tour.startDate}</p>
                  <p>End: {tour.endDate}</p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Pricing */}
              <div className="p-5 bg-white shadow-md rounded-xl">
                <div className="flex items-center mb-3">
                  <DollarSign className="mr-2 text-green-500" />
                  <h3 className="font-semibold text-gray-700 text-md">
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
              <div className="p-5 bg-white shadow-md rounded-xl">
                <div className="flex items-center mb-3">
                  <Users className="mr-2 text-purple-500" />
                  <h3 className="font-semibold text-gray-700 text-md">Guide</h3>
                </div>
                <p className="text-sm text-gray-600">{tour.tourGuide}</p>
              </div>
            </div>

            {/* Additional Details */}
            <div className="grid gap-4 md:grid-cols-2">
              {/* Meals */}
              <div className="p-5 bg-white shadow-md rounded-xl">
                <div className="flex items-center mb-3">
                  <Utensils className="mr-2 text-purple-500" />
                  <h3 className="font-semibold text-gray-700 text-md">Meals</h3>
                </div>

                <ul className="text-sm text-gray-600 list-disc list-inside">
                  {tour.meals.map((meal, index) => (
                    <li key={index}>{meal}</li>
                  ))}
                </ul>
              </div>

              {/* Activities */}
              <div className="p-5 bg-white shadow-md rounded-xl">
                <div className="flex items-center mb-3">
                  <Target className="mr-2 text-blue-500" />
                  <h3 className="font-semibold text-gray-700 text-md">
                    Activities
                  </h3>
                </div>
                <ul className="text-sm text-gray-600 list-disc list-inside">
                  {tour.activities.map((activity, index) => (
                    <li key={index}>{activity}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Lodging and Transport */}
            <div className="grid gap-4 md:grid-cols-2">
              {/* Lodging */}
              <div className="p-5 bg-white shadow-md rounded-xl">
                <div className="flex items-center mb-3">
                  <Building2 className="mr-2 text-blue-500" />
                  <h3 className="font-semibold text-gray-700 text-md">
                    Lodging
                  </h3>
                  <Pencil
                    onClick={() => setIsLodgingModalOpen(true)}
                    className="ml-auto text-blue-500 cursor-pointer size-6 hover:text-blue-700"
                  />
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <p className="font-bold text-md">
                    {tour.lodging.lodgingDescription}
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
              <div className="p-5 bg-white shadow-md rounded-xl">
                <div className="flex items-center mb-3">
                  <Bus className="mr-2 text-blue-500" />
                  <h3 className="font-semibold text-gray-700 text-md">
                    Transport
                  </h3>
                  <Pencil
                    onClick={() => setIsTransportModalOpen(true)}
                    className="ml-auto text-blue-500 cursor-pointer size-6 hover:text-blue-700"
                  />
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <p className="font-bold text-md">
                    {tour.transport.transportDescription}
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

      <LocationUpdateModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        initialLocation={tour.location}
        onUpdateLocation={updateLocation}
      />

      {/* Transport Update Modal */}
      <TransportUpdateModal
        isOpen={isTransportModalOpen}
        onClose={() => setIsTransportModalOpen(false)}
        initialTransport={tour.transport}
        onUpdateTransport={updateTransport}
      />

      {/* Lodging Update Modal */}
      <LodgingUpdateModal
        isOpen={isLodgingModalOpen}
        onClose={() => setIsLodgingModalOpen(false)}
        initialLodging={tour.lodging}
        onUpdateLodging={updateLodging}
      />
    </div>
  );
};

export default TourDetailsPage;
