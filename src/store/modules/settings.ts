import { defineStore } from "pinia";
import { theme } from "ant-design-vue";
import _ from "lodash-es";
// @ts-ignore
import { LocalStorage } from "/src/utils/util.storage";
// import { replaceStyleVariables } from "vite-plugin-theme/es/client";

// import { getThemeColors, generateColors } from "/src/../build/theme-colors";
//
// import { mixLighten, mixDarken, tinycolor } from "vite-plugin-theme/es/colorUtils";

// export async function changeTheme(color?: string) {
//   if (color == null) {
//     return;
//   }
//   const colors = generateColors({
//     mixDarken,
//     mixLighten,
//     tinycolor,
//     color
//   });
//
//   return await replaceStyleVariables({
//     colorVariables: [...getThemeColors(color), ...colors]
//   });
// }
export type ThemeToken = {
  token: {
    colorPrimary: string;
  };
  algorithm: any;
};
export type ThemeConfig = {
  colorPrimary: string;
  mode: string;
};
export interface SettingState {
  themeConfig: ThemeConfig;
  themeToken: ThemeToken;
}

const SETTING_THEME_KEY = "SETTING_THEME";
export const useSettingStore = defineStore({
  id: "app.setting",
  state: (): SettingState => ({
    theme: null,
    themeToken: {
      token: {},
      algorithm: theme.defaultAlgorithm
    }
  }),
  getters: {
    getThemeConfig(): any {
      return this.themeConfig || LocalStorage.get(SETTING_THEME_KEY) || {};
    }
  },
  actions: {
    persistThemeConfig() {
      LocalStorage.set(SETTING_THEME_KEY, this.getThemeConfig);
    },
    async setThemeConfig(themeConfig?: ThemeConfig = this.themeConfig) {
      this.themeConfig = themeConfig;
      this.persistThemeConfig();
      this.setPrimaryColor(themeConfig.colorPrimary);
      this.setDarkMode(themeConfig.mode);
    },
    setPrimaryColor(color: any) {
      this.themeConfig.colorPrimary = color;
      _.set(this.themeToken, "token.colorPrimary", color);
      this.persistThemeConfig();
    },
    setDarkMode(mode: "dark" | "light") {
      this.themeConfig.mode = mode;
      if (mode === "dark") {
        this.themeToken.algorithm = theme.darkAlgorithm;
      } else {
        this.themeToken.algorithm = theme.defaultAlgorithm;
      }
      this.persistThemeConfig();
    },
    async init() {
      await this.setThemeConfig(this.getThemeConfig);
    }
  }
});
