import { useState } from "react";
import Select from "react-select";
import { useAuth } from "../firebase/AuthContext";
import { LocationInput } from "./LocationInput";

type SkillOption = {
  value: string;
  label: string;
  proficiency: "beginner" | "intermediate" | "expert";
};

export default function Onboarding() {
  const { currentUser } = useAuth();
  const [skills, setSkills] = useState<SkillOption[]>([]);
  const [location, setLocation] = useState<{ lng: number; lat: number } | null>(null);

  const skillOptions: SkillOption[] = [
    { value: "react", label: "React", proficiency: "beginner" },
    { value: "node", label: "Node.js", proficiency: "intermediate" },
    { value: "typescript", label: "TypeScript", proficiency: "expert" },
  ];

  const handleLocationSelect = (lng: number, lat: number) => {
    setLocation({ lng, lat });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to backend API
    console.log({ skills, location });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Complete Your Profile
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Your Skills</label>
          <Select
            isMulti
            options={skillOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(selected) => setSkills(selected as SkillOption[])}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Your Location</label>
          <LocationInput onLocationSelect={handleLocationSelect} />
          {location && (
            <div className="text-sm text-gray-500 mt-2">
              Selected: lng {location.lng}, lat {location.lat}
            </div>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Complete Setup
        </button>
      </form>
    </div>
  );
}
