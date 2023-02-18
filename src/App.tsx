import {Link} from 'react-router-dom';
import PageContainer from './PageContainer';

export default function App() {
    return (
        <div>
            <ul>
                <li>
                    <Link to="/">current</Link>
                </li>
                <li>
                    <Link to="/history">history</Link>
                </li>
            </ul>
            <hr />
            <PageContainer />
        </div>
    );
}
