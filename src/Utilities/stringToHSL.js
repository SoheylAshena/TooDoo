function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = Math.abs(hash % 360);
  const saturation = 100;
  const lightness = 30 + (Math.abs(hash) % 11);

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

export default stringToColor;
