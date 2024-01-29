// Favorites.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useStatistic } from '../context/StatisticContext';
import { DocumentTextIcon } from '@heroicons/react/20/solid';
import moment from 'moment';

interface Statistic {
    identifier: string;
    date: string;
    title: string;
    premium: number;
    subject?: string | undefined;
    description?: string | undefined;
    image_url?: string | undefined;
}

const Favorites: React.FC = () => {
    const { setSelectedStatistic, favorites } = useStatistic();
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
            <Link to="/" className="favorites-button">
                Go Back
            </Link>
            <h2>Favorites</h2>
            <ul className="result-list">
                {favorites.map((statistic) => (
                    <div className="result-item" key={statistic.identifier} >
                        <div className='max-width'>
                            <div className='result-date-icon'>
                                <DocumentTextIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                <span className='text-md font-semibold text-gray-800' >{moment(statistic.date).format('DD MMMM YYYY')}</span>
                            </div>
                            <div className='result-header'><p className="text-md font-semibold text-gray-800">
                                <Link onClick={() => handleClick(statistic)} to={`/detail`} >
                                    {statistic.title}
                                </Link>
                            </p>
                            </div>
                            <div className='result-badge'>
                                {statistic.premium === 1 && (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                        Premium
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

            </ul>
        </div>
    );
};

export default Favorites;

