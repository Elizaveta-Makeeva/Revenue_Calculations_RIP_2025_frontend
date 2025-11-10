import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <Container className="home-content">
        <Row className="justify-content-center">
          <Col lg={8}>
            <h1 className="home-title">Прогнозирование выручки методом скользящей средней</h1>
            
            <div className="home-description">
              <p>
                Сервис для прогнозирования выручки на следующий период на основе метода скользящей средней. 
                Используйте фактические данные о выручке за выбранные предыдущие периоды 
                для расчета точного прогноза.
              </p>
            </div>

            <div className="home-buttons">
              <Button 
                variant="success"
                className="home-button active-button"
                onClick={() => navigate('/periods')}
              >
                Перейти к периодам
              </Button>
              
              <Button 
                variant="secondary"
                className="home-button inactive-button"
                disabled
              >
                Сформированные заявки
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;