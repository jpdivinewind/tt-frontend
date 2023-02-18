import {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useAsyncEffect} from 'use-async-effect';
import Card from '../components/Card';
import {IExchangeRates} from '../types';

function RatesHistoryPage() {
    const {page = '1'} = useParams();
    const [loadedPage, setLoadedPage] = useState('-1');
    const [list, setList] = useState<IExchangeRates[]>([]);
    const [pages, setPages] = useState(1);
    const navigate = useNavigate();

    useAsyncEffect(async () => {
        if (loadedPage !== page) {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/rates/history?page=${page}`,
            );
            const result = await response.json();
            setLoadedPage(page);
            setList(result.rates);
            setPages(result.pages);
        }
    }, [page]);

    const pageNum = parseInt(page);
    return (
        <>
            {pageNum > 1 ? (
                <button
                    type="button"
                    onClick={() => navigate(`/history/${pageNum - 1}`)}
                >
                    prev
                </button>
            ) : (
                <button disabled>prev</button>
            )}
            {pageNum < pages ? (
                <button
                    type="button"
                    onClick={() => navigate(`/history/${pageNum + 1}`)}
                >
                    next
                </button>
            ) : (
                <button disabled>next</button>
            )}
            <hr />
            <ul>
                {list.map((rates) => (
                    <li key={rates.createdAt.toString()}>
                        <Card rates={rates}></Card>
                        <hr />
                    </li>
                ))}
            </ul>
        </>
    );
}

export default RatesHistoryPage;
