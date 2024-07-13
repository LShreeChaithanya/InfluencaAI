import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SidebarContainer = styled.aside`
  width: 200px;
  background-color: #f8f9fa;
  height: calc(100vh - 60px);
  padding: 1rem;
`;

const SidebarLink = styled(Link)`
  display: block;
  color: #333;
  text-decoration: none;
  padding: 0.5rem 0;
  &:hover {
    color: #1da1f2;
  }
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SidebarLink to="/">Dashboard</SidebarLink>
      <SidebarLink to="/content-studio">Content Studio</SidebarLink>
      <SidebarLink to="/analytics">Analytics Center</SidebarLink>
      <SidebarLink to="/partnerships">Brand Partnerships</SidebarLink>
    </SidebarContainer>
  );
};

export default Sidebar;