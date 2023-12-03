interface NavbarLink {
  text: string;
  path: string;
  icon: string;
}

interface WhyChooseUs {
  id: string;
  icon: string;
  title: string;
  description: string;
}

interface CustomerTestimonial {
  id: string;
  image: string;
  name: string;
  designation: string;
  review: string;
}

export const homeWhyChooseUs: WhyChooseUs[] = [
  {
    id: "total__generated__links",
    icon: "/assets/icons/add.png",
    title: "23M+",
    description:
      "Shorten over 23 million links in total saving countless characters till now",
  },
  {
    id: "trusted__by__brands",
    icon: "/assets/icons/add.png",
    title: "Trustworthy",
    description:
      "Trusted by top brands and businesses worldwide along with users from over 150 countries",
  },
  {
    id: "analytics__and__statistics",
    icon: "/assets/icons/add.png",
    title: "Analytics",
    description:
      "Track each link performance, monitor click-through rates, Geographical data and more",
  },
  {
    id: "reliable__and__available__24_by_7_365",
    icon: "/assets/icons/add.png",
    title: "99.9%",
    description:
      "Boasts an impressive 99.9% up time, ensuring links are always accessible when needed",
  },
];

export const homeCustomerTestimonials: CustomerTestimonial[] = [
  {
    id: "customer__testimonial__1",
    image: "/assets/icons/john-doe.png",
    name: "John D.",
    designation: "Digital Marketer",
    review: `I've been using URLShortener for months now, and I'm impressed by its speed and reliability. Shortening links is a breeze, and the customization options make it a versatile tool. I've seen a significant improvement in my link-sharing efficiency since I started using it.`,
  },
  {
    id: "customer__testimonial__2",
    image: "/assets/icons/john-doe.png",
    name: "John D.",
    designation: "Digital Marketer",
    review: `I have been using URLShortener for a while now and I can say that it is the best URL shortener out there. It is easy to use, reliable, and has a lot of features. I would recommend it to anyone who wants to shorten their links.`,
  },
  {
    id: "customer__testimonial__3",
    image: "/assets/icons/john-doe.png",
    name: "John D.",
    designation: "Digital Marketer",
    review: `I have been using URLShortener for a while now and I can say that it is the best URL shortener out there. It is easy to use, reliable, and has a lot of features. I would recommend it to anyone who wants to shorten their links.`,
  },
  {
    id: "customer__testimonial__4",
    image: "/assets/icons/john-doe.png",
    name: "John D.",
    designation: "Digital Marketer",
    review: `I have been using URLShortener for a while now and I can say that it is the best URL shortener out there. It is easy to use, reliable, and has a lot of features. I would recommend it to anyone who wants to shorten their links.`,
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
];
