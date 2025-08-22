export const formatUrlPath = (path: string) => {
  return path.split("/").filter(Boolean);
};
