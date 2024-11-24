import { useEffect } from "react";

const useTooltip = () => {
  useEffect(() => {
    const tooltipElements = document.querySelectorAll(".tooltip");

    tooltipElements.forEach((el) => {
      if (!el.querySelector(".tooltip-label")) {
        const tooltipText = el.getAttribute("data-tooltip");
        if (tooltipText) {
          const tooltipLabel = document.createElement("span");
          tooltipLabel.textContent = tooltipText;
          tooltipLabel.className = "tooltip-label";
          el.appendChild(tooltipLabel);
        }
      }
    });

    return () => {
      tooltipElements.forEach((el) => {
        const tooltipLabel = el.querySelector(".tooltip-label");
        if (tooltipLabel) el.removeChild(tooltipLabel);
      });
    };
  }, []);
};

export default useTooltip;
