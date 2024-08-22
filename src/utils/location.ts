export function countryCodeToName(cc: string) {
  const intlRegionNames = new Intl.DisplayNames(["en"], { type: "region" });

  return intlRegionNames.of(cc) ?? "";
}
