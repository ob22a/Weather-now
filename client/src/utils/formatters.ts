export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  return date.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const formatDayLabel = (isoDate: string): string => {
  const date = new Date(isoDate);
  return date.toLocaleDateString(undefined, { weekday: 'short' });
};

export const formatTimeLabel = (isoTime: string): string => {
  const date = new Date(isoTime);
  return date.toLocaleTimeString([], { hour: 'numeric' });
};
