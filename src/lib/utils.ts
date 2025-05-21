export const arrayElementOverwraps = (arr1: unknown[], arr2: unknown[]): boolean => {
  for (const element1 of arr1) {
    if (arr2.includes(element1)) {
      return true;
    }
  }

  return false;
};
