export interface ITitle {
  title: string;
  subtitle: string;
}

export function useTitles() {
  // This could be replaced with an API call or other dynamic logic
  return [
    {
      title: "Developer",
      subtitle: `Professional with ${useRuntimeConfig().public.yearsOfExperience} years of industry experience, specializing in web development.`,
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
  ];
}
