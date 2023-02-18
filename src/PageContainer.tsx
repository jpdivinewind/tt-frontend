import {useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import CurrentRatesPage from './page/CurrentRatesPage';
import RatesHistoryPage from './page/RatesHistoryPage';
import {IExchangeRates} from './types';
import {io} from 'socket.io-client';
import Rates, {ICurrentRatesContext} from './context/rates';
import useAsyncEffect from 'use-async-effect';

const PageContainer = () => {
    const [rates, setRates] = useState<ICurrentRatesContext>({current: null});

    const socket = io(import.meta.env.VITE_API_URL);
    socket.on(
        'exchange-rates-updated',
        (event: {exchangeRates: IExchangeRates}) => {
            setRates({current: event.exchangeRates});
        },
    );

    useAsyncEffect(async () => {
        if (rates.current === null) {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/rates/current`,
            );
            const result = await response.json();
            setRates({current: result});
        }
    });

    return (
        <Rates.Provider value={rates}>
            <Routes>
                <Route path="/" element={<CurrentRatesPage />} />
                <Route path="/history/:page?" element={<RatesHistoryPage />} />
            </Routes>
        </Rates.Provider>
    );
};

export default PageContainer;
