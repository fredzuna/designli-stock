import { Card, CardContent, Grid, Typography } from '@mui/material';
import { IStock } from '../interfaces/IStock';

interface ICardItem {
  stock: IStock;
}

function CardItem({ stock }: ICardItem) {
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <Card        
        style={{
          backgroundColor: stock.price >= stock.alertValue ? 'green' : 'red',
        }}
        className={stock.symbol}
      >
        <CardContent>
          <Typography variant="h5">{stock.symbol}</Typography>
          <Typography variant="body1">${stock.price.toFixed(2)}</Typography>
          <Typography variant="body2">
            Change: {stock.change.toFixed(2)}%
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

interface ITopCards {
  stocks: IStock[];
}

export default function TopCards({ stocks }: ITopCards) {
  return (
    <Grid container spacing={2} >
      {stocks.length === 0 &&
        <Grid xs item>
          <Typography variant="subtitle2" gutterBottom textAlign={'center'}>
            No stock data
          </Typography>
        </Grid>
      }
      {stocks.map((stock, index) => (
        <Grid xs="auto" key={stock.symbol+index} item>
          <CardItem stock={stock} />
        </Grid>
      ))}
    </Grid>
  )
}