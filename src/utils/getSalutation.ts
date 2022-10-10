export const getSalutation = (): string => {
  const now = new Date();

  if (now.getHours() > 5 && now.getHours() <= 12) return 'bom dia!';
  if (now.getHours() > 12 && now.getHours() <= 19) return 'boa tarde!';
  return 'boa noite!';
};
