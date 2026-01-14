import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { adminTransport } from "../../../../Redux/API/API";
import { Train, Bus, Clock, Info, Plane, Car } from "lucide-react";

const TransportCard = ({ transport }) => {
  const getTransportIcon = (type) => {
    switch (type) {
      case "Train":
        return <Train className="w-6 h-6 text-blue-600" />;
      case "Bus":
        return <Bus className="w-6 h-6 text-green-600" />;
        case "Flight":
          return <Plane className="w-6 h-6 text-red-600" />;
          case "Private Vehicle":
            return <Car className="w-6 h-6 text-green-600" />;
      default:
        return <Info className="w-6 h-6 text-gray-500" />;
    }
  };

  return (
    <div className="p-4 mb-4 transition-all duration-300 ease-in-out bg-white border border-gray-100 rounded-lg shadow-md hover:shadow-xl">
      <div className="flex items-center mb-3">
        {getTransportIcon(transport.transportType)}
        <h3 className="ml-3 text-lg font-semibold text-gray-800">
          {transport.transportName}
        </h3>
      </div>
      <div className="space-y-2">
        <div className="flex items-center text-gray-600">
          <Clock className="w-4 h-4 mr-2" />
          <span className="text-sm">
            Estimated Travel Time: {transport.estimatedTravelTime}
          </span>
        </div>
        <div className="p-2 text-sm text-gray-700 rounded bg-gray-50">
          <p>
            {transport.transportDescription ||
              "No description available for this transport option."}
          </p>
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="px-2 py-1 text-xs text-gray-500 bg-gray-100 rounded">
            {transport.transportType}
          </span>
          {/* <span className="text-xs text-gray-500">ID: {transport.id}</span> */}
        </div>
      </div>
    </div>
  );
};

const AllTransport = () => {
  const dispatch = useDispatch();
  const [transports, setTransports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(adminTransport())
      .then((response) => {
        if (response.payload && response.payload.data) {
          setTransports(response.payload.data);
          setLoading(false);
        } else {
          setError("No transport data found");
          setLoading(false);
        }
      })
      .catch((err) => {
        setError("Error fetching transport data");
        setLoading(false);
        console.error(err);
      });
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-t-2 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="relative px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded"
        role="alert"
      >
        {error}
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">
        Transport Options
      </h1>
      {transports.length === 0 ? (
        <div className="text-center text-gray-500">
          No transport options available
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {transports.map((transport) => (
            <TransportCard key={transport.id} transport={transport} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllTransport;
