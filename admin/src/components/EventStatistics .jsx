import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const EventStatistics = () => {
    const [chartData, setChartData] = useState({});
    const [mostSold, setMostSold] = useState({});
    const [leastSold, setLeastSold] = useState({});
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSalesStats = async () => {
            try {
                const response = await axios.get('/event/sales-stats');
                const { mostSold, leastSold, allEvents } = response.data;

                if (Array.isArray(allEvents) && allEvents.length > 0) {
                    const labels = allEvents.map(event => event.name);
                    const data = allEvents.map(event => event.ticketsSold);

                    setChartData({
                        labels: labels,
                        datasets: [
                            {
                                label: 'Tickets Vendus',
                                data: data,
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)'
                                ],
                                borderColor: [
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(255, 159, 64, 1)'
                                ],
                                borderWidth: 1,
                            },
                        ],
                    });
                }

                setMostSold(mostSold || {});
                setLeastSold(leastSold || {});
                setError('');
            } catch (err) {
                console.error('Error fetching event sales stats:', err);
                setError('Erreur lors de la récupération des statistiques.');
            }
        };

        fetchSalesStats();
    }, []);

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg max-w-xl mt-6 mx-auto">
            <h2 className="text-2xl font-bold mb-4">Statistiques des Ventes de Tickets</h2>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {chartData.labels && chartData.labels.length > 0 ? (
                <div className="mt-6">
                    <Pie data={chartData} />
                </div>
            ) : (
                <p>Aucune donnée disponible pour les statistiques.</p>
            )}
            <div className="mt-6">
                <h3 className="text-lg font-semibold">Événement le Plus Vendu</h3>
                <p>{mostSold.name || 'Aucun événement trouvé'}</p>
                <p>Tickets vendus : {mostSold.ticketsSold || 0}</p>
                
                <h3 className="text-lg font-semibold mt-4">Événement le Moins Vendu</h3>
                <p>{leastSold.name || 'Aucun événement trouvé'}</p>
                <p>Tickets vendus : {leastSold.ticketsSold || 0}</p>
            </div>
        </div>
    );
};

export default EventStatistics;
