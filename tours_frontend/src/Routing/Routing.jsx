import React from "react";
import { Route, Routes } from "react-router-dom";
import SignUp from "../components/Authentication/SignUp";
import SignIn from "../components/Authentication/SignIn";
import NotFound from "../components/Authentication/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../components/Pages/AdminPages/Dashboard";
import UserDashboard from "../components/Pages/UserPages/Dashboard";
import AddTour from "../components/Pages/AdminPages/AddTour";
import TourDetailsPage from "../components/Pages/AdminPages/TourDetail";
import AllTransport from "../components/Pages/AdminPages/Transport/AllTransport";
import AllLocation from "../components/Pages/AdminPages/Location/AllLocation";
import AllLodging from "../components/Pages/AdminPages/Lodging/AllLodging";
import TourBookingComponent from "../components/Pages/AdminPages/Booking";
import TicketSummaryComponent from "../components/Pages/AdminPages/Tickets";
import UserTourDetails from "../components/Pages/UserPages/TourDetail";
import BookTour from "../components/Pages/UserPages/BookTour";
import AuthSuccess from "../components/Authentication/AuthSuccess";
import TermsOfService from "../components/Pages/terms";
import PrivacyPolicy from "../components/Pages/Privacy";
import Success from "../components/Pages/Success";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />}></Route>
      <Route path="/authSuccess" element={<AuthSuccess />}></Route>
      <Route path="/SignUp" element={<SignUp />}></Route>
      <Route path="/terms-of-service" element={<TermsOfService />}></Route>
      <Route path="/privacy-policy" element={<PrivacyPolicy />}></Route>

      <Route path="*" element={<NotFound />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute element={Dashboard} loginPath="/" role="ROLE_ADMIN" />
        }
      ></Route>

      <Route
        path="/admin/addtour"
        element={
          <ProtectedRoute element={AddTour} loginPath="/" role="ROLE_ADMIN" />
        }
      ></Route>
      <Route
        path="/admin/transport"
        element={
          <ProtectedRoute
            element={AllTransport}
            loginPath="/"
            role="ROLE_ADMIN"
          />
        }
      ></Route>
      <Route
        path="/admin/locations"
        element={
          <ProtectedRoute
            element={AllLocation}
            loginPath="/"
            role="ROLE_ADMIN"
          />
        }
      ></Route>
      <Route
        path="/admin/lodging"
        element={
          <ProtectedRoute
            element={AllLodging}
            loginPath="/"
            role="ROLE_ADMIN"
          />
        }
      ></Route>
      <Route
        path="/admin/book/:tourId"
        element={
          <ProtectedRoute
            element={TourBookingComponent}
            loginPath="/"
            role="ROLE_ADMIN"
          />
        }
      ></Route>
      <Route
        path="/admin/tickets"
        element={
          <ProtectedRoute
            element={TicketSummaryComponent}
            loginPath="/"
            role="ROLE_ADMIN"
          />
        }
      ></Route>

      <Route
        path="/admin/tour/:tourId"
        element={
          <ProtectedRoute
            element={TourDetailsPage}
            loginPath="/"
            role="ROLE_ADMIN"
          />
        }
      ></Route>

      <Route
        path="/user/dashboard"
        element={<ProtectedRoute element={UserDashboard} loginPath="/" />}
      ></Route>

      <Route
        path="/user/tour/:tourId"
        element={<ProtectedRoute element={UserTourDetails} loginPath="/" />}
      ></Route>

      <Route
        path="/user/book/:tourId"
        element={<ProtectedRoute element={BookTour} loginPath="/" />}
      ></Route>

      <Route path="/success" element ={<ProtectedRoute element={Success} loginPath="/"/>}></Route>
    </Routes>
  );
};

export default Routing;
