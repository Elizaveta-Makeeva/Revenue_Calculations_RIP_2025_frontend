import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPeriodById } from './modules/periodsApi';
import type { Period } from './modules/periodsApi'
import { PERIODS_MOCK } from './modules/mock';
import BreadCrumbs from './components/BreadCrumbs';
import './PeriodDetail.css';

const PeriodDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [period, setPeriod] = useState<Period | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    console.log('PeriodDetail mounted, id:', id);
    
    const loadPeriod = async () => {
      if (!id) {
        console.log('No id provided');
        navigate('/');
        return;
      }
      
      try {
        console.log('Fetching period with id:', id);
        const data = await getPeriodById(id);
        console.log('Fetched data:', data);
        
        if (data) {
          setPeriod(data);
        } else {
          const mockPeriod = PERIODS_MOCK.results.find(p => p.id.toString() === id);
          if (mockPeriod) {
            setPeriod(mockPeriod);
          } else {
            setError('Period not found');
          }
        }
      } catch (err) {
        console.error('Error loading period:', err);
        const mockPeriod = PERIODS_MOCK.results.find(p => p.id.toString() === id);
        if (mockPeriod) {
          setPeriod(mockPeriod);
        } else {
          setError('Period not found');
        }
      } finally {
        setLoading(false);
      }
    };
    
    loadPeriod();
  }, [id, navigate]);

  if (loading) return <div style={{ color: 'white', textAlign: 'center', marginTop: '200px' }}>Загрузка...</div>;
  if (error) return <div style={{ color: 'red', textAlign: 'center', marginTop: '200px' }}>{error}</div>;
  if (!period) return <div style={{ color: 'white', textAlign: 'center', marginTop: '200px' }}>Период не найден</div>;

  return (
    <div className="period-detail-page">
      <BreadCrumbs
        crumbs={[
          { label: 'Периоды', path: '/periods' },
          { label: period.title || 'Период' },
        ]}
      />

      <div className="period-detail-card">
        <h1 className="period-detail-card-title">{period.title}</h1>
        <div className="period-detail-card-description">
          {period.detailed_description}
        </div>
        {period.img && (
          <img src={period.img} alt={period.title} className="period-detail-card-img" />
        )}
        <div className="period-detail-card-duration">
          {period.duration}
        </div>
      </div>
    </div>
  );
};

export default PeriodDetail;