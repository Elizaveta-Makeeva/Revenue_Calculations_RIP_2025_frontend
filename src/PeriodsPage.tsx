import React, { useState, useEffect, useRef } from 'react';
import { Spinner } from 'react-bootstrap';
import InputField from './components/InputField';
import PeriodCard from './components/PeriodCard';
import BreadCrumbs from './components/BreadCrumbs';
import { getPeriodsByQuery } from './modules/periodsApi';
import type { Period } from './modules/periodsApi';
import { PERIODS_MOCK } from './modules/mock';
import './PeriodsPage.css';

const PeriodsPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [periods, setPeriods] = useState<Period[]>([]);
  const [cartInfo, setCartInfo] = useState({ periods_application_id: -1, periods_count: 0 });
  const hasFetchedRef = useRef(false);

  // Функция для получения информации о корзине
  const fetchCartInfo = async () => {
    try {
      console.log('Fetching cart info...');
      const response = await fetch('/api/periods-cart-info', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Cart info loaded:', data);
      setCartInfo(data.periods_cart);
    } catch (error) {
      console.log('Failed to load cart info, using default values. Error:', error);
      // Устанавливаем значения по умолчанию как требуется
      setCartInfo({ periods_application_id: -1, periods_count: 0 });
    }
  };

  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    const loadAllData = async () => {
      setLoading(true);
      try {
        console.log('Loading periods from API...');
        const { results } = await getPeriodsByQuery('');
        console.log('API data loaded successfully:', results);
        setPeriods(results);
        
        // Загружаем информацию о корзине
        await fetchCartInfo();
      } catch (error) {
        console.log('API unavailable, using mock data. Error:', error);
        setPeriods(PERIODS_MOCK.results);
        // Для мок данных тоже устанавливаем значения корзины
        setCartInfo({ periods_application_id: -1, periods_count: 0 });
      } finally {
        setLoading(false);
      }
    };
    
    loadAllData();
  }, []);

  const handleSearch = async () => {
    if (!searchValue.trim()) {
      const loadAllPeriods = async () => {
        setLoading(true);
        try {
          const { results } = await getPeriodsByQuery('');
          setPeriods(results);
        } catch (error) {
          setPeriods(PERIODS_MOCK.results);
        } finally {
          setLoading(false);
        }
      };
      loadAllPeriods();
      return;
    }

    setLoading(true);
    try {
      console.log('Searching with query:', searchValue);
      const { results } = await getPeriodsByQuery(searchValue);
      setPeriods(results);
    } catch (error) {
      console.log('API unavailable, using mock data for search. Error:', error);
      const filteredResults = PERIODS_MOCK.results.filter(period =>
        period.title?.toLowerCase().includes(searchValue.toLowerCase())
      );
      setPeriods(filteredResults);
    } finally {
      setLoading(false);
    }
  };

  // Логируем информацию о корзине для отладки
  useEffect(() => {
    console.log('Cart info updated:', cartInfo);
  }, [cartInfo]);

  return (
    <div className="app-container">
      <BreadCrumbs
        crumbs={[
          { label: 'Периоды' },
        ]}
      />

      {loading && (
        <div className="loadingBg">
          <Spinner animation="border" />
        </div>
      )}

      <InputField
        value={searchValue}
        setValue={setSearchValue}
        onSubmit={handleSearch}
        loading={loading}
        placeholder="Поиск периодов..."
        buttonTitle="Найти"
      />

      {!loading && periods.length === 0 && (
        <div className="no-results">
          <h1>К сожалению, ничего не найдено :(</h1>
        </div>
      )}

      <div className="cards-container">
        <ul>
          {periods.map((period) => (
            <li key={period.id}>
              <PeriodCard {...period} />
            </li>
          ))}
        </ul>
      </div>

      <div className="cart">
        <img 
          src="/inactive_cart.png" 
          alt="Корзина" 
          className="cart-icon"
        />
        {/* Можно отображать информацию о корзине если нужно */}
        {/* <div className="cart-badge">{cartInfo.periods_count}</div> */}
      </div>
    </div>
  );
};

export default PeriodsPage;