import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

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
    favorites: Statistic[];
    addToFavorites: (statistic: Statistic) => void;
    removeFromFavorites: (identifier: string) => void;
}

const StatisticContext = createContext<StatisticContextProps | undefined>(undefined);

interface StatisticProviderProps {
    children: ReactNode;
}

const StatisticProvider: React.FC<StatisticProviderProps> = ({ children }) => {
    const [selectedStatistic, setSelectedStatistic] = useState<Statistic | null>(null);
    const [searchResults, setSearchResults] = useState<Statistic[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [favorites, setFavorites] = useState<Statistic[]>(JSON.parse(localStorage.getItem('favorites') || '[]'));

    useEffect(() => {
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const addToFavorites = (statistic: Statistic) => {
        if (!favorites.some((fav) => fav.identifier === statistic.identifier)) {
            setFavorites((prevFavorites) => [...prevFavorites, statistic]);
        }
    };

    const removeFromFavorites = (identifier: string) => {
        setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.identifier !== identifier));
    };

    return (
        <StatisticContext.Provider value={{ selectedStatistic, setSelectedStatistic, searchResults, setSearchResults, currentPage, setCurrentPage, favorites, addToFavorites, removeFromFavorites }}>
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
