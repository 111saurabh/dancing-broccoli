import {
  ChakraProvider,
  Box,
  Flex,
  Heading,
  Button,
  Alert,
  AlertIcon,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
} from "@chakra-ui/react";
import { Suspense, useState } from "react";
import { AuthProvider } from "./providers/AuthProvider";
import { LocationInput } from "./components/LocationInput";
import Loader from "./components/Loader";
import { SkillCard } from "./components/SkillCard";
import { haversineDistance } from "./utils/geo";

const mockSkills = [
  {
    skillName: "Graphic Design",
    skillDescription: "Professional logo and branding design",
    user: { name: "Sarah", rating: 4.8 },
    location: { lng: -73.935242, lat: 40.73061 },
  },
  {
    skillName: "React Development",
    skillDescription: "Frontend development with TypeScript",
    user: { name: "Mike", rating: 4.5 },
    location: { lng: -73.98513, lat: 40.758896 },
  },
];

function App() {
  const [selectedLocation, setSelectedLocation] = useState<{
    lng: number;
    lat: number;
  } | null>(null);
  const [radius, setRadius] = useState<number>(5);
  const [locationError, setLocationError] = useState<string>("");

  const handleLocationSelect = (lng: number, lat: number) => {
    setSelectedLocation({ lng, lat });
    setLocationError("");
  };

  const handleConnect = (skillName: string) => {
    alert(`You showed interest in ${skillName}`);
  };

  const filterSkillsByLocation = () => {
    if (!selectedLocation) return mockSkills;
    return mockSkills.filter((skill) => {
      const distance = haversineDistance(
        selectedLocation.lat,
        selectedLocation.lng,
        skill.location.lat,
        skill.location.lng
      );
      return distance <= radius;
    });
  };

  return (
    <ChakraProvider>
      <AuthProvider>
        <Flex direction="column" minH="100vh">
          <Box bg="blue.600" p={4} color="white">
            <Flex justify="space-between" align="center">
              <Heading size="lg">SkillSwap</Heading>
              <Button colorScheme="teal">Sign In</Button>
            </Flex>
          </Box>

          <Flex flex={1} p={8} direction="column" align="center">
            <Box width="100%" maxW="2xl">
              <Heading mb={8} textAlign="center">
                Exchange Skills in Your Neighborhood
              </Heading>

              <Suspense fallback={<Loader />}>
                <LocationInput onLocationSelect={handleLocationSelect} />

                <Box mb={6} width="100%">
                  <Text mb={2}>Search Radius: {radius}km</Text>
                  <Slider
                    aria-label="search-radius"
                    value={radius}
                    min={1}
                    max={50}
                    step={1}
                    onChange={setRadius}
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </Box>

                {locationError && (
                  <Alert status="error" mb={4}>
                    <AlertIcon />
                    {locationError}
                  </Alert>
                )}

                <Box mt={8}>
                  {filterSkillsByLocation().map((skill) => (
                    <SkillCard
                      key={skill.skillName}
                      {...skill}
                      distance={
                        selectedLocation
                          ? haversineDistance(
                              selectedLocation.lat,
                              selectedLocation.lng,
                              skill.location.lat,
                              skill.location.lng
                            )
                          : undefined
                      }
                      onConnect={() => handleConnect(skill.skillName)}
                    />
                  ))}
                </Box>
              </Suspense>
            </Box>
          </Flex>

          <Box bg="gray.100" p={4} mt="auto">
            <Text textAlign="center">
              © 2024 SkillSwap - Connecting Communities Through Skills
            </Text>
          </Box>
        </Flex>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
