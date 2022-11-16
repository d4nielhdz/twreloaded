import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import UserItem from '../components/UserItem';
import { User } from '../models/user';
import { searchUsers } from '../services/users-service';

function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const SearchScreen = () => {
    const queryParams = useQuery();
    const searchQuery = queryParams.get('query');
    const [results, setResults] = useState<User[]>([]);

    useEffect(() => {
        if (searchQuery) {
            const getResults = async () => {
                const data = await searchUsers(searchQuery) as User[];
                setResults(data);
            }
            getResults().catch(console.error);
        }
    }, [searchQuery]);

    return (
        <div>
            <h1 className='mb-1'>Búsqueda</h1>
            <p>Resultados para: {searchQuery}</p>
            <div className='mt-1'>
                {results.map((result, i) => <UserItem user={result} key={i} />)}
            </div>
        </div>
    )
}

export default SearchScreen