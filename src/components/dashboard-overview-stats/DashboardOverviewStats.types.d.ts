interface DashboardOverviewStatsProps {
  headingText: string;
  data: Stat[];
}

interface Stat {
  icon: string;
  label: string;
  value: string | number;
}
