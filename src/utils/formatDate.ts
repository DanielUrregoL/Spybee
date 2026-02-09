export function formatShortDate(isoDate: string) {
  const date = new Date(isoDate);

  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}


export function formatDateAndTime(isoDate: string) {
  const date = new Date(isoDate);

  const formattedDate = date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return {
    date: formattedDate, // d/m/y
    time: formattedTime, // 15:00
  };
}
