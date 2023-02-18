export interface IExchangeRate {
    currency: string;
    source: string;
    rate: number;
}

export interface IExchangeRates {
    rates: IExchangeRate[];
    createdAt: Date;
}
