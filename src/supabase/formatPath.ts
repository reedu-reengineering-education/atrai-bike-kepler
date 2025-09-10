export const formatUrlPath = (path: string) => {
  return path
    .split("/")
    .filter(Boolean)
    .filter(
      (segment) =>
        !segment.startsWith("$") && !/^[0-9a-fA-F-]{36}$/.test(segment),
    );
};
