import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { fetchPartnershipData } from '../slices/partnershipSlice';

const BrandPartnershipsContainer = styled.div`
  padding: 1rem;
`;

const PartnershipCard = styled.div`
  background-color: #f8f9fa;
  border-radius: 4px;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const BrandPartnerships = () => {
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector(state => state.partnerships);

  useEffect(() => {
    dispatch(fetchPartnershipData());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <BrandPartnershipsContainer>
      <h1>Brand Partnerships</h1>
      {data.potentialPartnerships.map(partnership => (
        <PartnershipCard key={partnership.id}>
          <h3>{partnership.brandName}</h3>
          <p>Match Score: {partnership.matchScore}%</p>
          <p>{partnership.description}</p>
          <button>Contact Brand</button>
        </PartnershipCard>
      ))}
    </BrandPartnershipsContainer>
  );
};

export default BrandPartnerships;