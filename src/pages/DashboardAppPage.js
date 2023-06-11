import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';

// sections
import { AppTasks, AppCurrentVisits, AppWidgetSummary } from '../sections/@dashboard/app';
import { useEffect, useState } from 'react';
import { find } from '../service/connectionAPI';
import { firebase } from '../service/connectionFirebase';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();

  const [books, setBooks] = useState([]);
  const [publishers, setPublishers] = useState([]);

  // Utilizar o firebase
  useEffect(() => {
    const search = async () => {
      const snapshot = await firebase.firestore().collection('book').get();
      const data = [];
      snapshot.forEach((doc) => {
        const { edition, imageURL, price, publicationYear, publishing, title } = doc.data();
        data.push({
          key: doc.id,
          doc,
          edition,
          imageURL,
          price,
          publicationYear,
          publishing,
          title,
        });
      });
      console.log(data);
      setBooks(data.reverse());
    };
    search();
  }, []);

  useEffect(() => {
    const search = async () => {
      const snapshot = await firebase.firestore().collection('publishing').get();
      const data = [];
      snapshot.forEach((doc) => {
        const { acronym, name } = doc.data();
        data.push({
          key: doc.id,
          doc,
          acronym,
          name,
        });
      });
      console.log(data);
      setBooks(data.reverse());
    };
    search();
  }, []);

  // Utilizar a API
  // async function findAll() {
  //   await find('Book', setBooks);
  // }

  // useEffect(() => {
  //   findAll()
  // }, [books.length])

  return (
    <>
      <Helmet>
        <title> Livraria - FatecLibrary </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 2 }}>
          Bem-vindo, aqui estão os dados sobre os livros cadastrados:
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Livros cadastrados"
              total={books.length}
              color="info"
              icon={'ant-design:book-outlined'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Novos cadastros" total={100} color="info" icon={'ant-design:apple-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Item Orders" total={1723315} color="warning" icon={'ant-design:windows-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Bug Reports" total={234} color="error" icon={'ant-design:bug-filled'} />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Editoras"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Próximos lançamentos"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
                { id: '6', label: 'Sprint Showcase' },
                { id: '7', label: 'Sprint Showcase' },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
