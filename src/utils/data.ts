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

export type PaidPlanData = {
  id: string;
  heading: string;
  summary: string;
  points: string[];
};

type PricingPlan = {
  id: string;
  name: string;
  price: string;
  currency: string;
  features: string[];
  selected: boolean;
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
    name: "Free",
    id: "free_plan",
    price: "0",
    currency: "$",
    features: [
      "Up to 10 links per month",
      "Basic Analytics",
      "Standard Support",
    ],
    selected: false,
  },
  {
    id: "pro_plan",
    name: "Pro",
    price: "19",
    currency: "$",
    features: [
      "Unlimited links",
      "Advanced Analytics",
      "Custom Domains",
      "Priority Support",
    ],
    selected: true,
  },
  {
    id: "enterprise_plan",
    name: "Enterprise",
    price: "99",
    currency: "$",
    features: [
      "Everything in Pro",
      "Advanced Security",
      "Team Management",
      "24/7 Premium Support",
    ],
    selected: false,
  },
];

export const homeCustomerTestimonials: CustomerTestimonial[] = [
  {
    id: "customer__testimonial__1",
    image: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>`,
    name: "John D.",
    designation: "Digital Marketer",
    review: `"This URL shortener has revolutionized our social media campaigns. The analytics are incredibly detailed, and the custom branding feature helps maintain our brand consistency."`,
  },
  {
    id: "customer__testimonial__2",
    image: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>`,
    name: "John D.",
    designation: "Digital Marketer",
    review: `"The QR code generation feature has been a game-changer for our product packaging. Integration was seamless, and the analytics help us track campaign performance effectively."`,
  },
  {
    id: "customer__testimonial__3",
    image: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>`,
    name: "John D.",
    designation: "Digital Marketer",
    review: `"I love how easy it is to create and manage multiple short links. The ability to customize links has helped me build better brand recognition across my social platforms."`,
  },
];

export const dashboardNavbarLinks: NavbarLink[] = [
  {
    text: "Dashboard",
    path: "/dashboard",
    icon: "/assets/icons/dashboard.png",
  },
  {
    text: "My Links",
    path: "/dashboard/links",
    icon: "/assets/icons/urls.png",
  },
  {
    text: "Statistics",
    path: "/dashboard/statistics",
    icon: "/assets/icons/statistics.png",
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
  {
    text: "Premium Plans",
    path: "/dashboard/plans",
    icon: "/assets/icons/user.png",
  },
];

export const dummyPremiumPlans = [
  {
    id: "plan_1",
    heading: "Basic Plan",
    summary: "Access to essential features",
    points: ["Feature 1", "Feature 2"],
  },
  {
    id: "plan_2",
    heading: "Premium Plan",
    summary: "Access to advanced features",
    points: ["Feature 1", "Feature 2", "Feature 3"],
  },
  {
    id: "plan_3",
    heading: "Pro Plan",
    summary: "Access to all features",
    points: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
  },
];
