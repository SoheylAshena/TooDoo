function stringToColor(str) {
  if (!str) return "hsl(0, 0%, 50%)";
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash) * 31;
    hash = hash & hash;
  }
  const goldenRatioConjugate = 0.618033988749895;
  let hue = (Math.abs(hash) * goldenRatioConjugate) % 1;
  hue = Math.floor(hue * 360);
  const saturationRanges = [80, 90, 95];
  const saturation = saturationRanges[Math.abs(hash) % saturationRanges.length];
  const lightnessRanges = [45, 55, 65];
  const lightness = lightnessRanges[Math.abs(hash) % lightnessRanges.length];
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
export default stringToColor;
