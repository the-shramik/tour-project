import React, { useRef } from 'react';
import { X, Upload, Plus, Minus } from 'lucide-react';

const EditTourModal = ({ 
  isOpen, 
  onClose, 
  editFormData, 
  setEditFormData, 
  onUpdate,
  image1Preview,
  image2Preview,
  image1Ref,
  image2Ref,
  handleImageUpload,
  setImage1Preview,
  setImage2Preview,
  setImage1File,
  setImage2File,
  loading,
}) => {
  const addMeal = () => {
    setEditFormData((prev) => ({
      ...prev,
      meals: [...(prev.meals || []), ""],
    }));
  };

  const removeMeal = (index) => {
    setEditFormData((prev) => ({
      ...prev,
      meals: prev.meals.filter((_, i) => i !== index),
    }));
  };

  const updateMeal = (index, value) => {
    setEditFormData((prev) => ({
      ...prev,
      meals: prev.meals.map((meal, i) => (i === index ? value : meal)),
    }));
  };

  const addActivity = () => {
    setEditFormData((prev) => ({
      ...prev,
      activities: [...(prev.activities || []), ""],
    }));
  };

  const removeActivity = (index) => {
    setEditFormData((prev) => ({
      ...prev,
      activities: prev.activities.filter((_, i) => i !== index),
    }));
  };

  const updateActivity = (index, value) => {
    setEditFormData((prev) => ({
      ...prev,
      activities: prev.activities.map((activity, i) =>
        i === index ? value : activity
      ),
    }));
  };

  const handleInputChange = (field) => (e) => {
    setEditFormData((prev) => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4"
        >
          <X className="text-gray-500 hover:text-gray-700" />
        </button>
        <h2 className="mb-4 text-2xl font-bold">Edit Tour</h2>

        <div className="space-y-4">
          {/* Image Upload Section */}
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block mb-2 text-sm font-medium">Image 1</label>
              <div
                className="relative flex items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer"
                onClick={() => image1Ref.current.click()}
              >
                <input
                  type="file"
                  ref={image1Ref}
                  className="hidden"
                  accept="image/*"
                  onChange={(e) =>
                    handleImageUpload(e, setImage1Preview, setImage1File)
                  }
                />
                {image1Preview ? (
                  <img
                    src={image1Preview}
                    alt="Preview"
                    className="object-cover w-full h-full rounded-lg"
                  />
                ) : (
                  <div className="flex flex-col items-center text-gray-500">
                    <Upload className="w-10 h-10 mb-2" />
                    <span>Upload Image 1</span>
                  </div>
                )}
              </div>
            </div>

            <div className="w-1/2">
              <label className="block mb-2 text-sm font-medium">Image 2</label>
              <div
                className="relative flex items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer"
                onClick={() => image2Ref.current.click()}
              >
                <input
                  type="file"
                  ref={image2Ref}
                  className="hidden"
                  accept="image/*"
                  onChange={(e) =>
                    handleImageUpload(e, setImage2Preview, setImage2File)
                  }
                />
                {image2Preview ? (
                  <img
                    src={image2Preview}
                    alt="Preview"
                    className="object-cover w-full h-full rounded-lg"
                  />
                ) : (
                  <div className="flex flex-col items-center text-gray-500">
                    <Upload className="w-10 h-10 mb-2" />
                    <span>Upload Image 2</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <input
            type="text"
            placeholder="Tour Name"
            value={editFormData.tourName}
            onChange={handleInputChange('tourName')}
            className="w-full p-2 border rounded-md"
          />
          <textarea
            placeholder="Tour Description"
            value={editFormData.tourDescription}
            onChange={(e) =>
              setEditFormData({
                ...editFormData,
                tourDescription: e.target.value,
              })
            }
            className="w-full h-24 p-2 border rounded-md"
          />

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-lg font-semibold">Meals</label>
              <button
                onClick={addMeal}
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <Plus className="mr-1" size={16} /> Add Meal
              </button>
            </div>
            {editFormData.meals &&
              editFormData.meals.map((meal, index) => (
                <div key={index} className="flex items-center mb-2 space-x-2">
                  <input
                    type="text"
                    placeholder={`Meal ${index + 1}`}
                    value={meal}
                    onChange={(e) => updateMeal(index, e.target.value)}
                    className="flex-grow p-2 border rounded-md"
                  />
                  <button
                    onClick={() => removeMeal(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Minus />
                  </button>
                </div>
              ))}
          </div>

          {/* Activities Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-lg font-semibold">Activities</label>
              <button
                onClick={addActivity}
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <Plus className="mr-1" size={16} /> Add Activity
              </button>
            </div>
            {editFormData.activities &&
              editFormData.activities.map((activity, index) => (
                <div key={index} className="flex items-center mb-2 space-x-2">
                  <input
                    type="text"
                    placeholder={`Activity ${index + 1}`}
                    value={activity}
                    onChange={(e) => updateActivity(index, e.target.value)}
                    className="flex-grow p-2 border rounded-md"
                  />
                  <button
                    onClick={() => removeActivity(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Minus />
                  </button>
                </div>
              ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Tour Guide"
              value={editFormData.tourGuide}
              onChange={(e) =>
                setEditFormData({ ...editFormData, tourGuide: e.target.value })
              }
              className="w-full p-2 border rounded-md"
            />
            <input
              type="number"
              placeholder="Price"
              value={editFormData.price}
              onChange={(e) =>
                setEditFormData({ ...editFormData, price: e.target.value })
              }
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm">Start Date</label>
              <input
                type="date"
                value={editFormData.startDate}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    startDate: e.target.value,
                  })
                }
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm">End Date</label>
              <input
                type="date"
                value={editFormData.endDate}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, endDate: e.target.value })
                }
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>
          <input
            type="number"
            placeholder="Tickets Available"
            value={editFormData.ticketsAvailable}
            onChange={(e) =>
              setEditFormData({
                ...editFormData,
                ticketsAvailable: e.target.value,
              })
            }
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="flex justify-end mt-6 space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-800 bg-gray-200 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={onUpdate}
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            {loading?"updating...":"update Tour"}
            {/* Update Tour */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTourModal;