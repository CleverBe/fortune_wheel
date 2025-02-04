export const newOptionIsValid = (newItem: string): string | null => {
  if (!newItem || newItem.trim() === "") {
    return "Invalid value";
  }

  if (newItem.length > 18) {
    return "Value too long (max 18 characters)";
  }

  return null;
};
