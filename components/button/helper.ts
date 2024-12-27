const getVariantClasses = (variant: string) => () => {
  switch (variant) {
    case "primary":
      return [
        "text-white",
        "bg-gradient-to-r from-teal-400 to-blue-500",
        "drop-shadow-[0_0_20px_rgba(45,212,191,0.6)]",
        "disabled:opacity-50",
        "w-full",
      ];
    case "secondary":
      return [
        "border",
        "bg-blue-500",
        "text-white",
        "font-bold",
        "hover:bg-blue-600",
        "active:bg-blue-600",
        "disabled:opacity-50",
      ];
    case "link":
      return ["text-white", "cursor-pointer"];
    case "link-primary":
      return [
        "cursor-pointer",
        "bg-gradient-to-r from-teal-400 to-blue-500",
        "text-transparent",
        "bg-clip-text",
      ];
  }

  return [];
};

export { getVariantClasses };
