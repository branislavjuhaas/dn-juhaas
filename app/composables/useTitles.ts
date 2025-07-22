export function useTitles(lang: "en" | "sk" = "en") {
  const config = useRuntimeConfig();
  const yearsOfExperience = config.public.yearsOfExperience;

  const titles = {
    en: [
      {
        title: "Developer",
        subtitle: `Professional with ${yearsOfExperience} years of industry experience, specializing in web development.`,
      },
      {
        title: "Designer",
        subtitle:
          "Participating in international projects, creating elegant user interfaces.",
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
    ],
    sk: [
      {
        title: "Vývojár",
        subtitle: `Profesionál s ${yearsOfExperience}-mi rokmi skúseností, špecializujúci sa na webový vývoj.`,
      },
      {
        title: "Dizajnér",
        subtitle:
          "Prispievateľ do medzinárodných projektov, tvorca elegantných rozhraní.",
      },
      {
        title: "Študent",
        subtitle:
          "Vzdelávaný na najlepšom gymnáziu Slovenska prospievajúci s vyznamenaním.",
      },
      {
        title: "Debatér",
        subtitle:
          "Majster Slovenska roku 2024, excelentný rečník a kritický mysliteľ.",
      },
      {
        title: "Dobrovoľník",
        subtitle:
          "Manažér kritickej softvérovej infraštruktúry SDA, bývalý vedúci skautskej družiny.",
      },
    ],
  };

  // Return titles based on current locale, default to English
  return titles[lang] || titles.en;
}
