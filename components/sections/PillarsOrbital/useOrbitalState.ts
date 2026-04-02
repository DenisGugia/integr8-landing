"use client";
import { useState } from "react";

export function useOrbitalState() {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);

  const toggleItem = (id: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  return {
    expandedItems,
    rotationAngle,
    autoRotate,
    toggleItem,
    setRotationAngle,
    setAutoRotate,
  };
}
