import themeConfig from "@/config/theme.json";
import { useTheme } from "next-themes";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

const MultiSelect = ({
  options,
  isMulti,
  name,
  onChange,
  value,
  placeholder,
  creatable,
}) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // Select colors based on the current theme
  const themeColors = isDark
    ? themeConfig.colors.darkmode.theme_color
    : themeConfig.colors.default.theme_color;
  const textColors = isDark
    ? themeConfig.colors.darkmode.text_color
    : themeConfig.colors.default.text_color;

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderWidth: "1px",
      borderRadius: "4px",
      borderColor: state.isFocused ? themeColors.primary : themeColors.border,
      boxShadow: "none",
      "&:hover": {
        borderColor: themeColors.border,
      },
      backgroundColor: "transparent",
    }),

    input: (provided) => ({
      ...provided,
      color: textColors.default,
    }),

    menu: (provided) => ({
      ...provided,
      backgroundColor: themeColors.body,
      borderRadius: "0.375rem",
      marginTop: "0.25rem",
      zIndex: "50",
      padding: "16px",
      border: `1px solid ${themeColors.border}`,
    }),
    option: (provided, state) => ({
      ...provided,
      cursor: "pointer",
      padding: "10px",
      fontSize: "14px",
      borderRadius: "4px",
      backgroundColor: state.isFocused
        ? themeColors.theme_light
        : themeColors.body,
      color: textColors.default,
      fontWeight: state.isSelected ? "600" : "400",
      "&:hover": {
        backgroundColor: themeColors.theme_light,
        color: textColors.default,
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#999",
    }),
    singleValue: (provided) => ({
      ...provided,
      backgroundColor: themeColors.body,
      color: textColors.default,
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: themeColors.theme_light,
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: textColors.dark,
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: state.isFocused ? themeColors.primary : textColors.default,
      "&:hover": {
        color: themeColors.primary,
      },
    }),
  };

  const Component = creatable ? CreatableSelect : Select;

  return (
    <Component
      isMulti={isMulti}
      name={name}
      options={options}
      className="basic-multi-select"
      classNamePrefix="select"
      styles={customStyles}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
    />
  );
};

export default MultiSelect;
