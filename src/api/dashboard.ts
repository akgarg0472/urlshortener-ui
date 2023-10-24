import {
  DashboardApiResponse,
  MyLinksApiResponse,
  UrlMetricApiResponse,
} from "./apiModals";

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

export const myLinks = (props: {
  userId: string;
  limit: number;
  offset: number;
}): MyLinksApiResponse => {
  return {
    httpCode: 200,
    total_records: 11,
    next_offset: 1,
    urls: [
      {
        original_url:
          "https://www.dummy.xyz/this-is-a-dummy-long-url-for-my-links-section-of-url-shortender-project-1234",
        short_url: "shorturl.xyz/vwx123",
        created_at: "2022-10-24T22:46:54.000Z",
        ip_address: "555.666.777.888",
      },
      {
        original_url:
          "https://www.dummy.xyz/this-is-a-dummy-long-url-for-my-links-section-of-url-shortender-project-1234",
        short_url: "shorturl.xyz/vwx456",
        created_at: "2022-10-24T22:46:54.000Z",
        ip_address: "555.666.777.888",
      },
      {
        original_url:
          "https://www.dummy.xyz/this-is-a-dummy-long-url-for-my-links-section-of-url-shortender-project-1234",
        short_url: "shorturl.xyz/vwx789",
        created_at: "2022-10-24T22:46:54.000Z",
        ip_address: "555.666.777.888",
      },
      {
        original_url:
          "https://www.dummy.xyz/this-is-a-dummy-long-url-for-my-links-section-of-url-shortender-project-1234",
        short_url: "shorturl.xyz/vwx012",
        created_at: "2022-10-24T22:46:54.000Z",
        ip_address: "555.666.777.888",
      },
    ],
  };
};

export const urlMetrics = (props: {
  userId: string;
  startTime: number;
  endTime: number;
  shortUrl: string;
  limit: number;
}): UrlMetricApiResponse => {
  return {
    httpCode: 200,
    total_hits: 22,
    avg_redirect_duration: 2442.27,
    latest_hits: [
      {
        ip: "62.161.168.168",
        device_info: {
          browser: "IE",
          os: "Windows",
        },
        redirect_duration: 673,
        timestamp: 1694028145801,
        location: {
          country: "France",
          timezone: "Europe/Paris",
        },
      },
      {
        ip: "129.115.216.222",
        device_info: {
          browser: "Opera",
          os: "Mac OS",
        },
        redirect_duration: 823,
        timestamp: 1694028072656,
        location: {
          country: "United States",
          timezone: "America/Chicago",
        },
      },
      {
        ip: "47.122.194.116",
        device_info: {
          browser: "Opera",
          os: "Linux",
        },
        redirect_duration: 687,
        timestamp: 1694028070626,
        location: {
          country: "China",
          timezone: "Asia/Shanghai",
        },
      },
      {
        ip: "127.126.60.250",
        device_info: {
          browser: "Opera",
          os: "Windows",
        },
        redirect_duration: 2934,
        timestamp: 1694027974807,
        location: {
          country: "unidentified",
          timezone: "unidentified",
        },
      },
      {
        ip: "48.179.240.43",
        device_info: {
          browser: "Opera",
          os: "Windows",
        },
        redirect_duration: 3175,
        timestamp: 1694027974321,
        location: {
          country: "United States",
          timezone: "America/Chicago",
        },
      },
      {
        ip: "48.179.240.43",
        device_info: {
          browser: "Opera",
          os: "Windows",
        },
        redirect_duration: 3175,
        timestamp: 1694027974321,
        location: {
          country: "United States",
          timezone: "America/Chicago",
        },
      },
    ],
  };
};
