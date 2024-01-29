// StatisticContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Statistic {
    identifier: string;
    date: string;
    title: string;
    premium: number;
    subject?: string | undefined;
    description?: string | undefined;
    image_url?: string | undefined;
}

interface StatisticContextProps {
    selectedStatistic: Statistic | null;
    setSelectedStatistic: React.Dispatch<React.SetStateAction<Statistic | null>>;
    searchResults: Statistic[];
    setSearchResults: React.Dispatch<React.SetStateAction<Statistic[]>>;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const StatisticContext = createContext<StatisticContextProps | undefined>(undefined);

interface StatisticProviderProps {
    children: ReactNode;
}

const StatisticProvider: React.FC<StatisticProviderProps> = ({ children }) => {
    const [selectedStatistic, setSelectedStatistic] = useState<Statistic | null>(null);
    const [searchResults, setSearchResults] = useState<Statistic[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    return (
        <StatisticContext.Provider value={{ selectedStatistic, setSelectedStatistic, searchResults, setSearchResults, currentPage, setCurrentPage }}>
            {children}
        </StatisticContext.Provider>
    );
};

const useStatistic = () => {
    const context = useContext(StatisticContext);
    if (!context) {
        throw new Error('useStatistic must be used within a StatisticProvider');
    }
    return context;
};

export { StatisticProvider, useStatistic };
