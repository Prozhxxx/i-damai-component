interface CityModel {
    id: number
    level: number
    name: string
    nameEasy: string
    parentId: number
    nameEn: string
}


interface AreaTreeModel{
    id: number
    name: string
}

interface CityTreeModel{
    id: number
    name: string
    areaList: AreaTreeModel[]
}

interface ProvinceTreeModel{
    id: number
    name: string
    cityList: CityTreeModel[]
}
