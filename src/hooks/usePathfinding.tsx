import { useContext } from "react";
import { PathfindingContext } from "../context/PathfindingContext";
// Custom hook to access the PathfindingContext
export const usePathfinding = () => {
  const context = useContext(PathfindingContext);

  if (!context) {
    throw new Error("usePathfinding must be used within a PathfindingProvider");
  }

  return context;
};