// Main Data Export - combines all modular data files
import { menuData, settingsData } from "./common";
import { aboutData } from "./about";
import { skillsData } from "./skills";
import { contactData } from "./contact";
import { appStoreData } from "./appStore";
import { projectsData } from "./projects";

// Combined DATA object maintaining backward compatibility
export const DATA = {
  tr: {
    menu: menuData.tr.menu,
    apps: menuData.tr.apps,
    appStore: appStoreData.tr,
    about: aboutData.tr,
    skills: skillsData.tr,
    projects: projectsData.tr,
    settings: settingsData.tr,
    contact: contactData.tr,
  },
  en: {
    menu: menuData.en.menu,
    apps: menuData.en.apps,
    appStore: appStoreData.en,
    about: aboutData.en,
    skills: skillsData.en,
    projects: projectsData.en,
    settings: settingsData.en,
    contact: contactData.en,
  },
};

// Re-export individual data modules for direct access if needed
export {
  menuData,
  settingsData,
  aboutData,
  skillsData,
  contactData,
  appStoreData,
  projectsData,
};
