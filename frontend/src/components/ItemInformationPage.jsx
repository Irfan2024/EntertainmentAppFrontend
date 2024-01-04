import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// Function to map genre IDs to their names
const mapGenres = (id) => {
  // Replaceing the following genreData with your actual genre ID
  const genreData = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" },
    { id: 10759, name: "Action & Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 10762, name: "Kids" },
    { id: 10763, name: "News" },
    { id: 10764, name: "Reality" },
    { id: 10765, name: "Sci-Fi & Fantasy" },
    { id: 10766, name: "Soap" },
    { id: 10767, name: "Talk" },
    { id: 10768, name: "War & Politics" },
  ];
  const genre = genreData.find((genre) => genre.id === id);
  return genre;
};
const ItemInformationPage = () => {
  console.log("Item Info page  is clicked");
  const selectedItem = useSelector((state) => state.content.selectedItem);
  const navigate = useNavigate();
  const movie = selectedItem.movie_id;
  // Below is genres code
  const genres = selectedItem.genres || [];
  // Function to calculate the percentage of rating out of 10
  const getStarPercentage = (rating) => {
    return (rating / 10) * 100;
  };
  // Function to render stars based on the percentage
  const renderStars = (percentage) => {
    const starPercentage = `${Math.max(0, Math.min(100, percentage))}%`;
    const filledStars = Math.floor(percentage / 20);
    const emptyStars = 5 - filledStars;
    return (
      <div className="stars" style={{ fontSize: "24px" }}>
        <span style={{ width: starPercentage }}>
          {[...Array(filledStars)].map((_, index) => (
            <span key={index}>★</span>
          ))}
          {[...Array(emptyStars)].map((_, index) => (
            <span key={index}>☆</span>
          ))}
        </span>
      </div>
    );
  };
  return (
    <>
      <div
        className="text-white"
        style={{ maxWidth: "100%", maxHeight: "100vh", overflow: "auto" }}
      >
        {selectedItem && (
          <div className="grid grid-cols-12 gap-4 m-10">
            <div className="col-span-5">
              <img
                src={`https://image.tmdb.org/t/p/w500/${selectedItem.poster_path}`}
                alt="Poster"
                style={{ maxWidth: "100%", maxHeight: "87vh" }}
              />
            </div>
            <div className="col-span-7">
              <button
                onClick={() => navigate(-1)}
                className="bg-transparent hover:bg-red-500 text-white-700 font-semibold hover:text-white py-2 px-4 border border-red-700 hover:border-transparent rounded"
              >
                Go Back
              </button>
              <h1 className="text-2xl font-bold">
                {movie ? (
                  <> {selectedItem.title}</>
                ) : (
                  <> {selectedItem.original_name}</>
                )}
              </h1>
              <div className="flex items-center my-5">
                <span className="text-2xl font-bold ">
                  {selectedItem.rating}
                </span>

                <span className="mx-7">
                  {renderStars(getStarPercentage(selectedItem.rating))}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4  my-5">
                <div>
                  <p className="font-bold text-gray-500">Language</p>
                  <p className="font-bold">English</p>
                </div>

                <div>
                  <p className="font-bold text-gray-500">Status</p>
                  <p className="font-bold">N/A</p>
                </div>
                <div>
                  {movie ? (
                    <>
                      <p className="font-bold text-gray-500"> Length</p>
                      <p className="font-bold ">N/A</p>
                    </>
                  ) : (
                    <>
                      <p className="font-bold text-gray-500"> First Air</p>
                      <p className="font-bold">
                        {selectedItem.first_air_date.substring(0, 4)}
                      </p>
                    </>
                  )}
                </div>
                <div>
                  {movie ? (
                    <>
                      <p className="text-gray-500 ">Year</p>
                      <p className="font-bold">
                        {selectedItem.release_date.substring(0, 4)}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="font-bold text-gray-500">Last Air</p>
                      <p className="font-bold">
                        {selectedItem.last_air_date || "N/A"}
                      </p>
                    </>
                  )}
                </div>
              </div>
              <div className=" my-5">
                <h1 className="font-bold my-2 mb-2">Genres</h1>
                <div className="genre-container flex flex-wrap gap-2">
                  {genres.map((genreId, index) => (
                    <span
                      key={index}
                      className="text-gray-700 rounded-md bg-white px-2 py-0.5 mx-1 "
                    >
                      {mapGenres(genreId)?.name}
                    </span>
                  ))}
                </div>
              </div>
              <div className="my-5">
                <h1 className="font-bold mb-1">Synopsis </h1>
                <h1> {selectedItem.synopsis}</h1>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ItemInformationPage;
