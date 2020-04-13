interface CategoryModel {
    codeId: string;
    parentId: string;
    codeName: string;
    showLevel: number;
    iconUrl: string;
}

interface PerformanceModel {
    projectId: number
    projectName: string
    projectType: number
    showPic: string
    showTime: string
    minPrice: number
    maxPrice: number
    showStartTime: number
    showEndTime: number
    venueName: string
}
