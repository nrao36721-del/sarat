export interface District {
  name: string;
  state: string;
}

export const DISTRICTS: District[] = [
  { name: "Varanasi", state: "Uttar Pradesh" },
  { name: "Gorakhpur", state: "Uttar Pradesh" },
  { name: "Lucknow", state: "Uttar Pradesh" },
  { name: "Prayagraj", state: "Uttar Pradesh" },
  { name: "Hyderabad", state: "Telangana" },
  { name: "Warangal", state: "Telangana" },
  { name: "Khammam", state: "Telangana" },
  { name: "Karimnagar", state: "Telangana" },
  { name: "Visakhapatnam", state: "Andhra Pradesh" },
  { name: "Vijayawada", state: "Andhra Pradesh" },
  { name: "Guntur", state: "Andhra Pradesh" },
  { name: "Tirupati", state: "Andhra Pradesh" },
];

export function getStateForDistrict(districtName: string): string {
  const d = DISTRICTS.find((d) => d.name === districtName);
  return d ? d.state : "";
}
