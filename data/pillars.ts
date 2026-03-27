import { Dumbbell, Apple, Scale, Activity, Footprints, Droplets, Moon, Camera } from "lucide-react";
import type { ElementType } from "react";

export interface Pillar {
  id: number;
  icon: ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

export const pillars: Pillar[] = [
  { id: 1, icon: Dumbbell,    relatedIds: [7, 8], status: "completed",   energy: 95 },
  { id: 2, icon: Apple,       relatedIds: [3, 5], status: "completed",   energy: 90 },
  { id: 3, icon: Scale,       relatedIds: [2, 4], status: "completed",   energy: 85 },
  { id: 4, icon: Activity,    relatedIds: [3, 8], status: "in-progress", energy: 80 },
  { id: 5, icon: Footprints,  relatedIds: [2, 6], status: "in-progress", energy: 75 },
  { id: 6, icon: Droplets,    relatedIds: [4, 5], status: "pending",     energy: 70 },
  { id: 7, icon: Moon,        relatedIds: [1, 8], status: "pending",     energy: 88 },
  { id: 8, icon: Camera,      relatedIds: [1, 4], status: "pending",     energy: 92 },
];
