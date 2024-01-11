// Import necessary dependencies and styles
import jsonData from "./data/db.json";
import React, { useState } from "react";
import "./App.css";

const Home = () => {
  const trips = jsonData.trips;
  const [searchTag, setSearchTag] = useState("");
  const [showFullDescription, setShowFullDescription] = useState(false);

  const filteredTrips = trips.filter((trip) =>
    trip.tags.some((tag) =>
      tag.trim().toLowerCase().includes(searchTag.trim().toLowerCase())
    )
  );

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <header className="my-10 text-6xl text-center text-sky-500">
        <p>เที่ยวไหนดี</p>
      </header>

      <div className="flex my-8 items-center justify-center">
        <input
          className="w-96 text-sm text-center p-2 border-b-2 border-gray-500 outline-none bg-transparent focus:border-blue-500 placeholder-gray-500"
          type="text"
          placeholder="หาที่เที่ยวแล้วไปกัน..."
          value={searchTag}
          onChange={(event) => setSearchTag(event.target.value)}
        />
      </div>

      <div className=" grid grid-cols-1 justify-center max-w-4xl">
        {filteredTrips.map((trip) => (
          <div className="" key={trip.eid}>
            <div className="grid grid-cols-2 gap-5">
              <div className="flex justify-center col-end-1">
                <img
                  className="w-48 h-72 rounded-md"
                  src={trip.photos[0]}
                  alt={`Trip Photo`}
                />
              </div>
              <div className="right flex-col col-span-2">
                <h2 className="my-2 text-xl font-semibold">{trip.title}</h2>
                <div className=" text-gray-500">
                  {/* Display either the full description or a truncated version */}
                  {showFullDescription
                    ? trip.description
                    : `${trip.description.slice(0, 60)}...`}

                  {/* Show "Read More" link if the description is longer than 150 characters */}
                  {trip.description.length > 60 && (
                    <span
                      className="cursor-pointer text-sky-500"
                      onClick={toggleDescription}
                    >
                      {showFullDescription ? " อ่านน้อยลง" : " อ่านต่อ"}
                    </span>
                  )}
                </div>

                <div className="flex items-center text-xs text-gray-500">
                  <p className="">หมวด:</p>
                  <ul className="mx-3 flex list-none gap-2">
                    {trip.tags.map((tag, index) => (
                      <li key={index} className="">
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="my-20 flex gap-5 w-24 h-28 ">
                  <img
                    className="rounded-xl"
                    src={trip.photos[1]}
                    alt={`Trip Photo`}
                  />
                  <img
                    className="rounded-xl"
                    src={trip.photos[2]}
                    alt={`Trip Photo`}
                  />
                  <img
                    className="rounded-xl"
                    src={trip.photos[3]}
                    alt={`Trip Photo`}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
