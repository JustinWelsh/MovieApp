import {
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchByMovieTitle } from "../../services/MovieService";
import { useMovieSearchContext } from "../../context/MovieSearchContext";

export function NavBar() {
  const navigate = useNavigate();
  const { updateSearchedMovies } = useMovieSearchContext();
  const [userSearchInput, setUserSearchInput] = useState(
    localStorage.getItem("userSearchInput")
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const initialize = async () => {
      if (!localStorage.getItem("userSearchInput")) {
        localStorage.setItem("userSearchInput", "");
      } else {
        const results = await searchByMovieTitle(
          localStorage.getItem("userSearchInput")
        );
        if (results) {
          navigate("/search");
          updateSearchedMovies(results);
        }
      }
    };
    initialize();
  }, [navigate, updateSearchedMovies]);

  const navbarItems = [
    { label: "Home", to: "/" },
    { label: "Movies", to: "#" },
    { label: "TV Shows", to: "#" },
    { label: "New & Popular", to: "#" },
    { label: "My List", to: "/watchlist" },
  ];

  const handleInputChange = async (e) => {
    const movieTitle = e.target.value;
    setUserSearchInput(movieTitle);
    localStorage.setItem("userSearchInput", movieTitle);
    const results = await searchByMovieTitle(movieTitle);
    if (results) {
      navigate("/search");
      updateSearchedMovies(results);
    }
    if (!movieTitle) {
      navigate("/");
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 h-16 transition-colors duration-300 ${
        scrolled ? "bg-black" : "bg-transparent"
      }`}
    >
      {/* Left: logo + nav links */}
      <div className="flex items-center gap-8">
        <img src="/TMDB.svg" alt="Logo" className="h-8" />
        <ul className="hidden sm:flex items-center gap-6">
          {navbarItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.to}
                onClick={() => {
                  setActiveIndex(index);
                  setUserSearchInput("");
                  localStorage.setItem("userSearchInput", "");
                }}
                className={`text-sm transition-colors ${
                  activeIndex === index
                    ? "text-white font-semibold"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Right: search, bell, profile */}
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 border border-gray-500 bg-black/50 rounded px-3 py-1.5">
          <svg
            className="w-4 h-4 text-gray-400 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
            />
          </svg>
          <input
            type="search"
            placeholder="Titles, people, genres"
            value={userSearchInput ?? ""}
            onChange={handleInputChange}
            className="bg-transparent text-white text-sm w-44 placeholder-gray-400 focus:outline-none"
          />
        </div>

        {/* Bell */}
        <button className="text-gray-300 hover:text-white transition-colors">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </button>

        {/* Profile dropdown */}
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <button className="flex items-center gap-1">
              <div className="w-8 h-8 rounded bg-red-600 flex items-center justify-center text-white text-sm font-bold">
                J
              </div>
              <svg
                className="w-3 h-3 text-gray-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </nav>
  );
}
