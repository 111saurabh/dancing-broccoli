import { useState } from "react";
import { Box, Button, Input } from "@chakra-ui/react";

type LocationInputProps = {
  onLocationSelect: (lng: number, lat: number) => void;
};

export const LocationInput = ({ onLocationSelect }: LocationInputProps) => {
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    try {
      // Added Mapbox integration with environment variable
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?` +
          new URLSearchParams({
            access_token: import.meta.env.VITE_MAPBOX_TOKEN,
          })
      );

      const data = await response.json();
      if (data.features?.[0]?.center) {
        const [lng, lat] = data.features[0].center;
        onLocationSelect(lng, lat);
      }
    } catch (error) {
      console.error("Geocoding error:", error);
    }
  };

  return (
    <Box>
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter location"
      />
      <Button onClick={handleSearch} mt={2}>
        Search
      </Button>
    </Box>
  );
};
