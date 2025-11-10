import type { FC } from 'react';
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
  return (
    <div className="period-card">
      <div className="period-card-title">{title}</div>
      <div className="period-card-description">{description}</div>
      {img && <img src={img} alt={title} className="period-card-img" />}
      <div className="period-card-duration">{duration}</div>
      <a href={`/period/${id}`} className="period-card-more">
        Подробнее
      </a>
    </div>
  );
};

export default PeriodCard;
