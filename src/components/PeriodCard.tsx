import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import './PeriodCard.css';

interface Props {
  id: number;
  title?: string;
  description?: string;
  duration?: string;
  img?: string;
  shortdescription?: string;
  short_description?: string;
  detaileddescription?: string;
  detailed_description?: string;
  isactive?: boolean;
  is_active?: boolean;
}

const PeriodCard: FC<Props> = ({ id, title, description, duration, img }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/period/${id}`);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error('Image failed to load:', img);
    e.currentTarget.style.display = 'none'; // Скрываем сломанную картинку
  };

  return (
    <div className="period-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <div className="period-card-title">{title}</div>
      <div className="period-card-description">{description}</div>
      {img && (
        <img 
          src={img} 
          alt={title} 
          className="period-card-img" 
          onError={handleImageError}
        />
      )}
      <div className="period-card-duration">{duration}</div>
      <button 
        className="period-card-more"
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/period/${id}`);
        }}
      >
        Подробнее
      </button>
    </div>
  );
};

export default PeriodCard;