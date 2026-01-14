import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;
const token = localStorage.getItem("token");

// SignUP
export const userSignUP = createAsyncThunk(
  "userSignUp",
  async (credintials) => {
    try {
      const request = await axios.post(`${baseUrl}/auth/signup`, credintials);

      return request;
    } catch (error) {
      if (error.status === 403) {
        return { error: "User already exists!" };
      }
    }
  }
);

// SignIn

export const userLogin = createAsyncThunk("userLogin", async (credentials) => {
  try {
    // Making the POST request and waiting for the response
    const response = await axios.post(`${baseUrl}/auth/login`, credentials);

    return response;
  } catch (error) {
    if (error.status === 403) {
      return { error: "Invalid User!" };
    }
  }
});

// admin get all tours

export const adminTours = createAsyncThunk("adminTours", async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const response = await axios.get(`${baseUrl}/admin/tours`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
});

//get admin tour by Id

export const fetchTourDetails = createAsyncThunk(
  "fetchTourDetails",
  async (tourId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const response = await axios.get(`${baseUrl}/admin/tours/${tourId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// get admin all transport

export const adminTransport = createAsyncThunk("adminTransport", async () => {
  try {
    const token = localStorage.getItem('token');
    if(!token){
      return;
    }
    const response = axios.get(`${baseUrl}/admin/transports`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
});

// get admin all location

export const adminLocation = createAsyncThunk("adminLocation", async () => {
  try {
    const token = localStorage.getItem('token');
    if(!token){
      return;
    }
    const response = axios.get(`${baseUrl}/admin/locations`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
});
// get admin tour delete

export const deleteTour = createAsyncThunk("deleteTour", async (tourId) => {
  try {
    const token = localStorage.getItem('token');
    if(!token){
      return;
    }
    const response = axios.delete(`${baseUrl}/admin/tours/${tourId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
});

// get admin all lodging

export const adminLodging = createAsyncThunk("adminLodging", async () => {
  try {
    const token = localStorage.getItem('token');
    if(!token){
      return;
    }
    const response = axios.get(`${baseUrl}/admin/lodgings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
});

// update tour

export const updateTour = createAsyncThunk(
  "updateTour",
  async ({ tourId, formData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${baseUrl}/admin/tours/${tourId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important: use multipart/form-data for file uploads
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Update tour error:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// update location

export const editLocation = createAsyncThunk(
  "editLocation",
  async ({ locationId, updatedLocation }) => {
    const token = localStorage.getItem("token");
    if(!token){
      return;
    }
    const response = await axios.put(
      `${baseUrl}/admin/locations/${locationId}`,
      updatedLocation,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  }
);

// update transport

export const editTransport = createAsyncThunk(
  "editTransport",
  async ({ transportId, updatedTransport }) => {
    const token = localStorage.getItem("token");
    if(!token){
      return;
    }
    const response = await axios.put(
      `${baseUrl}/admin/transports/${transportId}`,
      updatedTransport,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  }
);

// update lodging

export const editLodging = createAsyncThunk(
  "editLodging",
  async ({ lodgingId, updatedLodging }) => {
    const token = localStorage.getItem("token");
    if(!token){
      return;
    }
    const response = await axios.put(
      `${baseUrl}/admin/lodgings/${lodgingId}`,
      updatedLodging,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  }
);

// admin ticket Summary

export const allTickets = createAsyncThunk("allTickets", async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const response = axios.get(`${baseUrl}/admin/tourTicketSummary`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
});

// admin tour book details
export const bookDetails = createAsyncThunk("bookDetails", async (tourId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const response = await axios.get(`${baseUrl}/admin/tourDetails/${tourId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
});

// user section-----

// user get all tours

export const userTours = createAsyncThunk("userTours", async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const response = await axios.get(`${baseUrl}/customer/tours`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
});

// get user tour by ID
export const UserTourDetail = createAsyncThunk(
  "UserTourDetails",
  async (tourId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const response = await axios.get(`${baseUrl}/customer/tours/${tourId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// user book tour

export const userBook = createAsyncThunk(
  "userBook",

  async ({ tourId, numberOfTickets }) => {
    const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
    try {
      const request = await axios.post(
        `${baseUrl}/customer/create-payment-intent/${tourId}?numberOfTickets=${numberOfTickets}`,
        // The second argument should be the request body (if any)
        {},  // Empty object if no body is needed
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return request.data;  // Return .data instead of entire request
    } catch (error) {
      console.error('Booking error:', error.response ? error.response.data : error.message);
      throw error;  // Rethrow to allow Redux to handle the error
    }
  }
);

// user confirm booking
export const confirmBooking = createAsyncThunk(
  "confirmBooking",
  async ({ bookingId,paymentIntentId}, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseUrl}/customer/confirm-payment/${bookingId}?paymentIntentId=${paymentIntentId}`,
    {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
