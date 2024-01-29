import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useStatistic } from '../context/StatisticContext';
import { DocumentTextIcon } from '@heroicons/react/20/solid';
import Pagination from './Pagination';

interface Statistic {
    identifier: string;
    date: string;
    title: string;
    premium: number;
    subject?: string | undefined;
    description?: string | undefined;
    image_url?: string | undefined;
}

interface SearchBarProps {
    data: Statistic[];
}

const useSearch = () => {
    const [query, setQuery] = useState('');
    const { searchResults, setSearchResults, currentPage, setCurrentPage } = useStatistic();
    const [isError, setIsError] = useState(false);
    const itemsPerPage = 6;

    const handleSearch = (data: Statistic[]) => {
        setSearchResults([]);
        setIsError(false);
        const filteredStats = data.length > 0
            ? data.filter(statistic => statistic.title.toLowerCase().includes(query.toLowerCase()))
            : [];
        setSearchResults(filteredStats);
        setCurrentPage(1);
    };

    const totalPages = Math.ceil(searchResults.length / itemsPerPage);

    const visiblePages = Array.from({ length: totalPages }, (_, i) => i + 1);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const getVisibleItems = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return searchResults.slice(startIndex, endIndex);
    };

    return {
        query,
        setQuery,
        searchResults,
        isError,
        handleSearch,
        visiblePages,
        currentPage,
        setCurrentPage,
        handlePageChange,
        totalPages,
        getVisibleItems,
    };
};



const SearchBar: React.FC<SearchBarProps> = ({ data }) => {
    const { setSelectedStatistic, currentPage } = useStatistic();
    const {
        query,
        setQuery,
        isError,
        handleSearch,
        handlePageChange,
        getVisibleItems,
        totalPages,
    } = useSearch();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSearch(data);
    };

    const handleClick = (statistic: Statistic) => {
        const { subject = '', description = '', image_url = '' } = statistic;

        const updatedStatistic: Statistic = {
            identifier: statistic.identifier,
            date: statistic.date,
            title: statistic.title,
            premium: statistic.premium,
            subject,
            description,
            image_url,
        };

        setSelectedStatistic(updatedStatistic);
    };

    return (
        <div className="search-bar">
            <form onSubmit={handleSubmit} className="search-form">
                <input
                    type="text"
                    placeholder="Search Statista"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="search-input"
                />
                <button
                    type="submit"
                    className="search-button"
                >
                    Search
                </button>
            </form>

            <ul className="result-list">
                {getVisibleItems().map((statistic) => (
                    <Link key={statistic.identifier} onClick={() => handleClick(statistic)} to={`/detail`} className="result-item">
                        <div className='max-width'>
                            <div className='result-date-icon'>
                                <DocumentTextIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                <span className='text-md font-semibold text-gray-800' >{moment(statistic.date).format('DD MMMM YYYY')}</span>
                            </div>
                            <div className='result-header'><p className="text-md font-semibold text-gray-800">{statistic.title}</p>
                            </div>
                            <div className='result-badge'>
                                {statistic.premium === 1 && (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                        Premium
                                    </span>
                                )}
                            </div>
                        </div>

                    </Link>
                ))}
                {isError && (
                    <li className="error-item">
                        No data found
                    </li>
                )}
            </ul>




            {totalPages > 1 && (
                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
};

export default SearchBar;