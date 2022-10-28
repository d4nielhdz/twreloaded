import React from 'react'
import { useLocation } from 'react-router-dom';
import UserItem from '../components/UserItem';

function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const SearchScreen = () => {
    const queryParams = useQuery();
    const searchQuery = queryParams.get('query');

    return (
        <div>
            <h1 className='mb-1'>Búsqueda</h1>
            <p>Resultados para: {searchQuery}</p>
            <div className='mt-1'>
                <UserItem />
                <UserItem />
                <UserItem />
            </div>
        </div>
    )
}

export default SearchScreen