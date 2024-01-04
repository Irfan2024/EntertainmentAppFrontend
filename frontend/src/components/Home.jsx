import React, { useState, useEffect } from "react";
import Sidebar from "./layout/Sidebar";
import Slider from "react-slick";
import "../styles/Home.style.css";
import Searchbar from "./layout/SearchBar";
import Topbar from "./layout/Topbar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addBookmark,
  fetchBookmarks,
  fetchTrending,
  setSelectedItem,
} from "../redux/contentSlices";
import Loading from "./Loading";
const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [displayItems, setDisplayItems] = useState([]);
  const [slidesToShow, setSlidesToShow] = useState(1); // State to hold the number of slides to show
  // below is redux trending data code
  const bookMarkItems = useSelector((state) => state.content.bookmarks);
  const trendingData = useSelector((state) => state.content.trending);
  const searchItems = useSelector((state) => state.content.searchResults);
  const searchData = searchItems.message; // This will render if the search item is there
  const searchW = useSelector((state) => state.content.searchWord); // This will give the input Words
  // Below code is for showing the item information
  const handleItemClick = (selectedCard) => {
    dispatch(setSelectedItem(selectedCard));
    navigate("/ItemInformationPage");
  };
  useEffect(() => {
    dispatch(fetchBookmarks());
    dispatch(fetchTrending())
      .then(() => setIsLoading(false))
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setIsLoading(false);
      });
  }, [dispatch]);
  // Below code is to set searchData
  useEffect(() => {
    if (searchData && searchW.length > 0) {
      setIsSearchActive(true);
      setDisplayItems(searchData);
    } else {
      setIsSearchActive(false);
      setDisplayItems(trendingData);
    }
  }, [searchData, trendingData, searchW]);
  // Below is the selecting bookmark code
  const toggleBookmark = (itemId) => {
    dispatch(addBookmark(itemId)).then(() => {
      dispatch(fetchBookmarks());
      dispatch(fetchTrending());
    });
  };
  const searchDataLength = searchW ? searchW.length : 0;
  // Below code is to check the sized of screen using useState and change the side & top bar.
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // Below code is for slider image
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1300) {
        setSlidesToShow(3); // Showing 3 slides on laptops (screen width > 768px)
      } else if (window.innerWidth > 850) {
        setSlidesToShow(2); // Showing 2 slides on laptops (screen width > 768px)
      } else if (window.innerWidth > 630) {
        setSlidesToShow(1.5); // Showing 1.5 slides on laptops (screen width > 768px)
      } else {
        setSlidesToShow(1); // Show 1.5 slides on smaller devices
      }
    };
    // Event listener for window resize
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call to set the initial number of slides
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [[dispatch]]);
  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: slidesToShow,
    swipeToSlide: true,
  };
  return (
    <>
      {window.innerWidth < 700 && <Topbar />}
      <div className="flex " style={{ backgroundColor: "#10141E" }}>
        {window.innerWidth > 700 && <Sidebar />}
        <div className="flex flex-1  justify-center">
          <div className="w-full mx-5">
            <Searchbar />
            <div>
              {isLoading ? (
                <Loading />
              ) : (
                <div className="grid grid-cols-1 ">
                  <div className="text-white ">
                    {searchDataLength === 0 && (
                      <div>
                        <h1 class="custom-heading">
                          <span class="gradient-text">Trending</span>
                        </h1>
                        <Slider {...settings}>
                          {trendingData.map((card) => (
                            <div key={card._id}>
                              <div className="card Trend grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
                                <div className="image-container">
                                  <img
                                    src={`https://image.tmdb.org/t/p/w500/${card.poster_path}`}
                                    alt="Irfan"
                                  />
                                  <div className="play-overlay">
                                    <div className="text-white  flex justify-center items-center">
                                      <div
                                        className="relative w-24 h-24"
                                        onClick={() => handleItemClick(card)}
                                      >
                                        <div className="absolute  top-0px left-1px w-20 h-12  rounded-full border border-white "></div>
                                        {/* Play icon */}
                                        <div className="absolute w-7 h-7 rounded-full bg-white border border-gray-300 flex justify-center items-center left-2  top-2.5">
                                          <svg
                                            className="w-5 h-5 text-gray-500 transform rotate-120 "
                                            fill="none"
                                            viewBox="0 0 20 24"
                                            stroke="currentColor"
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth="2"
                                              d="M5 3l14 9-14 9V3z"
                                            />
                                          </svg>
                                        </div>
                                        {/* Text code */}
                                        <div className="absolute w-14 h-14 rounded-full   items-center left-10  bottom-7">
                                          <span className="text-white">
                                            Play
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="Tinfo">
                                    <div
                                      className="bookmark-icon"
                                      onClick={() => toggleBookmark(card._id)}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-6 h-6 m-1"
                                        fill={
                                          bookMarkItems.find(
                                            (item) => item._id === card._id
                                          )
                                            ? "white"
                                            : "none"
                                        }
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                                        />
                                      </svg>
                                    </div>
                                  </div>
                                  <div className="TinfoB">
                                    <div className="year-logo ">
                                      <span>
                                        {card.release_date
                                          ? card.release_date.substring(0, 4)
                                          : card.first_air_date.substring(0, 4)}
                                      </span>
                                      <span>
                                        {card.movie_id ? (
                                          <>
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              viewBox="0 0 24 24"
                                              className="w-8 h-6 white-icon "
                                            >
                                              <path
                                                fillRule="evenodd"
                                                d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 18.375V5.625zm1.5 0v1.5c0 .207.168.375.375.375h1.5a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-1.5A.375.375 0 003 5.625zm16.125-.375a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h1.5A.375.375 0 0021 7.125v-1.5a.375.375 0 00-.375-.375h-1.5zM21 9.375A.375.375 0 0020.625 9h-1.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h1.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-1.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h1.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-1.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h1.5a.375.375 0 00.375-.375v-1.5zM4.875 18.75a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-1.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h1.5zM3.375 15h1.5a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-1.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375zm0-3.75h1.5a.375.375 0 00.375-.375v-1.5A.375.375 0 004.875 9h-1.5A.375.375 0 003 9.375v1.5c0 .207.168.375.375.375zm4.125 0a.75.75 0 000 1.5h9a.75.75 0 000-1.5h-9z"
                                                clipRule="evenodd"
                                              />
                                            </svg>
                                          </>
                                        ) : (
                                          <>
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              viewBox="0 0 24 24"
                                              fill="#FFFFFF"
                                              className="w-6 h-6 "
                                            >
                                              <path d="M19.5 6h-15v9h15V6z" />
                                              <path
                                                fillRule="evenodd"
                                                d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v11.25C1.5 17.16 2.34 18 3.375 18H9.75v1.5H6A.75.75 0 006 21h12a.75.75 0 000-1.5h-3.75V18h6.375c1.035 0 1.875-.84 1.875-1.875V4.875C22.5 3.839 21.66 3 20.625 3H3.375zm0 13.5h17.25a.375.375 0 00.375-.375V4.875a.375.375 0 00-.375-.375H3.375A.375.375 0 003 4.875v11.25c0 .207.168.375.375.375z"
                                                clipRule="evenodd"
                                              />
                                            </svg>
                                          </>
                                        )}
                                      </span>
                                      <span>
                                        <p>PG</p>
                                      </span>
                                    </div>
                                    {card.movie_id ? (
                                      <p>{card.original_title}</p>
                                    ) : (
                                      <p>{card.original_name}</p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </Slider>
                      </div>
                    )}
                    <div>
                      {searchDataLength > 0 ? (
                        <h1 class="custom-heading">
                          <span class="gradient-text">{`Found ${displayItems.length} result for "${searchW}" `}</span>
                        </h1>
                      ) : (
                        <h1 class="custom-heading">
                          <span class="gradient-text">Recommended</span>
                        </h1>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2  ">
                        {displayItems.map((card) => (
                          <div key={card._id} className="card Recommen mr-4">
                            <div className="image-container">
                              <img
                                src={`https://image.tmdb.org/t/p/w500/${card.poster_path}`}
                                alt="Irfan"
                              />
                              <div className="play-overlay">
                                <div className="text-white  flex justify-center items-center">
                                  <div
                                    className="relative w-24 h-24"
                                    onClick={() => handleItemClick(card)}
                                  >
                                    <div className="absolute  top-0px left-1px w-20 h-12  rounded-full border border-white "></div>
                                    <div className="absolute w-7 h-7 rounded-full bg-white border border-gray-300 flex justify-center items-center left-2  top-2.5">
                                      <svg
                                        className="w-5 h-5 text-gray-500 transform rotate-120 "
                                        fill="none"
                                        viewBox="0 0 20 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M5 3l14 9-14 9V3z"
                                        />
                                      </svg>
                                    </div>
                                    <div className="absolute w-14 h-14 rounded-full   items-center left-10  bottom-7">
                                      <span className="text-white">Play</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="rinfo">
                              <div
                                className="bookmark-icon"
                                onClick={() => toggleBookmark(card._id)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="w-6 h-6 m-1"
                                  fill={
                                    bookMarkItems.find(
                                      (item) => item._id === card._id
                                    )
                                      ? "white"
                                      : "none"
                                  }
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                                  />
                                </svg>
                              </div>
                            </div>
                            <div className="details">
                              <div className="tags">
                                <span>
                                  {card.release_date
                                    ? card.release_date.substring(0, 4)
                                    : card.first_air_date.substring(0, 4)}
                                </span>
                                <span>
                                  {card.movie_id ? (
                                    <>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        className="w-8 h-6 white-icon "
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 18.375V5.625zm1.5 0v1.5c0 .207.168.375.375.375h1.5a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-1.5A.375.375 0 003 5.625zm16.125-.375a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h1.5A.375.375 0 0021 7.125v-1.5a.375.375 0 00-.375-.375h-1.5zM21 9.375A.375.375 0 0020.625 9h-1.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h1.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-1.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h1.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-1.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h1.5a.375.375 0 00.375-.375v-1.5zM4.875 18.75a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-1.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h1.5zM3.375 15h1.5a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-1.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375zm0-3.75h1.5a.375.375 0 00.375-.375v-1.5A.375.375 0 004.875 9h-1.5A.375.375 0 003 9.375v1.5c0 .207.168.375.375.375zm4.125 0a.75.75 0 000 1.5h9a.75.75 0 000-1.5h-9z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                    </>
                                  ) : (
                                    <>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="#FFFFFF"
                                        className="w-6 h-6 mx-2"
                                      >
                                        <path d="M19.5 6h-15v9h15V6z" />
                                        <path
                                          fillRule="evenodd"
                                          d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v11.25C1.5 17.16 2.34 18 3.375 18H9.75v1.5H6A.75.75 0 006 21h12a.75.75 0 000-1.5h-3.75V18h6.375c1.035 0 1.875-.84 1.875-1.875V4.875C22.5 3.839 21.66 3 20.625 3H3.375zm0 13.5h17.25a.375.375 0 00.375-.375V4.875a.375.375 0 00-.375-.375H3.375A.375.375 0 003 4.875v11.25c0 .207.168.375.375.375z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                    </>
                                  )}
                                </span>
                                <span>
                                  <p>PG</p>
                                </span>
                              </div>
                              {card.movie_id ? (
                                <p>{card.original_title}</p>
                              ) : (
                                <p>{card.original_name}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
