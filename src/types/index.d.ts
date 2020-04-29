declare module '*.scss';
declare module '*.css';
declare module 'AMap'

interface CategoryModel {
    codeId: string;
    parentId: string;
    codeName: string;
    showLevel: number;
    iconUrl: string;
}

interface CityModel {
    id: number
    level: number
    name: string
    nameEasy: string
    parentId: number
    nameEn: string
}

declare module NodeJS {
    interface Global {
        locationCallback: (object) => void;
        nativeLocation: () => void;
    }
}

