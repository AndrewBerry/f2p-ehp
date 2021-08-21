export function cleanIgn(ign: string) {
  return ign
    .toLowerCase()
    .slice(0, 12)
    .replace(/[^a-z0-9]/g, "_");
}
