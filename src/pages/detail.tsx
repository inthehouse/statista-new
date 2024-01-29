import React from 'react';
import { useStatistic } from '../context/StatisticContext';
import { useNavigate } from 'react-router-dom';

import moment from 'moment';

const DetailPage: React.FC = () => {
    const { selectedStatistic } = useStatistic();
    const history = useNavigate();
    if (selectedStatistic === null || selectedStatistic === undefined) {
        return <div>Loading...</div>; // or handle null case as per your application logic
    }
    const handleBack = () => {
        history(-1);
    };


    return (
        <div className="detail-page">
            <h2 className="title">{selectedStatistic.title}</h2>
            <p className="subject">{selectedStatistic.subject}</p>
            <div className="details-container">
                <p className="date">{moment(selectedStatistic.date).format('DD MMMM YYYY')}</p>
                <div className="description">{selectedStatistic.description}</div>
            </div>
            <div className="image-container">
                <img
                    src={selectedStatistic.image_url}
                    alt="stats"
                    className="rounded-image"
                />
            </div>
            <button className="back-button" onClick={handleBack}>
                Back
            </button>
        </div>
    );

};

export default DetailPage;
