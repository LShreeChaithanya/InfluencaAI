import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import { fetchDashboardData } from '../slices/dashboardSlice';

const DashboardContainer = styled.div`
  padding: 1rem;
`;

const MetricCard = styled.div`
  background-color: #f8f9fa;
  border-radius: 4px;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector(state => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const chartData = {
    labels: data.engagementHistory.map(item => item.date),
    datasets: [
      {
        label: 'Engagement Rate',
        data: data.engagementHistory.map(item => item.rate),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  return (
    <DashboardContainer>
      <h1>Dashboard</h1>
      <MetricCard>
        <h3>Followers</h3>
        <p>{data.followers}</p>
      </MetricCard>
      <MetricCard>
        <h3>Average Engagement Rate</h3>
        <p>{data.avgEngagementRate}%</p>
      </MetricCard>
      <h2>Engagement History</h2>
      <Line data={chartData} />
    </DashboardContainer>
  );
};

export default Dashboard;