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

export class DashboardSintomasPositivoParvovirusModelResponse {
    idSintoma: number
    sintoma: string
    cantidadSintoma: number
}

export class DataChartTreemapDashboard {
    constructor(
        public name: string,
        public value: number,
        public colorValue: number
    ) {}
}

export class DashboardPredecidoConfirmadoParvovirusRazaModelResponse {
    anio: number
    raza: string
    cantidadPrediccionPositivoParvovirus: number
    cantidadPrediccionNegativoParvovirus: number
    cantidadConfirmadoPositivoParvovirus: number
    cantidadConfirmadoNegativoParvovirus: number
}

export class DataChartColumnDashboard {
    constructor(
        public type: string,
        public name: string,
        public data: number[],
        public stack: string
    ) {}
}