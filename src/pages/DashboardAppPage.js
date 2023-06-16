import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';

// sections
import { AppTasks, AppCurrentVisits, AppWidgetSummary } from '../sections/@dashboard/app';
import { useEffect, useState } from 'react';
import { list } from '../service/connectionFirebase';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();

  function countOccurrences(id) {
    let count = 0;

    books.map((book) => {
      if (book.publishingId === id) {
        count++;
      }
    });

    return count;
  }

  const [books, setBooks] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [data, setData] = useState([]);

  //  Utilizar a API
  async function findBooks() {
    await list('book', setBooks);
  }

  async function findPublishers() {
    await list('publishing', setPublishers);
    setData(
      publishers.map((publishing) => {
        return { label: publishing.name, value: countOccurrences(publishing.id) };
      })
    );
  }

  useEffect(() => {
    findBooks();
    findPublishers();
  }, [books.length]);

  useEffect(() => {
    findBooks();
    findPublishers();
  }, [publishers.length]);

  return (
    <>
      <Helmet>
        <title> Livraria - FatecLibrary </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 2 }}>
          Bem-vindo, aqui estão os dados sobre sua livraria:
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <AppWidgetSummary
              title="Livros cadastrados"
              total={books.length}
              color="info"
              icon={'ic:outline-menu-book'}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <AppWidgetSummary
              title="Editoras cadastradas"
              total={publishers.length}
              color="warning"
              icon={'mingcute:pencil-fill'}
            />
          </Grid>

          <Grid item xs={12} md={5}>
            <AppCurrentVisits
              title="Editoras"
              chartData={data}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={7}>
            <AppTasks
              title="Próximos lançamentos"
              list={[
                { id: '1', label: 'É assim que acaba' },
                { id: '2', label: 'O homem mais rico da Babilônia' },
                { id: '3', label: 'Todas as suas (im)perfeições' },
                { id: '4', label: 'Os sete maridos de Evelyn Hugo' },
                { id: '5', label: 'O diário perdido de Gravity falls' },
                { id: '6', label: 'Box - o Essencial Sherlock Holmes - 3 Volumes' },
                { id: '7', label: 'Box Sherlock Holmes - 4 Livros' },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
