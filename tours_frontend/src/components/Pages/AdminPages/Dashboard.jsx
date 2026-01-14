import React, { useState, useEffect, useRef } from "react";
import {
  BadgePlus,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header, Footer, Banner } from "../../Reusable/Banner";
import { useDispatch } from "react-redux";
import { adminTours, deleteTour, updateTour } from "../../../Redux/API/API";
import { toast } from "sonner";
import EditTourModal from './EditTourModal'; // Import the new modal component

const Dashboard = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loader,setLoader] = useState(false);
  const [error, setError] = useState(null);
  const [tourImages, setTourImages] = useState({});
  const [selectedTour, setSelectedTour] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    meals: [],
    activities: [],
  });

  // New state for image handling
  const [image1Preview, setImage1Preview] = useState(null);
  const [image2Preview, setImage2Preview] = useState(null);
  const [image1File, setImage1File] = useState(null);
  const [image2File, setImage2File] = useState(null);

  const image1Ref = useRef(null);
  const image2Ref = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleViewDetails = (tourId) => {
    navigate(`/admin/tour/${tourId}`);
  };

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await dispatch(adminTours());
        const data = response.payload.data;
        console.log(data, "data");
        setTours(data);

        const imageMap = {};
        data.forEach((tour) => {
          // Assuming tourImages is an array of image URLs in the tour object
          if (tour.tourImages && tour.tourImages.length > 0) {
            // Use the first image as the primary image
            imageMap[tour.id] = tour.tourImages[0];
          }
        });

        // Set the tour images
        setTourImages(imageMap);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tours:", error);
        setError("Failed to load tours");
        setLoading(false);
      }
    };

    fetchTours();
  }, [dispatch]);

  const handleImageUpload = (e, setPreview, setFile) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditTour = (tour) => {
    setSelectedTour(tour);
    setEditFormData({
      tourName: tour.tourName,
      tourDescription: tour.tourDescription,
      tourGuide: tour.tourGuide,
      startDate: tour.startDate,
      endDate: tour.endDate,
      meals: tour.meals || [],
      activities: tour.activities || [],
      price: tour.price,
      ticketsAvailable: tour.ticketsAvailable,
      tourImages: tour.tourImages || [],
    });

    const fetchImagePreviews = async () => {
      if (tour.tourImages && tour.tourImages.length > 0) {
        setImage1Preview(tour.tourImages[0]);
        setImage2Preview(tour.tourImages[1]);
      } else {
        // No images available
        setImage1Preview(null);
        setImage2Preview(null);
      }
    };

    // Call the async function
    fetchImagePreviews();

    // Reset image files
    setImage1File(null);
    setImage2File(null);

    setIsEditModalOpen(true);
  };

  const handleUpdateTour = async () => {
    try {
      setLoader(true);
      const formData = new FormData();

      // Append tour data
      formData.append("tour", JSON.stringify(editFormData));

      // Append images if they exist
      if (image1File) formData.append("image1", image1File);
      if (image2File) formData.append("image2", image2File);

      // Dispatch update tour action
      const updateResponse = await dispatch(
        updateTour({
          tourId: selectedTour.id,
          formData,
        })
      ).unwrap(); // Using unwrap() to throw an error if the action fails

      // Refresh tours after successful update
      const response = await dispatch(adminTours());
      setTours(response.payload.data);
      setIsEditModalOpen(false);
      toast.success("Tour Updated");
      setSelectedTour(null);
    } catch (error) {
      console.error("Error updating tour:", error);
      toast.error("Failed to update tour");
    }finally{
      setLoader(false);

    }
  };

  const handleDelete = async (tour) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const tourId = tour.id;
      const response = await dispatch(deleteTour(tourId));
      if (response.payload.status === 204) {
        const updatedResponse = await dispatch(adminTours());
        setTours(updatedResponse.payload.data);

        toast.success("Tour deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting tour:", error);
      toast.error("Failed to delete tour");
    }
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedTour(null);
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
      <EditTourModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        editFormData={editFormData}
        setEditFormData={setEditFormData}
        onUpdate={handleUpdateTour}
        image1Preview={image1Preview}
        image2Preview={image2Preview}
        image1Ref={image1Ref}
        image2Ref={image2Ref}
        handleImageUpload={handleImageUpload}
        setImage1Preview={setImage1Preview}
        setImage2Preview={setImage2Preview}
        setImage1File={setImage1File}
        setImage2File={setImage2File}
        loading={loader}
      />
      <div className="container relative px-4 py-6 mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Tour Dashboard</h1>
          <button
            onClick={() => navigate("/admin/addtour")}
            className="flex items-center px-4 py-2 space-x-2 text-white transition-colors bg-blue-500 rounded-md shadow-md hover:bg-blue-600"
          >
            <BadgePlus className="w-5 h-5" />
            <span>Add New Tour</span>
          </button>
        </div>

        {tours.length === 0 ? (
          <div className="py-10 text-center text-gray-500">
            No tours available. Click "Add New Tour" to get started.
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
                    <div className="flex space-x-3">
                      <Pencil
                        className="text-blue-500 cursor-pointer size-5 hover:text-blue-700"
                        onClick={() => handleEditTour(tour)}
                      />
                      <Trash2
                        className="text-red-500 cursor-pointer size-5 hover:text-red-700"
                        onClick={() => handleDelete(tour)}
                      />
                    </div>
                  </h2>

                  <p className="mb-4 text-gray-600 line-clamp-2">
                    {tour.tourDescription}
                  </p>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-semibold text-blue-600">
                        ${tour.price}
                      </p>
                      <p className="text-sm text-gray-500">
                        {tour.ticketsAvailable} tickets available
                      </p>
                    </div>

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
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;