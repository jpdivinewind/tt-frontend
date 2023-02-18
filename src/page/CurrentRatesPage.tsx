import {useContext} from 'react';
import Card from '../components/Card';
import Rates from '../context/rates';

function CurrentRatesPage() {
    const rates = useContext(Rates);

    if (!rates.current) {
        return <div />;
    }
    return (
        <div>
            <Card rates={rates.current}></Card>
        </div>
    );
}

export default CurrentRatesPage;
