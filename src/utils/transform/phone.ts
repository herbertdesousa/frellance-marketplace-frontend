export default (value: string): string => {
  const parsedValue = value.replace(/\D/g, '');

  const ddd = parsedValue.slice(0, 2);
  const firstPart = parsedValue.slice(2, 6);
  const lastPart = parsedValue.slice(6, 10);

  if (parsedValue.length <= 2) {
    return parsedValue;
  }

  if (parsedValue.length >= 7) {
    return `(${ddd}) ${firstPart}-${lastPart}`;
  }

  if (parsedValue.length <= 7) {
    return `(${ddd}) ${firstPart}`;
  }

  return `(${ddd}) ${firstPart}-${lastPart}`;
};
