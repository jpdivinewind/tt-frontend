import {createContext} from 'react';
import {IExchangeRates} from '../types';

export interface ICurrentRatesContext {
    current: IExchangeRates | null;
}

export default createContext<ICurrentRatesContext>({current: null});
