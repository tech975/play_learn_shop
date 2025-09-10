    import React from "react";
    import { GoogleMap, LoadScript, Marker  } from "@react-google-maps/api";

    const containerStyle = {
        width: '100%',
        height: '400px'
    };

    const center = {
        lat: 12.9716,   // Example latitude (Bengaluru)
        lng: 77.5946    // Example longitude
    };

    const GoggleMap = () => {
        console.log("Google Maps API Key:", process.env.GOOGLE_MAPS_API_KEY);

        return (
            <LoadScript googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={14}
                >
                    <Marker position={center} />
                </GoogleMap>
            </LoadScript>
        );
    };

    export default GoggleMap;
