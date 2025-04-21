export const truncateString = (text: string, maxLength: number): string =>
  text.length <= maxLength ? text : text.slice(0, maxLength) + "...";

export const buildQueryString = (query: Record<string, any>): string => {
  const truthyEntries = Object.entries(query).filter(([_, value]) =>
    Boolean(value)
  );
  return truthyEntries.length
    ? "?" +
        truthyEntries
          .map(
            ([key, value]) =>
              `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
          )
          .join("&")
    : "";
};
