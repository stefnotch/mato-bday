export function degToRad(deg: number) {
  return (deg * Math.PI) / 180;
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
