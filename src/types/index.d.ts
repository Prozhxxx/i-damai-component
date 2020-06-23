
declare module '*.scss';
declare module '*.css';
declare module 'AMap'



interface Window {
    eventTarget: EventTarget;
}

interface CategoryModel {
    codeId: string;
    parentId: string;
    codeName: string;
    showLevel: number;
    iconUrl: string;
}

interface RouteModel {
    name?: string,
    exact?: false,
    title: string,
    path: string,
    component: React.ComponentType<any>,
}

declare module NodeJS {
    interface Global {
        locationCallback: (object) => void;
        nativeLocation: () => void;
    }
}

