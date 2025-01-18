type NavbarLink = {
  text: string;
  path: string;
  icon: string;
};

type WhyChooseUs = {
  id: string;
  icon: string;
  title: string;
  description: string;
  iconBgColor: string;
};

type CustomerTestimonial = {
  id: string;
  image: string;
  name: string;
  designation: string;
  review: string;
};

export type PricingPlan = {
  id: string;
  name: string;
  price: string;
  validity: "month" | "annual";
  currency: string;
  features: string[];
  description: string;
  selected: boolean;
  default_plan: boolean;
};

export type PaidPlanData = {
  id: string;
  heading: string;
  summary: string;
  points: string[];
};

export type PricePlanComparison = {
  headers: string[];
  rows: any[][];
};

type HomeStats = {
  id: string;
  metric: string;
  title: string;
  icon: string;
  iconBgColor: string;
};

type LiveHomeStats = {
  id: string;
  title: string;
  metric: string;
  iconColor: string;
};

type HomeAccordian = {
  id: string;
  title: string;
  content: string;
};

export const homeWhyChooseUs: WhyChooseUs[] = [
  {
    id: "instant__link__generation",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="rgb(99, 102, 241)" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" /></svg>`,
    iconBgColor: "rgba(99, 102, 241, 0.15)",
    title: "Instant Link Generation",
    description:
      "Create shortened URLs in seconds with our lightning-fast processing system. No delays, no waiting.",
  },
  {
    id: "analytics__and__statistics",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="rgb(168, 85, 247)" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" /></svg>`,
    iconBgColor: "rgba(168, 85, 247, 0.15)",
    title: "Advanced Analytics",
    description:
      "Track clicks, geographic data, and user behavior with detailed real-time analytics dashboard.",
  },
  {
    id: "enterprise__security",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="rgba(236, 72, 153, 1)" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>`,
    iconBgColor: "rgba(236, 72, 153, 0.15)",
    title: "Enterprise Security",
    description:
      "Bank-level encryption and security measures to protect your links and data at all times.",
  },
  {
    id: "custom__branding",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="rgba(59, 130, 246, 1)" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5" /></svg>`,
    iconBgColor: "rgba(59, 130, 246, 0.15)",
    title: "Custom Branding",
    description:
      "Create branded short links with your own domain name and customize link appearances.",
  },
  {
    id: "link__expiration",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="rgba(234, 179, 8, 1)" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>`,
    iconBgColor: "rgba(234, 179, 8, 0.15)",
    title: "Link Expiry",
    description:
      "Set expiration dates for your links and maintain full control over link lifecycle.",
  },
  {
    id: "seo__optimization",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="rgba(34, 197, 94, 1)" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" /></svg>`,
    iconBgColor: "rgba(34, 197, 94, 0.15)",
    title: "SEO Optimization",
    description:
      "Optimize your shortened links for search engines and improve visibility with custom SEO tags.",
  },
];

export const homePricingPlans: PricingPlan[] = [
  {
    id: "free_plan",
    name: "Free",
    price: "0",
    validity: "month",
    currency: "$",
    features: ["Up to 50 links", "Basic Analytics", "Standard Support"],
    selected: false,
    description: "Free plan for basic usage",
    default_plan: true,
  },
  {
    id: "pro_plan",
    name: "Pro",
    price: "19",
    validity: "month",
    currency: "$",
    features: [
      "Up to 5000 links",
      "Advanced Analytics",
      "Custom Domains",
      "Priority Support",
    ],
    selected: true,
    description: "Pro plan for advanced users",
    default_plan: false,
  },
  {
    id: "enterprise_plan",
    name: "Enterprise",
    price: "99",
    validity: "month",
    currency: "$",
    features: [
      "Everything in Pro",
      "Unlimited links",
      "Advanced Security",
      "24/7 Premium Support",
    ],
    selected: false,
    description: "Enterprise plan for organizations",
    default_plan: false,
  },
];

export const homeCustomerTestimonials: CustomerTestimonial[] = [
  {
    id: "customer__testimonial__1",
    image: `/assets/icons/john-doe.png`,
    name: "Emily R.",
    designation: "Marketing Director, ABC Industries",
    review: `"This URL shortener has revolutionized our social media campaigns. The analytics are incredibly detailed, and the custom branding feature helps maintain our brand consistency."`,
  },
  {
    id: "customer__testimonial__2",
    image: `/assets/icons/john-doe.png`,
    name: "David M.",
    designation: "E-commerce Manager",
    review: `"The QR code generation feature has been a game-changer for our product packaging. Integration was seamless, and the analytics help us track campaign performance effectively."`,
  },
  {
    id: "customer__testimonial__3",
    image: `/assets/icons/john-doe.png`,
    name: "Sarah T.",
    designation: "Content Strategist",
    review: `"I love how easy it is to create and manage multiple short links. The ability to customize links has helped me build better brand recognition across my social platforms."`,
  },
  {
    id: "customer__testimonial__4",
    image: `/assets/icons/john-doe.png`,
    name: "Michael P.",
    designation: "Senior Web Developer",
    review: `"The URL shortener tool has saved us so much time and improved our campaign performance. The analytics dashboard is so intuitive, and I can track everything easily."`,
  },
  {
    id: "customer__testimonial__5",
    image: `/assets/icons/john-doe.png`,
    name: "Lisa G.",
    designation: "Lead Digital Marketer",
    review: `"The ability to track and analyze our links in real-time has given us a huge advantage in our marketing campaigns. Highly recommend this tool for any business."`,
  },
  {
    id: "customer__testimonial__6",
    image: `/assets/icons/john-doe.png`,
    name: "Robert W.",
    designation: "Product Manager",
    review: `"The custom link branding feature has helped us stay consistent with our messaging. It's easy to use, and the ability to integrate with other platforms makes it indispensable."`,
  },
];

export const homeStatistics: HomeStats[] = [
  {
    id: "links__shortened",
    metric: "300M+",
    title: "Links Shortened",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="rgba(99, 102, 241, 1)" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" /></svg>`,
    iconBgColor: "rgba(99, 102, 241, 0.15)",
  },
  {
    id: "active__users",
    metric: "1M+",
    title: "Active Users",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="rgba(168, 85, 247, 1)" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" /></svg>`,
    iconBgColor: "rgba(168, 85, 247, 0.15)",
  },
  {
    id: "system__uptime",
    metric: "99.99%",
    title: "Uptime",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="rgba(236, 72, 153, 1)" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z" /></svg>`,
    iconBgColor: "rgba(236, 72, 153, 0.15)",
  },
  {
    id: "countries__served",
    metric: "100+",
    title: "Countries Served",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="rgba(34, 197, 94, 1)" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" /></svg>`,
    iconBgColor: "rgba(34, 197, 94, 0.15)",
  },
];

export const liveDataStatistics: LiveHomeStats[] = [
  {
    id: "links__shortened__last__24__hours",
    title: "Links shortened in last 24 hours",
    metric: (
      Math.floor(Math.random() * 100000) +
      1000000 +
      Math.floor(Math.random() * 10000 - 5000)
    ).toString(),
    iconColor: "rgba(99, 102, 241, 1)",
  },
  {
    id: "active__users__now",
    title: "Active users",
    metric: (
      Math.floor(Math.random() * 1000) +
      10000 +
      Math.floor(Math.random() * 500 - 250)
    ).toString(),
    iconColor: "rgba(34, 197, 94, 1)",
  },
];

export const faqQuestions: HomeAccordian[] = [
  {
    id: "faq__what__is__url__shortener",
    title: "What is URL Shortener?",
    content: `A URL shortener is a tool that creates a short, unique URL that will redirect to the specific webpage you specify. It's useful for sharing links on social media, tracking click-through rates, and making URLs more manageable.`,
  },
  {
    id: "faq__is_free_to_use",
    title: "Is the service free to use?",
    content: `Yes, we offer a free plan that includes basic features and up to 50 links per month. For additional features and higher usage limits, check out our Pro and Enterprise plans.`,
  },
  {
    id: "faq__can_custom_url_be_created",
    title: "Can I create custom short URLs?",
    content: `Yes, with our Pro and Enterprise plans, you can customize your short URLs to include your brand or specific keywords.`,
  },
  {
    id: "faq__how_to_track_link_performance",
    title: "How can I track link performance?",
    content: `Our dashboard provides detailed analytics for each link, including click-through rates, geographic locations, and referral sources.`,
  },
  {
    id: "faq__does_expiry_option_exist",
    title: "Does the URL have an expiration option?",
    content: `Yes, you can set an expiration date for your short URLs. After the specified date, the link will no longer be active.`,
  },
  {
    id: "faq__can_urls_be_deleted",
    title: "Can I delete a shortened URL?",
    content: `Yes, you can delete any URL you create from your account dashboard. Deleted URLs will no longer redirect to the original webpage.`,
  },
];

export const dashboardNavbarLinks: NavbarLink[] = [
  {
    text: "Dashboard",
    path: "/dashboard",
    icon: "/assets/icons/dashboard.png",
  },
  {
    text: "Link Management",
    path: "/dashboard/links",
    icon: "/assets/icons/urls.png",
  },
  {
    text: "Subscriptions",
    path: "/dashboard/subscriptions",
    icon: "/assets/icons/subscription.png",
  },
  {
    text: "Profile",
    path: "/dashboard/profile",
    icon: "/assets/icons/user.png",
  },
  {
    text: "Update Profile",
    path: "/dashboard/profile/update",
    icon: "/assets/icons/user.png",
  },
];

export const pricingPlanComparison: PricePlanComparison = {
  headers: ["Feature", "Free", "Pro", "Enterprise"],
  rows: [
    ["Custom URLs", "Up to 50", "Up to 5000", "Unlimited"],
    ["Custom Domains", "1", "50", "Unlimited"],
    ["API Access", null, null, null],
    ["Security", "Basic", "Advanced", "Enterprise"],
    ["Premium Support", null, true, true],
    ["Analytics dashboard", "Basic", "Advanced", "Advanced"],
    ["24/7 Premium Support", null, null, true],
  ],
};
