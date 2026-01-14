import React, { useState, useEffect, useRef } from "react";
import {
  LogOut,
  MapPin,
  Bus,
  Building2,
  User,
  ChevronRight,
  ChevronLeft,
  Ticket,
  ChevronDown,
  CircleUserRound,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

// Import your banner images
import banner1 from "../../assets/Images/banner1.jpg";
import banner2 from "../../assets/Images/banner2.jpg";
import banner3 from "../../assets/Images/banner3.jpg";
import { jwtDecode } from "jwt-decode";

const banners = [
  {
    id: 1,
    image: banner1,
    title: "Explore Beautiful Beaches",
    description:
      "Discover pristine beaches with turquoise waters and golden sands.",
  },
  {
    id: 2,
    image: banner2,
    title: "Mountain Adventures",
    description:
      "Conquer breathtaking peaks and embrace thrilling outdoor experiences.",
  },
  {
    id: 3,
    image: banner3,
    title: "Urban Escapes",
    description:
      "Experience the vibrant energy of bustling cityscapes and cultural wonders.",
  },
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  return (
    <div className="relative w-full h-[600px] overflow-hidden group">
      <div
        className="flex transition-transform duration-1000 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="min-w-full h-full bg-cover bg-center relative"
            style={{ backgroundImage: `url(${banner.image})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center text-white px-6">
              <h2 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                {banner.title}
              </h2>
              <p className="text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md">
                {banner.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrevious}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft className="text-white" />
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronRight className="text-white" />
      </button>

      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {banners.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
              currentIndex === index
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const Header = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Get token from localStorage
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // Decode the token to get user role and email
        const decodedToken = jwtDecode(token);
        setUserRole(decodedToken.role);
        setUserEmail(decodedToken.sub); // Assuming email is in the 'sub' claim
      } catch (error) {
        console.error("Invalid token", error);
        // Clear invalid token
        localStorage.removeItem("token");
        navigate("/");
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  // Menu items for different roles
  const adminMenuItems = [
    {
      label: "Tickets",
      icon: <Ticket className="mr-2 w-4 h-4" />,
      onClick: () => navigate("/admin/tickets"),
    },
    {
      label: "Locations",
      icon: <MapPin className="mr-2 w-4 h-4" />,
      onClick: () => navigate("/admin/locations"),
    },
    {
      label: "Transport",
      icon: <Bus className="mr-2 w-4 h-4" />,
      onClick: () => navigate("/admin/transport"),
    },
    {
      label: "Lodging",
      icon: <Building2 className="mr-2 w-4 h-4" />,
      onClick: () => navigate("/admin/lodging"),
    },
  ];

  const customerMenuItems = [
    // {
    //   label: "Profile",
    //   icon: <User className="mr-2 w-4 h-4" />,
    //   // onClick: () => navigate("/profile"),
    // },
  ];

  // Determine which menu items to show
  const menuItems =
    userRole === "ROLE_ADMIN"
      ? adminMenuItems
      : userRole === "ROLE_CUSTOMER"
      ? customerMenuItems
      : [];

  // Only show dropdown if there's a token
  const showDropdown = !!localStorage.getItem("token");

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-black/50 to-transparent py-4 px-6 text-white">
      <nav className="container mx-auto flex justify-between items-center">
        <div
          className="text-2xl font-bold flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          Tours & Travel
        </div>
        <ul className="flex space-x-6 items-center">
          {showDropdown && (
            <li ref={dropdownRef} className="relative">
              <div
                className="flex items-center hover:text-blue-300 transition-colors cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {userRole === "ROLE_ADMIN" ? (
                  "Admin"
                ) : (
                  <CircleUserRound className="size-7" />
                )}
                <ChevronDown className="ml-2 w-4 h-4" />
              </div>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white text-black shadow-lg rounded-md overflow-hidden">
                  <div className="px-4 py-2 bg-gray-100 border-b">
                    <p className="text-sm font-medium truncate">{userEmail}</p>
                  </div>
                  {menuItems.map((item) => (
                    <div
                      key={item.label}
                      className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer"
                      onClick={() => {
                        item.onClick();
                        setIsDropdownOpen(false);
                      }}
                    >
                      {item.icon}
                      {item.label}
                    </div>
                  ))}
                  <div
                    className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer text-red-500 border-t"
                    onClick={() => {
                      handleLogout();
                      setIsDropdownOpen(false);
                    }}
                  >
                    <LogOut className="mr-2 w-4 h-4" />
                    Logout
                  </div>
                </div>
              )}
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerLinks = [
    { label: "Terms of Service", to: "/terms-of-service" },
    { label: "Privacy Policy", to: "/privacy-policy" },
    // { label: "Contact Us", to: "/contact" },
  ];

  return (
    <footer className="bg-gray-900 text-white py-6 px-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="text-sm">
          &copy; {currentYear} Tours & Travel System. All Rights Reserved.
        </div>
        <div className="flex space-x-6">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              // href={link.href}
              to={link.to}
              className="hover:text-blue-300 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export { Banner, Header, Footer };
