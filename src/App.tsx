import React, { useEffect, useState } from 'react';
import LeftForm from './components/LeftForm';
import TopCards from './components/TopCards';
import StockChart from './components/StockChart';
import { Box, Container, Grid } from '@mui/material';
import Header from './components/common/Header';
import MainContainer from './components/common/MainContainer';
import { IStock } from './interfaces/IStock';
import { IStockData } from './interfaces/IStockData';
import { apiKey } from './services/apiService';

const App: React.FC = () => {
  const [stocks, setStocks] = useState<IStock[]>([]);
  const [stockData, setStockData] = useState<{ [key: string]: IStockData[] }>({});

  useEffect(() => {
    const socket = new WebSocket(`wss://ws.finnhub.io?token=${apiKey}`);

    socket.addEventListener('open', () => {
      stocks.forEach((stock) => {
        socket.send(JSON.stringify({ type: 'subscribe', symbol: stock.symbol }));
      });
    });

    socket.addEventListener('message', (event) => {
      const response = JSON.parse(event.data);

      if (response.type === 'trade') {
        const symbol = response.data[0].s;
        const price = response.data[0].p;
        const change = ((price - stocks.find((s) => s.symbol === symbol)!.price) / price) * 100;

        setStocks((prevStocks) =>
          prevStocks.map((stock) =>
            stock.symbol === symbol ? { ...stock, price, change } : stock
          )
        );

        setStockData((prevData) => ({
          ...prevData,
          [symbol]: [...(prevData[symbol] || []), { name: new Date().toLocaleTimeString(), price }],
        }));
      }
    });

    return () => {
      socket.close();
    };
  }, [stocks]);

  const handleAddStock = (symbol: string, alertValue: number) => {
    const newStock: IStock = { symbol, price: 0, change: 0, alertValue }
    setStocks((prevStocks) => [...prevStocks, newStock]);
  };

  return (
    <Container>
      <Header />
      <MainContainer>
        <Box sx={{ py: 2, minHeight: '105px', bgcolor: 'aliceblue', display: 'flex', alignItems: 'center' }}>
          <TopCards stocks={stocks} />
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={3} md={4}>
            <LeftForm onAddStock={handleAddStock} />
          </Grid>
          <Grid item xs={9} md={8}>
            <Box sx={{ mt: 2 }}>
              {Object.keys(stockData).length > 0 && <StockChart data={stockData} />}
            </Box>
          </Grid>
        </Grid>

      </MainContainer>
    </Container>
  );
};

export default App;
