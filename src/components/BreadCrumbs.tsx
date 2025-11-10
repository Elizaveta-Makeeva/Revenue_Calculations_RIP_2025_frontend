import React from 'react';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import './BreadCrumbs.css';

interface Crumb {
  label: string;
  path?: string;
}

interface BreadCrumbsProps {
  crumbs: Crumb[];
}

const BreadCrumbs: FC<BreadCrumbsProps> = ({ crumbs }) => {
  const navigate = useNavigate();

  const handleClick = (path?: string) => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <ul className="breadcrumbs">
      <li>
        <a onClick={() => navigate('/')} className="breadcrumb-link">
          Home
        </a>
      </li>
      {crumbs.map((crumb, index) => (
        <React.Fragment key={index}>
          <li className="slash">/</li>
          <li>
            {crumb.path ? (
              <a
                onClick={() => handleClick(crumb.path)}
                className="breadcrumb-link"
              >
                {crumb.label}
              </a>
            ) : (
              <span>{crumb.label}</span>
            )}
          </li>
        </React.Fragment>
      ))}
    </ul>
  );
};

export default BreadCrumbs;
