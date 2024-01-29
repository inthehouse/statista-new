import { Component } from 'react';
import SearchBar from '../components/SearchBar';

interface Statistic {
    identifier: string;
    date: string;
    title: string;
    premium: number;
}

interface StatisticsResponse {
    items: Statistic[];
}

class IndexPage extends Component {
    state: {
        statistics: StatisticsResponse | null;
        isLoading: boolean;
        isError: boolean;
    } = {
            statistics: null,
            isLoading: true,
            isError: false,
        };

    async componentDidMount() {
        try {
            const response = await fetch('https://cdn.statcdn.com/static/application/search_results.json');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data: StatisticsResponse = await response.json();
            this.setState({ statistics: data, isLoading: false });
        } catch (error) {
            this.setState({ isError: true, isLoading: false });
        }
    }

    render() {
        const { statistics, isLoading, isError } = this.state;

        if (isLoading) {
            return <div>Loading...</div>;
        }

        if (isError) {
            return <div>Error fetching data</div>;
        }

        return (
            <div style={{ margin: '0 auto', padding: '16px' }}>
                <SearchBar data={statistics?.items || []} />
            </div>
        );
    }
}

export default IndexPage;
