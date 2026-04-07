const PRODUCT_NAME_RENAMES: Record<string, string> = {
  "Discord Perks": "Discord Roles",
};

const CATEGORY_NAME_RENAMES: Record<string, string> = {
  "Discord Perks": "Discord Roles",
};

export const getDisplayCategoryName = (name: string) => {
  return CATEGORY_NAME_RENAMES[name] ?? name;
};

export const getDisplayProductName = (name?: string | null) => {
  if (!name) {
    return "Product";
  }

  return PRODUCT_NAME_RENAMES[name] ?? name;
};
