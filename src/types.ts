export interface IPostData {
  slug: string;
  date: string;
  title: string;
}

export type TGlobalThemeObject = {
  theme?: "light" | "dark" | "golf" | "christmas";
  getCSSVarValue: (variable: string) => string | undefined;
  changeThemeVariant: (type: TGlobalThemeObject["theme"]) => void;
};
