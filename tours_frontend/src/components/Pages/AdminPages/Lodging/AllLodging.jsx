import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { adminLodging } from "../../../../Redux/API/API";
import { Hotel, MapPin, Star } from "lucide-react";

const LodgingCard = ({ lodging }) => {
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.round(rating) ? "text-yellow-400" : "text-gray-300"
        }`}
        fill={index < Math.round(rating) ? "#fbbf24" : "none"}
      />
    ));
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-100 hover:shadow-xl transition-all duration-300 ease-in-out">
      <div className="flex items-center mb-3">
        <Hotel className="text-blue-600 w-6 h-6" />
        <h3 className="ml-3 text-lg font-semibold text-gray-800">
          {lodging.lodgingName}
        </h3>
      </div>
      <div className="space-y-2">
        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          <span className="text-sm">{lodging.address}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <span className="text-sm mr-2">Type: {lodging.lodgingType}</span>
          <div className="flex">{renderStars(lodging.rating)}</div>
        </div>
        <div className="bg-gray-50 p-2 rounded text-sm text-gray-700 mt-2">
          <p>
            {lodging.lodgingDescription ||
              "No description available for this lodging."}
          </p>
        </div>
        <div className="flex justify-between items-center mt-3">
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            Rating: {lodging.rating.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
};

const AllLodging = () => {
  const dispatch = useDispatch();
  const [lodgings, setLodgings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    dispatch(adminLodging())
      .then((response) => {
        if (response.payload && response.payload.data) {
          setLodgings(response.payload.data);
          setLoading(false);
        } else {
          setError("No lodging data found");
          setLoading(false);
        }
      })
      .catch((err) => {
        setError("Error fetching lodging data");
        setLoading(false);
        console.error(err);
      });
  }, [dispatch]);

  const filteredAndSortedLodgings = lodgings
    .filter(
      (lodging) =>
        lodging.lodgingName.toLowerCase().includes(filter.toLowerCase()) ||
        lodging.address.toLowerCase().includes(filter.toLowerCase()) ||
        lodging.lodgingType.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "name":
        default:
          return a.lodgingName.localeCompare(b.lodgingName);
      }
    });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Lodging Options
      </h1>

      {/* Search and Sort Controls */}
      <div className="mb-6 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
        <input
          type="text"
          placeholder="Filter lodgings by name, address, or type"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="name">Sort by Name</option>
          <option value="rating">Sort by Rating</option>
        </select>
      </div>

      {filteredAndSortedLodgings.length === 0 ? (
        <div className="text-center text-gray-500">
          No lodging options available
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedLodgings.map((lodging) => (
            <LodgingCard key={lodging.id} lodging={lodging} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllLodging;
