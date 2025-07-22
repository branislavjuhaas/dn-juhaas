import { useI18n } from "vue-i18n";

export function useTitles() {
  const { t } = useI18n();
  const config = useRuntimeConfig();

  return [
    {
      title: t("home.titles.developer.title"),
      subtitle: t("home.titles.developer.subtitle", {
        yearsOfExperience: config.public.yearsOfExperience,
      }),
    },
    {
      title: t("home.titles.designer.title"),
      subtitle: t("home.titles.designer.subtitle"),
    },
    {
      title: t("home.titles.student.title"),
      subtitle: t("home.titles.student.subtitle"),
    },
    {
      title: t("home.titles.debater.title"),
      subtitle: t("home.titles.debater.subtitle"),
    },
    {
      title: t("home.titles.volunteer.title"),
      subtitle: t("home.titles.volunteer.subtitle"),
    },
  ];
}
