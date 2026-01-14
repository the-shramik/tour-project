import React, { useState, useEffect } from "react";
import { Eye, MapPin, Building, Train, DollarSign, Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header, Footer, Banner } from "../../Reusable/Banner";
import { useDispatch } from "react-redux";
import { userTours } from "../../../Redux/API/API";
import whatsapp from "../../../assets/Images/whatsapp.png";
import BookTour from "./BookTour";



const FilterInput = ({ icon: Icon, label, ...props }) => (
  <div className="relative">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        {...props}
        className="pl-10 w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out shadow-sm hover:border-gray-300"
      />
    </div>
  </div>
);

const FilterSelect = ({ icon: Icon, label, ...props }) => (
  <div className="relative">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <select
        {...props}
        className="pl-10 w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out shadow-sm hover:border-gray-300 appearance-none"
      />
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  </div>
);

const UserDashboard = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tourImages, setTourImages] = useState({});
  const [selectedTour, setSelectedTour] = useState(null);
  const [isFiltered, setIsFiltered] = useState(false);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  
  const [filters, setFilters] = useState({
    country: "",
    lodgingType: "",
    transportType: "",
    minPrice: "",
    maxPrice: ""
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFilterSubmit = async (e) => {
    e.preventDefault();
    setIsFiltered(true);
    await fetchFilteredTours();
  };

  const handleClearFilters = async () => {
    setFilters({
      country: "",
      lodgingType: "",
      transportType: "",
      minPrice: "",
      maxPrice: ""
    });
    setIsFiltered(false);
    await fetchAllTours();
  };

  const handleViewDetails = (tourId) => {
    navigate(`/user/tour/${tourId}`);
  };

  const handleBookTour = (tour) => {
    setSelectedTour(tour);
  };

  const handleCloseModal = () => {
    setSelectedTour(null);
  };

  const handleContactSupport = () => {
    window.open(
      "https://api.whatsapp.com/send?phone=919008963671&text=Hello, Welcome to tours chat support!",
      "_blank"
    );
  };

  const fetchAllTours = async () => {
    try {
      setLoading(true);
      const response = await dispatch(userTours());
      const data = response.payload.data.availableTours;
      setTours(data);

      const imageMap = {};
      data.forEach((tour) => {
        if (tour.tourImages?.length > 0) {
          imageMap[tour.id] = tour.tourImages[0];
        }
      });

      setTourImages(imageMap);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tours:", error);
      setError("Failed to load tours");
      setLoading(false);
    }
  };

  const fetchFilteredTours = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      
      if (filters.country) queryParams.append("country", filters.country);
      if (filters.lodgingType) queryParams.append("lodgingType", filters.lodgingType);
      if (filters.transportType) queryParams.append("transportType", filters.transportType);
      if (filters.minPrice) queryParams.append("minPrice", filters.minPrice);
      if (filters.maxPrice) queryParams.append("maxPrice", filters.maxPrice);

      const response = await fetch(
        `${baseUrl}/customer/filterTours?${queryParams}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch filtered tours");
      }

      const data = await response.json();
      console.log(data);
      setTours(data.filteredTours);

      const imageMap = {};
      data.filteredTours.forEach((tour) => {
        if (tour.tourImages?.length > 0) {
          imageMap[tour.id] = tour.tourImages[0];
        }
      });

      setTourImages(imageMap);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching filtered tours:", error);
      setError("No tours found matching the specified criteria");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTours();
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-full max-w-md p-8 space-y-4 text-center bg-white shadow-lg rounded-xl">
          <h2 className="text-2xl font-bold text-red-600">Error</h2>
          <p className="text-gray-700">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-2 text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <Banner />
      
      <div className="container relative px-4 py-6 mx-auto">
      <div className="mb-8 bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Find Your Perfect Adventure</h2>
                <p className="text-blue-100">Customize your search to discover amazing tours</p>
              </div>
              {isFiltered && (
                <button
                  onClick={handleClearFilters}
                  className="flex items-center px-4 py-2 text-sm text-white bg-blue-500 bg-opacity-30 rounded-lg hover:bg-opacity-40 transition-all duration-200"
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear Filters
                </button>
              )}
            </div>
          </div>
          
          <form onSubmit={handleFilterSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FilterInput
                icon={MapPin}
                label="Destination Country"
                type="text"
                name="country"
                value={filters.country}
                onChange={handleFilterChange}
                placeholder="Where do you want to go?"
              />
              
              <FilterSelect
                icon={Building}
                label="Accommodation Type"
                name="lodgingType"
                value={filters.lodgingType}
                onChange={handleFilterChange}
              >
                <option value="">Select accommodation</option>
                <option value="Hotel">Luxury Hotel</option>
                <option value="Resort">Beach Resort</option>
                <option value="Hostel">Boutique Hostel</option>
              </FilterSelect>

              <FilterSelect
                icon={Train}
                label="Transport Mode"
                name="transportType"
                value={filters.transportType}
                onChange={handleFilterChange}
              >
                <option value="">Choose transport</option>
                <option value="Train">Scenic Train</option>
                <option value="Bus">Luxury Bus</option>
                <option value="Flight">Flight</option>
              </FilterSelect>

              <FilterInput
                icon={DollarSign}
                label="Minimum Budget"
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleFilterChange}
                placeholder="Min price"
              />

              <FilterInput
                icon={DollarSign}
                label="Maximum Budget"
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                placeholder="Max price"
              />

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-lg hover:from-blue-700 hover:to-blue-500 transition-all duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
                >
                  <Search className="w-5 h-5" />
                  <span>Search Tours</span>
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            {isFiltered ? 'Filtered Tours' : 'All Tours'}
          </h1>
        </div>

        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="w-16 h-16 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : tours.length === 0 ? (
          <div className="py-10 text-center text-gray-500">
            {isFiltered ? 'No tours match your filter criteria.' : 'No tours available.'}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tours.map((tour) => (
              <div
                key={tour.id}
                className="overflow-hidden transition transform bg-white shadow-lg rounded-xl hover:scale-105 hover:shadow-xl"
              >
                <div className="relative h-48 overflow-hidden">
                  {tourImages[tour.id] ? (
                    <img
                      src={tourImages[tour.id]}
                      alt={tour.tourName}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-gray-500 bg-gray-200">
                      No Image
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h2 className="flex items-center justify-between mb-2 text-xl font-bold text-gray-800">
                    <span className="truncate">{tour.tourName}</span>
                  </h2>

                  <p className="mb-4 text-gray-600 line-clamp-2">
                    {tour.tourDescription}
                  </p>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-semibold text-green-600">
                        ${tour.price}
                      </p>
                      <p className="text-sm text-gray-500">
                        {tour.ticketsAvailable} tickets available
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleBookTour(tour)}
                        className="flex items-center px-3 py-2 text-white transition-colors bg-green-500 rounded-md hover:bg-green-600"
                      >
                        Book
                      </button>
                      <button
                        onClick={() => handleViewDetails(tour.id)}
                        className="flex items-center px-3 py-2 text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-600"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={handleContactSupport}
          className="fixed bottom-6 right-6 bg-[#25D366] text-white rounded-full w-16 h-16 shadow-2xl hover:bg-[#128C7E] transition-colors z-50 flex items-center justify-center"
        >
          <div className="relative">
            <img
              src={whatsapp}
              alt="whatsapp"
              className="transition transform hover:scale-105 hover:shadow-xl"
            />
          </div>
        </button>
      </div>
      <Footer />

      {selectedTour && (
        <BookTour
          tourId={selectedTour.id}
          isOpen={!!selectedTour}
          onClose={handleCloseModal}
          ticketsAvailable={selectedTour.ticketsAvailable}
        />
      )}
    </div>
  );
};

export default UserDashboard;