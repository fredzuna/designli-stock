import { useFormik } from 'formik';
import { FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { IStockSymbol } from '../interfaces/IStockSymbol';
import { fetchStockSymbols } from '../services/apiService';
import * as Yup from 'yup';

interface IStockFormValues {
  symbol: string;
  alertValue: number;
}

const validationSchema = Yup.object({
  symbol: Yup.string().required('Stock selection is required'),
  alertValue: Yup.number()
    .required('Alert value is required')
    .positive('Alert value must be a positive number'),
});

interface IProps {
  onAddStock: (symbol: string, alertValue: number) => void;
}

export default function LeftForm({ onAddStock }: IProps) {
  const [stockSymbols, setStockSymbols] = useState<IStockSymbol[]>([]);

  const formik = useFormik<IStockFormValues>({
    initialValues: {
      symbol: '',
      alertValue: 0,
    },
    validationSchema,
    onSubmit: (values) => {
      handleSubmit(values)
    },
  });

  const handleSubmit = (values: IStockFormValues) => {
    onAddStock(values.symbol, values.alertValue);
  };

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const data = await fetchStockSymbols()
        setStockSymbols(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchStockData()
  }, [])

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl fullWidth margin="normal">
        <InputLabel id="stock-select-label">Select Stock</InputLabel>
        <Select
          labelId="stock-select-label"
          id="symbol"
          name="symbol"
          value={formik.values.symbol}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          label="Select Stock"
        >
          {stockSymbols.map((item) => (
            <MenuItem key={item.symbol} value={item.symbol}>{item.description}</MenuItem>
          ))}
        </Select>
        {formik.touched.symbol && formik.errors.symbol ? (
          <div style={{ color: 'red' }}>{formik.errors.symbol}</div>
        ) : null}
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          id="alertValue"
          name="alertValue"
          label="Price Alert"
          type="number"
          value={formik.values.alertValue}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.alertValue && formik.errors.alertValue ? (
          <div style={{ color: 'red' }}>{formik.errors.alertValue}</div>
        ) : null}
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        Add Stock
      </Button>
    </form>
  );
}


