import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import Container from '@mui/material/Container';
import { useState, useEffect } from 'react';
import { ENV } from '@/env/env';
import { setDefaultHighWaterMark } from 'stream';

// Generate Order Data
function createData(
  id: number,
  date: string,
  name: string,
  shipTo: string,
  paymentMethod: string,
  amount: number,
) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

interface IProductData {
  id: number;
  stateNumber: number;
  title: string;
  category: string;
  price: number;
  date: string;
  views: number;
  link: string;
}

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function QzService() {
  const [data, setData] = useState<IProductData[]>([])

  const getProductData = async () => {
    return (await fetch(`${ENV.API_URL}/product/getProducts`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })).json()
  }

  useEffect(() => {
    (async () => {
      const result = await getProductData();
      console.log(result)
      if(result !== undefined) setData(result.data)
    })()
  }, [])
  
  return (
    <Container
        component="main"
        style={{ justifyContent: 'center', marginTop: '150px', maxWidth: '800px' }}
      >
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Ship To</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.stateNumber}</TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.category}</TableCell>
              <TableCell>{row.price}</TableCell>
              <TableCell align="right">{`$${row.date}`}</TableCell>
              <TableCell align="right">{`$${row.views}`}</TableCell>
              <Link href={row.link}>
                <Button variant="contained" startIcon={<ArrowOutwardIcon />}></Button>
              </Link>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </Container>
  );
}