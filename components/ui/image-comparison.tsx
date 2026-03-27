"use client";

import { cn } from "@/lib/utils";
import { useState, createContext, useContext } from "react";
import {
  motion,
  type MotionValue,
  type SpringOptions,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

const ImageComparisonContext = createContext<
  | {
      sliderPosition: number;
      setSliderPosition: (pos: number) => void;
      motionSliderPosition: MotionValue<number>;
    }
  | undefined
>(undefined);

export type ImageComparisonProps = {
  children: React.ReactNode;
  className?: string;
  enableHover?: boolean;
  springOptions?: SpringOptions;
  controlledPosition?: MotionValue<number>;
};

const DEFAULT_SPRING_OPTIONS = { bounce: 0, duration: 0 };

export function ImageComparison({
  children,
  className,
  enableHover,
  springOptions,
  controlledPosition,
}: ImageComparisonProps) {
  const [isDragging, setIsDragging] = useState(false);
  const internalMotionValue = useMotionValue(50);
  const internalSpring = useSpring(
    internalMotionValue,
    springOptions ?? DEFAULT_SPRING_OPTIONS
  );
  const motionSliderPosition = controlledPosition ?? internalSpring;
  const [sliderPosition, setSliderPosition] = useState(50);

  const isControlled = !!controlledPosition;

  const handleDrag = (event: React.MouseEvent | React.TouchEvent) => {
    if (isControlled) return;
    if (!isDragging && !enableHover) return;
    const containerRect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x =
      "touches" in event
        ? event.touches[0].clientX - containerRect.left
        : (event as React.MouseEvent).clientX - containerRect.left;
    const percentage = Math.min(Math.max((x / containerRect.width) * 100, 0), 100);
    internalMotionValue.set(percentage);
    setSliderPosition(percentage);
  };

  return (
    <ImageComparisonContext.Provider
      value={{ sliderPosition, setSliderPosition, motionSliderPosition }}
    >
      <div
        className={cn(
          "relative overflow-hidden select-none",
          enableHover && !isControlled && "cursor-ew-resize",
          className
        )}
        onMouseMove={handleDrag}
        onMouseDown={() => !enableHover && !isControlled && setIsDragging(true)}
        onMouseUp={() => !enableHover && !isControlled && setIsDragging(false)}
        onMouseLeave={() => !enableHover && !isControlled && setIsDragging(false)}
        onTouchMove={handleDrag}
        onTouchStart={() => !enableHover && !isControlled && setIsDragging(true)}
        onTouchEnd={() => !enableHover && !isControlled && setIsDragging(false)}
      >
        {children}
      </div>
    </ImageComparisonContext.Provider>
  );
}

export function ImageComparisonImage({
  className,
  alt,
  src,
  position,
}: {
  className?: string;
  alt: string;
  src: string;
  position: "left" | "right";
}) {
  const ctx = useContext(ImageComparisonContext);
  if (!ctx) throw new Error("ImageComparisonImage must be inside ImageComparison");
  const { motionSliderPosition } = ctx;
  const leftClipPath = useTransform(
    motionSliderPosition,
    (value) => `inset(0 0 0 ${value}%)`
  );
  const rightClipPath = useTransform(
    motionSliderPosition,
    (value) => `inset(0 ${100 - value}% 0 0)`
  );

  return (
    <motion.img
      src={src}
      alt={alt}
      className={cn("absolute inset-0 h-full w-full object-cover", className)}
      style={{ clipPath: position === "left" ? leftClipPath : rightClipPath }}
    />
  );
}

export function ImageComparisonSlider({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const ctx = useContext(ImageComparisonContext);
  if (!ctx) throw new Error("ImageComparisonSlider must be inside ImageComparison");
  const { motionSliderPosition } = ctx;
  const left = useTransform(motionSliderPosition, (value) => `${value}%`);

  return (
    <motion.div
      className={cn("absolute top-0 bottom-0 w-1 cursor-ew-resize", className)}
      style={{ left }}
    >
      {children}
    </motion.div>
  );
}
