import type { MenuRecordRaw } from "../../../types";

import { computed, onBeforeMount, ref, watch } from "vue";
import { useRoute } from "vue-router";

import { preferences, usePreferences } from "../../../preferences";
import { useAccessStore } from "../../../stores";
import { findRootMenuByPath } from "../../../utils";

import { useNavigation } from "./use-navigation";

function useMixedMenu() {
  const { navigation } = useNavigation();
  const accessStore = useAccessStore();
  const route = useRoute();
  const lastSideMenus = ref<MenuRecordRaw[]>([]);
  const splitSideMenus = ref<MenuRecordRaw[]>([]);
  const rootMenuPath = ref<string>("");
  const mixedRootMenuPath = ref<string>("");
  const mixExtraMenus = ref<MenuRecordRaw[]>([]);
  /** 记录当前顶级菜单下哪个子菜单最后激活 */
  const defaultSubMap = new Map<string, string>();
  const { isMixedNav, isHeaderMixedNav } = usePreferences();

  const needSplit = computed(() => (preferences.navigation.split && isMixedNav.value) || isHeaderMixedNav.value);

  const sidebarVisible = computed(() => {
    const enableSidebar = preferences.sidebar.enable;
    if (needSplit.value) {
      return enableSidebar && splitSideMenus.value.length > 0;
    }
    return enableSidebar;
  });

  const allMenus = computed(() => accessStore.accessMenus);

  const menus = computed(() => {
    return allMenus.value.filter((item) => item?.meta?.isMenu !== false && item?.meta?.hideInMenu !== true && !item?.meta?.fixedAside);
  });
  const holdMenus = computed(() => {
    return allMenus.value.filter((item) => item?.meta?.fixedAside);
  });
  /**
   * 头部菜单
   */
  const headerMenus = computed(() => {
    if (!needSplit.value) {
      return menus.value;
    }
    return menus.value.map((item) => {
      return {
        ...item,
        children: []
      };
    });
  });

  /**
   * 侧边菜单
   */
  const sidebarMenus = computed(() => {
    const sideMenus = needSplit.value ? splitSideMenus.value : menus.value;
    return [...holdMenus.value, ...sideMenus];
  });

  const mixHeaderMenus = computed(() => {
    return isHeaderMixedNav.value ? sidebarMenus.value : headerMenus.value;
  });

  /**
   * 侧边菜单激活路径
   */
  const sidebarActive = computed(() => {
    return (route?.meta?.activePath as string) ?? route.path;
  });

  /**
   * 头部菜单激活路径
   */
  const headerActive = computed(() => {
    if (!needSplit.value) {
      return route.path;
    }
    return rootMenuPath.value;
  });

  function saveLastSplitSideMenus() {
    if (splitSideMenus.value.length == 0 && lastSideMenus.value?.length > 0) {
      splitSideMenus.value = lastSideMenus.value;
    }
    if (!splitSideMenus.value || splitSideMenus.value.length === 0) {
      //仍然为空，从所有菜单中查找
      const hasChildren = allMenus.value.find((item) => {
        return item.children && item.children.length > 0;
      });
      if (hasChildren) {
        splitSideMenus.value = hasChildren.children;
      }
    }
    lastSideMenus.value = splitSideMenus.value;
  }
  /**
   * 菜单点击事件处理
   * @param key 菜单路径
   * @param mode 菜单模式
   */
  const handleMenuSelect = (key: string, mode?: string) => {
    if (!needSplit.value || mode === "vertical") {
      navigation(key);
      return;
    }

    const rootMenu = menus.value.find((item) => item.path === key);
    rootMenuPath.value = rootMenu?.path ?? "";
    splitSideMenus.value = rootMenu?.children ?? [];
    saveLastSplitSideMenus();
    if (splitSideMenus.value.length === 0) {
      navigation(key);
    } else if (rootMenu && preferences.sidebar.autoActivateChild) {
      navigation(defaultSubMap.has(rootMenu.path) ? (defaultSubMap.get(rootMenu.path) as string) : rootMenu.path);
    }
  };

  /**
   * 侧边菜单展开事件
   * @param key 路由路径
   * @param parentsPath 父级路径
   */
  const handleMenuOpen = (key: string, parentsPath: string[]) => {
    if (parentsPath.length <= 1 && preferences.sidebar.autoActivateChild) {
      navigation(defaultSubMap.has(key) ? (defaultSubMap.get(key) as string) : key);
    }
  };

  /**
   * 计算侧边菜单
   * @param path 路由路径
   */
  function calcSideMenus(path: string = route.path) {
    let { rootMenu } = findRootMenuByPath(menus.value, path);
    if (!rootMenu) {
      rootMenu = menus.value.find((item) => item.path === path);
    }
    const result = findRootMenuByPath(rootMenu?.children || [], path, 1);
    mixedRootMenuPath.value = result.rootMenuPath ?? "";
    mixExtraMenus.value = result.rootMenu?.children ?? [];
    rootMenuPath.value = rootMenu?.path ?? "";
    splitSideMenus.value = rootMenu?.children ?? lastSideMenus.value ?? [];
    saveLastSplitSideMenus();
  }

  watch(
    () => route.path,
    (path) => {
      const currentPath = (route?.meta?.activePath as string) ?? path;
      calcSideMenus(currentPath);
      if (rootMenuPath.value) defaultSubMap.set(rootMenuPath.value, currentPath);
    },
    { immediate: true }
  );

  // 初始化计算侧边菜单
  onBeforeMount(() => {
    calcSideMenus((route.meta?.activePath || route.path) as string);
  });

  return {
    handleMenuSelect,
    handleMenuOpen,
    headerActive,
    headerMenus,
    sidebarActive,
    sidebarMenus,
    mixHeaderMenus,
    mixExtraMenus,
    sidebarVisible
  };
}

export { useMixedMenu };
