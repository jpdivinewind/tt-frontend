import {IExchangeRates} from '../types';

export interface ICardProps {
    rates: IExchangeRates;
}

function Card(props: ICardProps) {
    const groupedByCurrency: {
        [key: string]: {
            prices: {[key: string]: number};
        };
    } = {};
    for (const rate of props.rates.rates) {
        if (!(rate.currency in groupedByCurrency)) {
            groupedByCurrency[rate.currency] = {prices: {}};
        }
        groupedByCurrency[rate.currency].prices[rate.source] = rate.rate;
    }
    const date = new Date(props.rates.createdAt);
    const dateTimeString = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    return (
        <div>
            <p>{dateTimeString}</p>
            <ul>
                {Object.keys(groupedByCurrency).map((currency) => (
                    <li key={currency}>
                        <p>&emsp;{currency}</p>
                        <ul>
                            {Object.keys(
                                groupedByCurrency[currency].prices,
                            ).map((source) => (
                                <li key={source}>
                                    <p>
                                        &emsp;&emsp;{source} -- $
                                        {groupedByCurrency[currency].prices[
                                            source
                                        ].toFixed(4)}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Card;
