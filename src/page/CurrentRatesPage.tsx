import {useState, useEffect} from 'react';
import {IExchangeRates} from '../types';
import {io} from 'socket.io-client';
import useAsyncEffect from 'use-async-effect';
import Card from '../components/Card';

function CurrentRatesPage() {
    const [currentRates, setCurrentRates] = useState<IExchangeRates | null>(
        null,
    );

    const socket = io(import.meta.env.VITE_API_URL);
    useEffect(() => {
        socket.on(
            'exchange-rates-updated',
            (event: {exchangeRates: IExchangeRates}) => {
                setCurrentRates(event.exchangeRates);
            },
        );
        return () => {
            socket.off('exchange-rates-updated');
        };
    });

    useAsyncEffect(async () => {
        if (currentRates === null) {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/rates/current`,
            );
            const result = await response.json();
            setCurrentRates(result);
        }
    });

    if (!currentRates) {
        return <></>;
    }
    return (
        <>
            <Card rates={currentRates}></Card>
        </>
    );
}

export default CurrentRatesPage;
