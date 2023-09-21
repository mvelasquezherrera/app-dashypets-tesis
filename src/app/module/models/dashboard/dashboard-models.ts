export class DashboardPanelModelResponse {
    titulo: string
    valor: string
}

export class DashboardRazaRangoEdadModelResponse {
    raza: string
    primerRango: number
    segundoRango: number
    tercerRango: number
    cuartoRango: number
    quintoRango: number
}

export class DashboardRazaSexoModelResponse {
    raza: string
    macho: number
    hembra: number
}

export class DataChartPieDrilldownDashboard {
    constructor(
        public name: string,
        public categories: string[],
        public data: number[]
    ) {}
}

export class DataChartPieDashboard {
    constructor(
        public y: number,
        public color: string,
        public drilldown: DataChartPieDrilldownDashboard
    ) {}
}