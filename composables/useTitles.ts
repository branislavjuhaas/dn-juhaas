export interface ITitle {
  title: string;
  subtitle: string;
}

export function useTitles() {
  const config = useRuntimeConfig();
  return [
    {
      title: "Developer",
      subtitle: `Professional with ${config.public.yearsOfExperience} years of industry experience, specializing in web development.`,
    },
    {
      title: "Designer",
      subtitle:
        "Participating in international projects, creating minimalist user interfaces.",
    },
    {
      title: "Student",
      subtitle:
        "Educated at the best grammar school Slovakia. Graduating with academic honors.",
    },
    {
      title: "Debater",
      subtitle:
        "The 2024 champion of Slovakia, excellent public speaker and critical thinker.",
    },
    {
      title: "Volunteer",
      subtitle:
        "Manager of critical infrastructure at SDA, ex-leader of the boy-scout unit.",
    },
  ];
}
