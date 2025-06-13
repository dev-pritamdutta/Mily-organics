import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import logo from '../assets/mily.jpeg'

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const {
    user,
    setUser,
    setShowUserLogin,
    navigate,
    setSearchQuery,
    searchQuery,
    getCartCount,
    axios,
  } = useAppContext();

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");
      if (data.success) {
        toast.success(data.message);
        setUser(null);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery]);

  return (
    <nav className="sticky top-0 z-50 bg-[#e6dcc9]  shadow border-b border-gray-200 transition-all">
      <div className="flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 py-3">
        {/* Logo */}
        <NavLink to="/" onClick={() => setOpen(false)} className="flex-shrink-0">
          <img className="h-16 rounded-xl w-16 md:h-16" src={logo} alt="logo" />
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-8">
          <NavLink to="/" className="uppercase tracking-wide text-[15px] font-medium text-gray-700 hover:text-[var(--color-primary)] transition">Home</NavLink>
          <NavLink to="/products" className="uppercase tracking-wide text-[15px] font-medium text-gray-700 hover:text-[var(--color-primary)] transition">Shop</NavLink>
          <NavLink to="/about" className="uppercase tracking-wide text-[15px] font-medium text-gray-700 hover:text-[var(--color-primary)] transition">About</NavLink>
          <NavLink to="/contact" className="uppercase tracking-wide text-[15px] font-medium text-gray-700 hover:text-[var(--color-primary)] transition">Contact</NavLink>

          <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full bg-gray-50">
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
              type="text"
              placeholder="Search products"
            />
            <img src={assets.search_icon} alt="search" className="w-4 h-4" />
          </div>

          <div
            onClick={() => navigate("/cart")}
            className="relative cursor-pointer"
          >
            <img
              src={assets.nav_cart_icon}
              alt="cart"
              className="w-6 opacity-80"
            />
            <button className="absolute -top-2 -right-3 text-xs text-white bg-[var(--color-primary)] w-[18px] h-[18px] rounded-full">
              {getCartCount()}
            </button>
          </div>

          {!user ? (
            <button
              onClick={() => setShowUserLogin(true)}
              className="cursor-pointer px-8 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dull)] transition text-white rounded-full uppercase tracking-wide text-[14px]"
            >
              Login
            </button>
          ) : (
            <div className="relative group">
              <img src={assets.profile_icon} className="w-10" alt="" />
              <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-32 rounded-md text-sm z-40">
                <li
                  onClick={() => navigate("my-orders")}
                  className="p-1.5 pl-3 hover:bg-[var(--color-primary)]/10 cursor-pointer"
                >
                  My Orders
                </li>
                <li
                  onClick={logout}
                  className="p-1.5 pl-3 hover:bg-[var(--color-primary)]/10 cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Mobile: Cart & Hamburger */}
        <div className="flex items-center gap-4 sm:hidden">
          <div
            onClick={() => navigate("/cart")}
            className="relative cursor-pointer"
          >
            <img
              src={assets.nav_cart_icon}
              alt="cart"
              className="w-6 opacity-80"
            />
            <button className="absolute -top-2 -right-3 text-xs text-white bg-[var(--color-primary)] w-[18px] h-[18px] rounded-full">
              {getCartCount()}
            </button>
          </div>
          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            className="ml-2"
          >
            <img src={assets.menu_icon} alt="menu" className="w-8 h-8" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="sm:hidden absolute top-[100%] left-0 w-full bg-white shadow-md py-4 flex flex-col items-start gap-2 px-6 text-base z-40 border-b border-gray-100">
          <NavLink to="/" onClick={() => setOpen(false)} className="py-2 uppercase tracking-wide font-medium">Home</NavLink>
          <NavLink to="/products" onClick={() => setOpen(false)} className="py-2 uppercase tracking-wide font-medium">Shop</NavLink>
          <NavLink to="/offers" onClick={() => setOpen(false)} className="py-2 uppercase tracking-wide font-medium">Offers</NavLink>
          <NavLink to="/about" onClick={() => setOpen(false)} className="py-2 uppercase tracking-wide font-medium">About</NavLink>
          <NavLink to="/contact" onClick={() => setOpen(false)} className="py-2 uppercase tracking-wide font-medium">Contact</NavLink>
          {user && (
            <NavLink to="/products" onClick={() => setOpen(false)} className="py-2 uppercase tracking-wide font-medium">
              My Orders
            </NavLink>
          )}
          {!user ? (
            <button
              onClick={() => {
                setOpen(false);
                setShowUserLogin(true);
              }}
              className="cursor-pointer px-6 py-2 mt-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dull)] transition text-white rounded-full text-sm uppercase tracking-wide"
            >
              Login
            </button>
          ) : (
            <button
              onClick={logout}
              className="cursor-pointer px-6 py-2 mt-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dull)] transition text-white rounded-full text-sm uppercase tracking-wide"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;