export interface AppInfo {
  id: number;
  name: string;
  title: string;
  category: string;
  rating: number;
  downloads: string;
  size: string;
  version: string;
  info: string;
  ytVideoLink: string;
  description: string;
  logoLink: string;
  PlayStoreInstallLink: string;
  ApkDownloadLink: string;
  iosDownLoadLink: string;
  features: string[];
  screenShots: string[];
}

export const AppsInfo: AppInfo[] = [
  {
    id: 1,
    name: "Easy Bangla Patente",
    title: "Classic Driving License App",
    category: "Education",
    rating: 4.8,
    downloads: "10K+",
    size: "25 MB",
    version: "2.1.0",
    info: "Unlock Your Road to Success in Italy with Our Expert Driving License Courses and Quiz App for Bengali Speakers! 🚗 At Easy Bangla Patente, we specialize in helping the Bengali-speaking community in Italy achieve their dreams of obtaining an Italian driving license. Our platform offers comprehensive online courses tailored specifically for Bengali speakers, designed to simplify the process and ensure your success!",
    ytVideoLink: "https://youtu.be/LHrQbhZSzPI",
    description:
      "Master Italian driving theory with our comprehensive online course. Pass your exam with confidence using our proven Bangla teaching method.",
    logoLink:
      "https://d1vstek0gf8y4r.cloudfront.net/Ebp_Assets/app-icon-02.png",
    PlayStoreInstallLink: "",
    ApkDownloadLink:
      "https://d1vstek0gf8y4r.cloudfront.net/Ebp_Assets/easybanglapatente2.apk",
    iosDownLoadLink:
      "https://apps.apple.com/app/easy-bangla-patente/id6727004305",
    features: [
      "Interactive Quiz System",
      "Bengali Language Support",
      "Offline Mode Available",
      "Progress Tracking",
      "Mock Tests",
    ],
    screenShots: [
      "https://d1vstek0gf8y4r.cloudfront.net/Ebp_Assets/3.png",
      "https://d1vstek0gf8y4r.cloudfront.net/Ebp_Assets/4.png",
      "https://d1vstek0gf8y4r.cloudfront.net/Ebp_Assets/5.png",
      "https://d1vstek0gf8y4r.cloudfront.net/Ebp_Assets/6.png",
      "https://d1vstek0gf8y4r.cloudfront.net/Ebp_Assets/7.png",
      "https://d1vstek0gf8y4r.cloudfront.net/Ebp_Assets/8.png",
      "https://d1vstek0gf8y4r.cloudfront.net/Ebp_Assets/9.png",
    ],
  },
  {
    id: 2,
    name: "Quiz Bangla Patente",
    title: "Modern Quiz App",
    category: "Education",
    rating: 4.9,
    downloads: "50K+",
    size: "30 MB",
    version: "3.0.1",
    info: "Unlock Your Road to Success in Italy with Our Expert Driving License Courses and Quiz App for Bengali Speakers! 🚗 At Easy Bangla Patente, we specialize in helping the Bengali-speaking community in Italy achieve their dreams of obtaining an Italian driving license. Our platform offers comprehensive online courses tailored specifically for Bengali speakers, designed to simplify the process and ensure your success!",
    ytVideoLink: "",
    description:
      "The latest and most advanced driving license quiz app with modern UI and enhanced features for better learning experience.",
    logoLink:
      "https://d1vstek0gf8y4r.cloudfront.net/Ebp_Assets/qbp_app/Qbp-App-Primary-Logo.png",
    PlayStoreInstallLink:
      "https://play.google.com/store/apps/details?id=com.recursolve.quiz_bangla_patente",
    ApkDownloadLink:
      "https://d1vstek0gf8y4r.cloudfront.net/Ebp_Assets/quiz-bangla-patente-1.0.3(9).apk",
    iosDownLoadLink:
      "https://apps.apple.com/it/app/quiz-bangla-patente/id6742112091",
    features: [
      "Modern UI Design",
      "Advanced Analytics",
      "Social Features",
      "Cloud Sync",
      "Premium Content",
    ],
    screenShots: [
      "https://d1vstek0gf8y4r.cloudfront.net/Ebp_Assets/qbp_app/Designed_App_SS/1.png",
      "https://d1vstek0gf8y4r.cloudfront.net/Ebp_Assets/qbp_app/Designed_App_SS/2.png",
      "https://d1vstek0gf8y4r.cloudfront.net/Ebp_Assets/qbp_app/Designed_App_SS/3.png",
      "https://d1vstek0gf8y4r.cloudfront.net/Ebp_Assets/qbp_app/Designed_App_SS/4.png",
      "https://d1vstek0gf8y4r.cloudfront.net/Ebp_Assets/qbp_app/Designed_App_SS/5.png",
      "https://d1vstek0gf8y4r.cloudfront.net/Ebp_Assets/qbp_app/Designed_App_SS/6.png",
      "https://d1vstek0gf8y4r.cloudfront.net/Ebp_Assets/qbp_app/Designed_App_SS/7.png",
      "https://d1vstek0gf8y4r.cloudfront.net/Ebp_Assets/qbp_app/Designed_App_SS/8.png",
      "https://d1vstek0gf8y4r.cloudfront.net/Ebp_Assets/qbp_app/Designed_App_SS/9.png",
      "https://d1vstek0gf8y4r.cloudfront.net/Ebp_Assets/qbp_app/Designed_App_SS/10.png",
    ],
  },
];

/**
 * Get app by ID (server-side function)
 */
export function getAppById(id: number): AppInfo | undefined {
  return AppsInfo.find((app) => app.id === id);
}

/**
 * Get all apps (server-side function)
 */
export function getAllApps(): AppInfo[] {
  return AppsInfo;
}
