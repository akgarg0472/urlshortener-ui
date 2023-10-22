import { DashboardApiResponse } from "./apiModals";

export const dashboard = (props: { userId: string }): DashboardApiResponse => {
  return {
    httpCode: 200,
    current_day_stats: [
      {
        key: "Total Hits",
        value: "23",
        icon: "/assets/icons/total-hits.png",
      },
      {
        key: "New Links",
        value: "2",
        icon: "/assets/icons/add-link.png",
      },
    ],
    lifetime_stats: [
      {
        key: "Total Hits",
        value: "99999",
        icon: "/assets/icons/total-hits.png",
      },
      {
        key: "Avg Redirect Duration",
        value: "1234ms",
        icon: "/assets/icons/clock.png",
      },
    ],
    continents: [
      {
        name: "North America",
        hits_count: 924,
      },
      {
        name: "Asia",
        hits_count: 522,
      },
      {
        name: "Europe",
        hits_count: 365,
      },
      {
        name: "unidentified",
        hits_count: 341,
      },
      {
        name: "South America",
        hits_count: 72,
      },
    ],
    countries: [
      {
        name: "United States",
        hits_count: 865,
      },
      {
        name: "unidentified",
        hits_count: 342,
      },
      {
        name: "China",
        hits_count: 185,
      },
      {
        name: "Japan",
        hits_count: 104,
      },
      {
        name: "South Korea",
        hits_count: 76,
      },
    ],
    prev_seven_days_hits: [
      {
        timestamp: 1696291200000,
        hits: 28,
      },
      {
        timestamp: 1696377600000,
        hits: 45,
      },
      {
        timestamp: 1696464000000,
        hits: 13,
      },
      {
        timestamp: 1696550400000,
        hits: 67,
      },
      {
        timestamp: 1696636800000,
        hits: 56,
      },
      {
        timestamp: 1696703400000,
        hits: 36,
      },
      {
        timestamp: 1696789800000,
        hits: 41,
      },
    ],
  };
};
