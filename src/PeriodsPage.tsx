import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';
import InputField from './components/InputField';
import PeriodCard from './components/PeriodCard';
import BreadCrumbs from './components/BreadCrumbs';
import { getPeriodsByQuery } from './modules/periodsApi';
import type { Period } from './modules/periodsApi';
import { PERIODS_MOCK } from './modules/mock';
import { 
  usePeriods, 
  useSearchQuery, 
  setSearchQueryAction,
  setPeriodsAction 
} from './slices/periodsSlice';
import { useDispatch } from 'react-redux';
import { GetPeriodsData } from './periodsData';
import './PeriodsPage.css';

const PeriodsPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [cartInfo, setCartInfo] = useState({ periods_application_id: -1, periods_count: 0 });
  const [localSearchValue, setLocalSearchValue] = useState('');
  const hasFetchedRef = useRef(false);
  
  const dispatch = useDispatch();
  const periods = usePeriods();
  const searchQuery = useSearchQuery();

  // Загружаем данные периодов через Redux
  GetPeriodsData();

  // Функция для получения информации о корзине
  const fetchCartInfo = async () => {
    try {
      console.log('Fetching cart info...');
      const response = await axios.get('/api/periods-cart-info');
      console.log('Cart info loaded:', response.data);
      setCartInfo(response.data.periods_cart || response.data);
    } catch (error) {
      console.log('Failed to load cart info, using default values. Error:', error);
      setCartInfo({ periods_application_id: -1, periods_count: 0 });
    }
  };

  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    const loadAllData = async () => {
      setLoading(true);
      try {
        // Загружаем информацию о корзине
        await fetchCartInfo();
      } catch (error) {
        console.log('API unavailable, using mock data. Error:', error);
        setCartInfo({ periods_application_id: -1, periods_count: 0 });
      } finally {
        setLoading(false);
      }
    };
    
    loadAllData();
  }, []);

  useEffect(() => {
    setLocalSearchValue(searchQuery);
  }, [searchQuery]);

  const filteredPeriods = useMemo(() => {
    if (!searchQuery) {
      return periods;
    }
    
    return periods.filter((period: Period) =>
      period.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      period.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [periods, searchQuery]);

  const handleSearch = async () => {
    setLoading(true);
    try {
      console.log('Searching with query:', localSearchValue);
      dispatch(setSearchQueryAction(localSearchValue));
      const { results } = await getPeriodsByQuery(localSearchValue);
      dispatch(setPeriodsAction(results));
    } catch (error) {
      console.log('Search failed, using current periods. Error:', error);
      const filteredResults = PERIODS_MOCK.results.filter((period: Period) =>
        period.title?.toLowerCase().includes(localSearchValue.toLowerCase())
      );
      dispatch(setPeriodsAction(filteredResults));
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (value: string) => {
    setLocalSearchValue(value);
  };

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
        value={localSearchValue}
        setValue={handleSearchChange}
        onSubmit={handleSearch}
        loading={loading}
        placeholder="Поиск периодов..."
        buttonTitle="Найти"
      />

      {!loading && filteredPeriods.length === 0 && searchQuery && (
        <div className="no-results">
          <h1>К сожалению, ничего не найдено :(</h1>
        </div>
      )}

      <div className="cards-container">
        <ul>
          {filteredPeriods.map((period: Period) => (
            <li key={period.id}>
              <PeriodCard {...period} />
            </li>
          ))}
        </ul>
      </div>

      <div className="cart">
        <img 
          src="./inactive_cart.png" 
          alt="Корзина" 
          className="cart-icon"
        />
        {cartInfo.periods_count > 0 && (
          <div className="cart-count">
            {cartInfo.periods_count}
          </div>
        )}
      </div>
    </div>
  );
};

export default PeriodsPage;