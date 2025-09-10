import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVenues, getVenueDetails } from "../../features/venues/venueSlice";
import Navbar from "../../components/Navbar";
import HeroSlider from "../public/HeroSlider";
import BookingSidebar from "./BookingSidebar";
import { useState } from "react";
import axios from "../../api/axios";
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import GoogleMap from '../../components/googlemap/GoogleMap';
import { Card, CardContent, Typography, Accordion, AccordionSummary, AccordionDetails, Chip, Button, Stack, Box } from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const VenueDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { venue, error, loading } = useSelector((state) => state.venues);
    const { venues } = useSelector((state) => state.venues);
    console.log("venue: ", venue)

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [bookings, setBookings] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        dispatch(getVenueDetails(id));
    }, [dispatch, id]);


    useEffect(() => {
        if (venue) {
            dispatch(fetchVenues({ sport: venue?.sport || venue?.sports[0], location: "" }));
        }
    }, [venue]);

    // Fetch bookings for selected date
    const fetchBookings = async (date) => {
        if (!venue) return;
        try {
            const res = await axios.get("/api/bookings", {
                params: { venueId: venue._id, date: date.toISOString() }
            });
            setBookings(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchBookings(selectedDate);
    }, [venue, selectedDate]);

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!venue) return null;

    return (
        <div className="p-5 rounded-2xl min-h-screen bg-gray-100">
            <HeroSlider />

            <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-8 md:grid-rows-7">

                {/* Owner Sidebar */}
                <div className="w-full bg-white rounded-xl p-4 shadow-md overflow-y-auto md:col-span-2 md:row-span-7">
                    <div className="flex flex-col items-center mb-4">
                        <img
                            src={venue?.owner?.profilePic}
                            alt={venue?.owner?.name}
                            className="w-24 h-24 rounded-full object-cover mb-2"
                        />
                        <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">{venue?.owner?.role}</span>
                    </div>

                    <h3 className="text-center font-semibold text-lg mb-1">{venue?.owner?.name}</h3>
                    <div className="text-center text-yellow-400 mb-2">★ --</div>

                    <div className="text-center text-gray-600 text-sm mb-2">
                        <p>Email: <span className="text-gray-800">{venue?.owner?.email}</span></p>
                        <p>Phone: <span className="text-gray-800">{venue?.owner?.phone}</span></p>
                    </div>

                    <div className="text-center text-gray-500 text-xs mb-5">
                        Bengaluru, Bengaluru, Karnataka, India
                    </div>
                    <hr className="m-5" />

                    <div className="mb-4">
                        <iframe
                            src="https://www.google.com/maps?q=New+Bamboo+Bazaar+Bengaluru&output=embed"
                            className="w-full h-52 rounded-md border"
                            loading="lazy"
                        ></iframe>
                    </div>

                    <div className="text-center text-xs text-gray-600 mb-4">Adults & Kids</div>

                    <div className="text-center text-sm font-medium">Sports</div>
                    <div className="text-center text-sm text-gray-600">Cricket</div>
                </div>

                {/* Venue Images */}
                <div className="w-full bg-white rounded-xl overflow-hidden md:col-span-4 md:row-span-3">
                    {venue && venue?.images.length > 0 ? (
                        <Swiper
                            cssMode={true}
                            navigation={true}
                            pagination={true}
                            mousewheel={true}
                            keyboard={true}
                            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                            className="mySwiper justify-center items-center w-full h-full"
                        >
                            {venue?.images?.map((slide, index) => (
                                <SwiperSlide key={index}>
                                    <img
                                        src={typeof slide === "string" ? slide : slide.img}
                                        alt={venue.groundName}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        <div className="w-full h-56 bg-gray-200 flex items-center justify-center text-gray-500">
                            No Image
                        </div>
                    )}
                </div>

                {/* Right Sidebar: Details Cards */}
                <div className="w-full bg-gray-50 rounded-xl p-4 overflow-y-auto shadow-md space-y-4 md:col-span-2 md:row-span-7">
                    <Card variant="outlined" sx={{ borderRadius: 2, p: 2 }}>
                        <CardContent>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                About the Venue
                            </Typography>
                            <Typography variant="body2" color="text.secondary" textAlign="justify">
                                This premium turf is designed for cricket, football, and indoor sports. Equipped with floodlights, locker rooms, and professional coaching, perfect for casual play, tournaments, and coaching sessions.
                            </Typography>
                        </CardContent>
                    </Card>

                    <Card variant="outlined" sx={{ borderRadius: 2, p: 2 }}>
                        <CardContent>
                            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                                Amenities
                            </Typography>
                            <Stack direction="row" flexWrap="wrap" gap={1}>
                                {["Locker Room", "Showers", "Cafeteria", "Parking", "WiFi"].map((item, idx) => (
                                    <Chip key={idx} label={item} color="success" size="small" />
                                ))}
                            </Stack>
                        </CardContent>
                    </Card>

                    <Card variant="outlined" sx={{ borderRadius: 2, p: 2 }}>
                        <CardContent>
                            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                                Facilities
                            </Typography>
                            <Stack component="ul" spacing={1} sx={{ pl: 2 }}>
                                {[
                                    "Floodlights for night play",
                                    "Professional coaching",
                                    "Indoor seating",
                                    "Equipment rental",
                                    "First-aid station"
                                ].map((item, idx) => (
                                    <Typography component="li" key={idx} variant="body2" color="text.secondary">{item}</Typography>
                                ))}
                            </Stack>
                        </CardContent>
                    </Card>

                    <Card variant="outlined" sx={{ borderRadius: 2, p: 2 }}>
                        <CardContent>
                            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                                Venue Rules
                            </Typography>
                            <Stack spacing={1}>
                                {[
                                    { title: "Booking Rules", description: "Book at least 24 hours in advance. Cancellations allowed up to 12 hours prior." },
                                    { title: "Safety Rules", description: "Wear appropriate sports gear. No smoking or alcohol inside the premises." },
                                    { title: "Conduct Rules", description: "Respect staff and other players. Maintain cleanliness." }
                                ].map((rule, idx) => (
                                    <Accordion key={idx} elevation={1}>
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                            <Typography variant="body2" fontWeight="medium">{rule.title}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography variant="body2" color="text.secondary">{rule.description}</Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                ))}
                            </Stack>
                        </CardContent>
                    </Card>

                    <Card variant="outlined" sx={{ borderRadius: 2, p: 2 }}>
                        <CardContent>
                            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                                Opening Hours
                            </Typography>
                            <Stack spacing={0.5}>
                                {["Mon-Fri: 6:00 AM - 10:00 PM", "Sat-Sun: 7:00 AM - 11:00 PM"].map((hour, idx) => (
                                    <Typography key={idx} variant="body2" color="text.secondary">{hour}</Typography>
                                ))}
                            </Stack>
                        </CardContent>
                    </Card>

                    <Card variant="outlined" sx={{ borderRadius: 2, p: 2 }}>
                        <CardContent>
                            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                                Events & Tournaments
                            </Typography>
                            <Stack spacing={0.5}>
                                {["Weekend Cricket League", "Annual Football Tournament", "Summer Coaching Camp"].map((event, idx) => (
                                    <Typography key={idx} variant="body2" color="text.secondary">• {event}</Typography>
                                ))}
                            </Stack>
                        </CardContent>
                    </Card>

                    <Card variant="outlined" sx={{ borderRadius: 2, p: 2 }}>
                        <CardContent>
                            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                                Other Info
                            </Typography>
                            <Stack spacing={0.5}>
                                {[
                                    "Free Parking Available",
                                    "Nearby Metro Station: MG Road",
                                    "Coaching available for kids & adults",
                                    "Follow us: @premiumturf on Instagram & Twitter"
                                ].map((item, idx) => (
                                    <Typography key={idx} variant="body2" color="text.secondary">• {item}</Typography>
                                ))}
                            </Stack>
                        </CardContent>
                    </Card>
                </div>

                {/* Related Venues */}
                <div className="w-full flex gap-3 p-2 rounded-2xl overflow-x-auto md:col-span-4 md:row-span-3">
                    {venues && venues.slice(0, 3).map((venue) => (
                        <div
                            key={venue._id}
                            className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition cursor-pointer min-w-[297px]"
                        >
                            {venue.images && venue.images.length > 0 ? (
                                <img
                                    src={venue.images[0]}
                                    alt={venue.groundName}
                                    className="w-full h-56 object-cover rounded-t-2xl"
                                />
                            ) : (
                                <div className="w-full h-56 bg-gray-200 flex items-center justify-center text-gray-500">
                                    No Image
                                </div>
                            )}
                            <div className="p-4">
                                <h2 className="text-lg font-bold text-gray-800 mb-1">{venue.groundName}</h2>
                                <div className="flex items-center mb-2">
                                    <span className="text-sm">Price: </span>
                                    <p className="text-green-600 font-semibold text-sm ml-1">
                                        ₹ {venue.price} / {venue.priceType}
                                    </p>
                                </div>
                                {venue.rating && (
                                    <div className="flex items-center mb-2">
                                        <span className="text-yellow-500 font-semibold text-sm">⭐ {venue.rating.toFixed(1)}</span>
                                    </div>
                                )}
                                <div className="text-gray-600 text-sm">
                                    Location: {venue.groundAddress || "N/A"}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Availability */}
                <div className="w-full bg-gray-50 rounded-xl p-4 overflow-y-auto shadow-md space-y-4 md:col-span-4 md:col-start-3 md:row-start-4">
                    <div>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Available on
                        </Typography>
                        <div className="w-full flex justify-between items-center">
                            <Stack direction="row" spacing={1} flexWrap="wrap">
                                {[
                                    { day: "Mon", available: true },
                                    { day: "Tue", available: true },
                                    { day: "Wed", available: false },
                                    { day: "Thu", available: true },
                                    { day: "Fri", available: false },
                                    { day: "Sat", available: true },
                                    { day: "Sun", available: true },
                                ].map((item, idx) => (
                                    <Chip
                                        key={idx}
                                        label={item.day}
                                        size="large"
                                        icon={item.available ? <CheckCircleIcon color="success" /> : <WarningAmberIcon color="warning" />}
                                        variant="outlined"
                                    />
                                ))}
                            </Stack>
                            <Box textAlign="center">
                                <Button variant="contained" color="primary" size="small" onClick={() => setIsSidebarOpen(true)}>
                                    Book Now
                                </Button>
                            </Box>
                        </div>
                    </div>
                </div>

            </div>

            <BookingSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                venue={venue}
                price={venue.price}
                bookings={bookings}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
            />
        </div>
    );

};

export default VenueDetails;
