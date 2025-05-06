import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../firebase/AuthContext";

type UserProfile = {
  id: string;
  name: string;
  skills: string[];
  location: string;
  bio: string;
};

export default function Swipe() {
  const { currentUser } = useAuth();
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // TODO: Connect to backend API
  const mockProfiles: UserProfile[] = [
    {
      id: "1",
      name: "Sarah",
      skills: ["React", "TypeScript"],
      location: "New York",
      bio: "Looking to improve my frontend skills",
    },
    {
      id: "2",
      name: "Mike",
      skills: ["Node.js", "Express"],
      location: "London",
      bio: "Backend developer wanting to learn DevOps",
    },
  ];

  const handleSwipe = async (direction: "left" | "right") => {
    try {
      const response = await fetch("/api/matches", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUser?.uid,
          targetUserId: profiles[currentIndex].id,
          direction,
        }),
      });

      if (!response.ok) throw new Error("Match failed");
      setCurrentIndex((prev) => prev + 1);
    } catch (error) {
      console.error("Swipe error:", error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="relative w-96 h-[600px]">
        {mockProfiles.map((profile, index) => (
          <motion.div
            key={profile.id}
            animate={{ scale: index === currentIndex ? 1 : 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="absolute w-full h-full bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">{profile.name}</h2>
              <div className="mb-4">
                <span className="font-semibold">Skills:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {profile.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <span className="font-semibold">Location:</span>
                <p className="mt-1">{profile.location}</p>
              </div>
              <p className="text-gray-600">{profile.bio}</p>

              {index === currentIndex && (
                <div className="absolute bottom-6 left-0 right-0 flex justify-between px-6">
                  <button
                    onClick={() => handleSwipe("left")}
                    className="p-4 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600"
                  >
                    ✕
                  </button>
                  <button
                    onClick={() => handleSwipe("right")}
                    className="p-4 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600"
                  >
                    ✓
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
