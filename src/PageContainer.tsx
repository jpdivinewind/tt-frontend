import {Routes, Route} from 'react-router-dom';
import CurrentRatesPage from './page/CurrentRatesPage';
import RatesHistoryPage from './page/RatesHistoryPage';

const PageContainer = () => {
    return (
        <Routes>
            <Route path="/" element={<CurrentRatesPage />} />
            <Route path="/history/:page?" element={<RatesHistoryPage />} />
        </Routes>
    );
};

export default PageContainer;
