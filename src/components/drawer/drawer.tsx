import { ReactNode, useEffect, useState, TouchEvent } from "react";
import "./drawer.scss";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

function Drawer({ isOpen, onClose, children }: DrawerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setCurrentY(0);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleTouchStart = (e: TouchEvent) => {
    setStartY(e.touches[0].clientY);
    setIsDragging(true);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;

    const deltaY = e.touches[0].clientY - startY;
    if (deltaY < 0) return; // Prevent dragging up

    setCurrentY(deltaY);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;

    setIsDragging(false);
    if (currentY > 150) {
      // Threshold to close
      onClose();
    } else {
      setCurrentY(0); // Reset position
    }
  };

  if (!isVisible && !isOpen) return null;

  const drawerStyle = {
    transform: isDragging ? `translateY(${currentY}px)` : undefined,
    transition: isDragging ? "none" : undefined,
  };

  return (
    <>
      <div
        className={`drawer__backdrop ${isOpen ? "drawer__backdrop--open" : ""}`}
        onClick={onClose}
      />

      <div
        className={`drawer ${isOpen ? "drawer--open" : ""}`}
        style={drawerStyle}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="drawer__handle" />
        {children}
      </div>
    </>
  );
}

export default Drawer;
