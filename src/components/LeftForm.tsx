import { FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface IStockSymbol {
  currency: string,
  description: string,
  displaySymbol: string,
  figi: string,
  mic: string,
  symbol: string,
  type: string,
}

interface IProps {
  onAddStock: (symbol: string, alertValue: number) => void;
}

export default function LeftForm({ onAddStock }: IProps) {
  const [stockSymbols, setStockSymbols] = useState<IStockSymbol[]>([]);
  const [symbol, setSymbol] = useState<IStockSymbol>();
  const [alertValue, setAlertValue] = useState<number>();

  const handleSubmit = (e: React.FormEvent) => {
    if (symbol && alertValue) {
      e.preventDefault();
      // onAddStock(symbol.symbol, alertValue);
      onAddStock('BINANCE:BTCUSDT', 2);      
      //onAddStock('BTCM', 2);      
      
    }
  };

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const url = 'https://finnhub.io/api/v1/stock/symbol?token=cq7k9ihr01qormuik3m0cq7k9ihr01qormuik3mg&exchange=US&mic=XASE'
        const response = await fetch(url);

        if (!response.ok) {
          const message = `An error has occured: ${response.status}`;
          throw new Error(message);
        }

        const data = await response.json();
        setStockSymbols(data)

      } catch (error) {
        console.log(error)
      }
    }

    fetchStockData()

  }, [])

  return (
    <form onSubmit={handleSubmit}>
      <FormControl fullWidth margin="normal">
        <InputLabel id="stock-select-label">Select Stock</InputLabel>
        <Select
          labelId="stock-select-label"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value as IStockSymbol)}
          label="Select Stock"
        >
          {/*<MenuItem value="AAPL">Apple (AAPL)</MenuItem>
          <option value="AAPL">Apple (AAPL)</option>
          <option value="BINANCE:BTCUSDT">Bitcoin (BTC)</option>
          <option value="IC MARKETS:1">IC Markets</option>*/}
          {stockSymbols.map((item) => (
            <MenuItem key={item.symbol} value={item.symbol}>{item.description}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Price Alert"
          type="number"
          value={alertValue}
          onChange={(e) => setAlertValue(Number(e.target.value))}
        />
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        Add Stock
      </Button>
    </form>
  );
}


