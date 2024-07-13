import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Bar } from 'react-chartjs-2';
import { fetchAnalyticsData } from '../slices/analyticsSlice';

const AnalyticsCenterContainer = styled.div`
  padding: 1rem;
`;

const AnalyticsCenter = () => {
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector(state => state.analytics);

  useEffect(() => {
    dispatch(fetchAnalyticsData());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const chartData = {
    labels: data.topPosts.map(post => post.id),
    datasets: [
      {
        label: 'Engagement',
        data: data.topPosts.map(post => post.engagement),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      }
    ]
  };

  return (
    <AnalyticsCenterContainer>
      <h1>Analytics Center</h1>
      <h2>Top Performing Posts</h2>
      <Bar data={chartData} />
      <h2>Audience Demographics</h2>
      {/* Add audience demographics visualization here */}
    </AnalyticsCenterContainer>
  );
};

export default AnalyticsCenter;