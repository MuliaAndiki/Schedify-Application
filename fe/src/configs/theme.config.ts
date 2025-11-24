interface ColorConfig {
  background: string;
  foreground: string;
}

interface ThemeConfig {
  light: {
    background: string;
    foreground: string;
    card: ColorConfig;
    popover: ColorConfig;
    primary: ColorConfig;
    secondary: ColorConfig;
    muted: ColorConfig;
    accent: ColorConfig;
    destructive: ColorConfig;
    warning: ColorConfig;
    success: ColorConfig;
    info: ColorConfig;
    border: string;
    input: string;
    ring: string;
  };
  dark: {
    background: string;
    foreground: string;
    card: ColorConfig;
    popover: ColorConfig;
    primary: ColorConfig;
    secondary: ColorConfig;
    muted: ColorConfig;
    accent: ColorConfig;
    destructive: ColorConfig;
    warning: ColorConfig;
    success: ColorConfig;
    info: ColorConfig;
    border: string;
    input: string;
    ring: string;
  };
}

export const themeConfig: ThemeConfig = {
  light: {
    background: "#FFFFFF",
    foreground: "#1A1A1A",

    card: {
      background: "#FFFFFF",
      foreground: "#1A1A1A",
    },
    popover: {
      background: "#FFFFFF",
      foreground: "#1A1A1A",
    },

    primary: {
      background: "#911DEC",
      foreground: "#FFFFFF",
    },
    secondary: {
      background: "#F5EAFF",
      foreground: "#911DEC",
    },

    muted: {
      background: "#F5EAFF",
      foreground: "#1A1A1A",
    },

    accent: {
      background: "#F5EAFF",
      foreground: "#911DEC",
    },

    destructive: {
      background: "#FA0C00",
      foreground: "#FFFFFF",
    },
    warning: {
      background: "#FECA13",
      foreground: "#3A2E00",
    },
    success: {
      background: "#28DE25",
      foreground: "#004400",
    },
    info: {
      background: "#04B4FC",
      foreground: "#002244",
    },

    border: "rgba(0, 0, 0, 0.1)",
    input: "rgba(0, 0, 0, 0.15)",
    ring: "rgba(145, 29, 236, 0.4)",
  },

  // Dark theme tetap seperti yang kamu buat
  dark: {
    background: "#1A1A1A",
    foreground: "#F5EAFF",
    card: {
      background: "#2A2A2A",
      foreground: "#F5EAFF",
    },
    popover: {
      background: "#2A2A2A",
      foreground: "#F5EAFF",
    },
    primary: {
      background: "#911DEC",
      foreground: "#F5EAFF",
    },
    secondary: {
      background: "#2A2A2A",
      foreground: "#F5EAFF",
    },
    muted: {
      background: "#2A2A2A",
      foreground: "rgba(245, 234, 255, 0.6)",
    },
    accent: {
      background: "#2A2A2A",
      foreground: "#F5EAFF",
    },
    destructive: {
      background: "#FA0C00",
      foreground: "#F5EAFF",
    },
    warning: {
      background: "#FECA13",
      foreground: "#FECA1322",
    },
    success: {
      background: "#28DE25",
      foreground: "#28DE2522",
    },
    info: {
      background: "#04B4FC",
      foreground: "#04B4FC22",
    },
    border: "rgba(245, 234, 255, 0.1)",
    input: "rgba(245, 234, 255, 0.15)",
    ring: "rgba(245, 234, 255, 0.3)",
  },
};
