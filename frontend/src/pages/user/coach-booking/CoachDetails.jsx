import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCoachDetails } from "../../../features/coach/coachBookingSlice"; // create this slice
import Navbar from "../../../components/Navbar";
import HeroSlider from "../../public/HeroSlider";
import CoachSidebar from "./CoachSidebar";

const CoachDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { coachDetails, error, loading } = useSelector((state) => state.coaches);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const [bookings, setBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // console.log("selectedDate: ", selectedDate.toISOString().split("T")[0])

  // const formattedDate = useMemo(
  //   () => selectedDate.toISOString().split("T")[0],
  //   [selectedDate]
  // );

  useEffect(() => {
    dispatch(getCoachDetails(id));
  }, [dispatch, id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!coachDetails) return null;

  return (
    <div className="max-w-3xl md:mx-auto p-6 bg-white shadow-md rounded-lg mt-24 mx-2">
      <Navbar />
      <HeroSlider />

      {/* Coach Info */}
      <h1 className="text-3xl font-bold mb-2">{coachDetails.name}</h1>
      <p className="text-gray-600 mb-2">{coachDetails.sport}</p>
      <p className="mb-4">{coachDetails.bio}</p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <p><span className="font-semibold">Experience:</span> {coachDetails.experienceYears} years</p>
        <p>
          <span className="font-semibold">Price:</span> ₹{coachDetails.pricing?.amount} ({coachDetails.pricing?.type})
        </p>
        <p><span className="font-semibold">Status:</span> {coachDetails.status}</p>
        <p>
          <span className="font-semibold">Location:</span> {coachDetails.location?.address}, {coachDetails.location?.city}, {coachDetails.location?.state}
        </p>
      </div>

      {/* Ratings */}
      <div className="mb-4">
        <p className="font-semibold">Rating: ⭐ {coachDetails.rating} / 5</p>
        <p className="text-sm text-gray-500">({coachDetails.numReviews} reviews)</p>
      </div>

      {/* Book Button */}
      <button
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        onClick={() => coachDetails._id && setIsSidebarOpen(true)}
      >
        Book Now
      </button>

      {isSidebarOpen && coachDetails && (
        <CoachSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          coach={coachDetails}
          price={coachDetails.pricing?.amount}
          // selectedDate={new Date("2025-09-10")}
          // setSelectedDate={setSelectedDate}
        />
      )}
    </div>
  );
};

export default CoachDetails;
