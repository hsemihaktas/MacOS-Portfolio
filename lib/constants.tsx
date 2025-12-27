
import { AppID } from './types';

export const INITIAL_Z_INDEX = 10;

export const APPS: { id: AppID; title: string; iconUrl: string }[] = [
    {
        id: 'about',
        title: 'Finder',
        iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Finder_Icon_macOS_Big_Sur.png/512px-Finder_Icon_macOS_Big_Sur.png'
    },
    {
        id: 'projects',
        title: 'Projeler',
        iconUrl: 'https://help.apple.com/assets/65A03A96E75918A00F0054F0/65A03A986895521C6F04F695/en_US/4977990176378D8D346D896A6286D2C4.png'
    },
    {
        id: 'ai-asistan',
        title: 'Siri',
        iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Siri_logo.png/600px-Siri_logo.png'
    },
    {
        id: 'activity-monitor',
        title: 'Sistem',
        iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Activity_Monitor_icon.png/512px-Activity_Monitor_icon.png'
    },
    {
        id: 'settings',
        title: 'Ayarlar',
        iconUrl: 'https://help.apple.com/assets/65A03A96E75918A00F0054F0/65A03A986895521C6F04F695/en_US/0100910176378D8D346D896A6286D2C4.png'
    },
    {
        id: 'contact',
        title: 'Mail',
        iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Mail_Icon_macOS_Big_Sur.png/512px-Mail_Icon_macOS_Big_Sur.png'
    }
];
