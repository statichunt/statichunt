import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

function OnboardingSelect({
  options,
  onSelect,
  isDropdownOpen,
  onToggle,
  type = "select",
}) {
  const [selectedValues, setSelectedValues] = useState([]);
  const [dropdownStyle, setDropdownStyle] = useState({});
  const dropdownRef = useRef(null);
  const dropdownContentRef = useRef(null);
  const COLLISION_PADDING = 10;

  const calculateDropdownPosition = () => {
    if (dropdownRef.current && dropdownContentRef.current) {
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const dropdownContentRect =
        dropdownContentRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

      const spaceBelow =
        viewportHeight - dropdownRect.bottom - COLLISION_PADDING;
      const spaceAbove = dropdownRect.top - COLLISION_PADDING;
      const spaceOnRight =
        viewportWidth - dropdownRect.right - COLLISION_PADDING;
      const spaceOnLeft = dropdownRect.left - COLLISION_PADDING;

      const shouldOpenUpwards =
        spaceBelow < dropdownContentRect.height &&
        spaceAbove >= dropdownContentRect.height;
      const shouldAlignLeft =
        spaceOnRight < dropdownContentRect.width &&
        spaceOnLeft >= dropdownContentRect.width;

      setDropdownStyle({
        top: shouldOpenUpwards
          ? `-${dropdownContentRect.height + 5}px`
          : "100%",
        bottom: "auto",
        left: shouldAlignLeft ? "auto" : 0,
        right: shouldAlignLeft ? 0 : "auto",
      });
    }
  };

  useEffect(() => {
    setSelectedValues([]);
  }, [options]);

  useEffect(() => {
    if (isDropdownOpen && dropdownRef.current) {
      calculateDropdownPosition();
    }
  }, [isDropdownOpen]);

  const handleCheckboxChange = (option) => {
    console.log(option);
    if (option.value === "") {
      // If "No preference" is selected, clear all other selections
      if (!selectedValues.includes("")) {
        setSelectedValues([""]);
      } else {
        // If "No preference" is already selected, deselect it
        setSelectedValues([]);
      }
      return;
    }

    setSelectedValues((prev) => {
      // Remove "No preference" if selecting another option
      const withoutEmpty = prev.filter((val) => val !== "");

      const isSelected = withoutEmpty.includes(option.value);
      if (isSelected) {
        // If deselecting an option, just remove it
        return withoutEmpty.filter((val) => val !== option.value);
      } else {
        // If selecting a new option, add it (without empty string)
        return [...withoutEmpty, option.value];
      }
    });
  };

  return (
    <div
      className={`custom-select ${isDropdownOpen ? "active" : ""}`}
      ref={dropdownRef}
    >
      <button
        type="button"
        onClick={onToggle}
        className="custom-select-trigger"
      >
        <p className="text-base">
          {type === "checkbox"
            ? selectedValues.length > 0
              ? "Multiple selected"
              : "Select Options"
            : selectedValues.length > 0
              ? selectedValues[0]
              : "Select Options"}
        </p>
        <IoMdArrowDropdown />
      </button>
      <div
        ref={dropdownContentRef}
        className={`custom-select-content ${type === "checkbox" ? "overflow-hidden" : ""}`}
        style={dropdownStyle}
      >
        {type === "checkbox" ? (
          <div className="relative">
            <div className="max-h-[200px] overflow-y-auto">
              {options.map((option, index) => {
                const uniqueId = `checkbox-${crypto.randomUUID()}`; // Generate a unique ID

                return (
                  <label
                    key={index}
                    className="custom-select-option flex items-center space-x-2"
                    htmlFor={uniqueId}
                  >
                    <input
                      id={uniqueId} // Assign unique ID
                      type="checkbox"
                      checked={selectedValues.includes(option.value)}
                      onChange={() => handleCheckboxChange(option)}
                      className="size-4 border border-primary checked:bg-primary rounded focus:bg-primary focus:ring-2 focus:checked:bg-primary focus:ring-primary focus:ring-offset-2 focus:ring-offset-white dark:checked:bg-primary dark:focus:ring-primary dark:focus:ring-offset-darkmode-body"
                    />
                    <span>{option.label}</span>
                  </label>
                );
              })}
            </div>
            <div className="sticky bottom-0 px-3.5 bg-white dark:bg-darkmode-body mt-4 flex justify-between py-2 border-t dark:border-darkmode-border">
              <button
                type="button"
                onClick={() => {
                  setSelectedValues([]);
                }}
              >
                Reset
              </button>
              <button
                className="btn btn-sm btn-primary"
                type="button"
                onClick={() => {
                  onSelect(selectedValues);
                  onToggle(selectedValues.length > 0);
                }}
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          options.map((option, index) => (
            <div
              key={index}
              onClick={() => {
                onSelect(option.value);
                setSelectedValues([option.label]);
                onToggle(option.label);
              }}
              className={`custom-select-option ${selectedValues.includes(option.value) ? "active" : ""}`}
            >
              <button type="button" className="text-sm">
                {option.icon && (
                  <Image
                    src={option.icon}
                    alt="option"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                )}
                <span>{option.label}</span>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default OnboardingSelect;
