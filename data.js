// These are illustrative demo records, NOT live trains.
// Replace them with records from a real, licensed/authorised railway data provider.
export const demoServices = [
  {
    id: "demo-1", headcode: "1D24", operator: "Southeastern",
    origin: "Ashford International", destination: "London St Pancras International",
    trainClass: "Class 395 (example)", status: "Demo service",
    position: [51.1465, 0.8750], direction: "North-west",
    previous: "Ashford International", next: "Example next station",
    updated: "Demo data — no live position"
  },
  {
    id: "demo-2", headcode: "2K18", operator: "Southeastern",
    origin: "Ashford", destination: "East Kent (example)",
    trainClass: "Not supplied", status: "Demo service",
    position: [51.1515, 0.8620], direction: "East",
    previous: "Example previous station", next: "Example next station",
    updated: "Demo data — no live position"
  },
  {
    id: "demo-3", headcode: "1F37", operator: "Example operator",
    origin: "Ashford", destination: "Kent (example)",
    trainClass: "Not supplied", status: "Demo service",
    position: [51.1395, 0.8900], direction: "South-east",
    previous: "Example previous station", next: "Example next station",
    updated: "Demo data — no live position"
  }
];

export const stations = [
  { name: "Ashford International", position: [51.1437, 0.8760] },
  { name: "Wye", position: [51.1830, 0.9290] },
  { name: "Charing", position: [51.2080, 0.7910] },
  { name: "Westenhanger", position: [51.0940, 1.0380] },
  { name: "Ham Street", position: [51.0680, 0.8540] }
];

// Approximate illustrative route geometry for map styling only.
// It is not a surveyed railway alignment or operational route dataset.
export const illustrativeLines = [
  [[51.1437, 0.8760], [51.1600, 0.8500], [51.1830, 0.9290]],
  [[51.1437, 0.8760], [51.1300, 0.9200], [51.0940, 1.0380]],
  [[51.1437, 0.8760], [51.1050, 0.8650], [51.0680, 0.8540]],
  [[51.1437, 0.8760], [51.1750, 0.8300], [51.2080, 0.7910]]
];