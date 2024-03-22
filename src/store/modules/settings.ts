import { defineStore } from "pinia";
import { theme } from "ant-design-vue";
import _ from "lodash-es";
// @ts-ignore
import { LocalStorage } from "/src/utils/util.storage";
import less from "less";
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
    async setThemeConfig(themeConfig?: ThemeConfig) {
      if (themeConfig == null) {
        themeConfig = this.themeConfig;
      } else {
        this.themeConfig = themeConfig;
      }

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
        const defaultSeed = theme.defaultSeed;
        const mapToken = theme.darkAlgorithm(defaultSeed);
        less.modifyVars(mapToken);
        less.modifyVars({
          "@colorPrimaryBg": "#111a2c",
          colorPrimaryBg: "#111a2c"
        });
        less.refreshStyles();
        debugger;
      } else {
        this.themeToken.algorithm = theme.defaultAlgorithm;

        const defaultSeed = theme.defaultSeed;
        const mapToken = theme.defaultAlgorithm(defaultSeed);
        less.modifyVars(mapToken);
      }
      this.persistThemeConfig();
    },
    async init() {
      await this.setThemeConfig(this.getThemeConfig);
    }
  }
});
