'use client'
import { ImageList, ImageListItem, Pagination } from '@mui/material';
import getConfig from 'next/config';
import Movie from '@/components/Movie';
import MovieDetail from '@/components/MovieDetail';
import { useEffect, useState } from 'react';
import styles from './page.module.css';
import { Modal } from '@mui/material';

const itemsPerPage = 3;

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [serchResults, setSerchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const result = await getServerSlideProps();
      setSerchResults(result.props.trendingMovies.results);
    }

    fetchData();
  }, []);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleItems = serchResults.slice(startIndex, endIndex);


  return (
    <main className={styles.main}>

      <div>
        <h1>Pelis Encuesta</h1>
      </div>

      <div className={styles.center}>

        <ImageList sx={{ width: 1100, height: 500 }} cols={3} rowHeight={164}>
      
          {visibleItems.map((each) => (
            <ImageListItem key={each.id}>
              <div
                onClick={() => {
                  setSelectedMovie(each);
                  setIsModalOpen(true);
                }}
              >
                <Movie
                  index={each.id}
                  title={each.title}
                  poster_path={each.poster_path}
                />
              </div>
            </ImageListItem>
          ))}
        </ImageList>
      </div>



      <div className={styles.centerP}>
        <Pagination
          count={Math.ceil(serchResults.length / itemsPerPage)}
          color="primary"
          page={currentPage}
          onChange={handlePageChange}
        />

      </div>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className={styles.modal}>
          {selectedMovie && (
            <MovieDetail
              title={selectedMovie.title}
              poster_path={selectedMovie.poster_path}
              overview={selectedMovie.overview}
            />

          )}
        </div>
      </Modal>


    </main>
  );
}
export async function getServerSlideProps(context) {
  console.log("Fetching");
  // const { serverRuntimeConfig } = getConfig();

  const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
//en el token por buenas practicas debe utilizarse serverRuntimeConfig.apikey(lo ponemos directo pq es un ejercicio de prueba)
  const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOGM3ZjQxOTM5YmJiZTJmZGQwN2JiOWE5OTJiZDEyZiIsInN1YiI6IjY0ZTAwYjlmYjc3ZDRiMTE0MzQ4Y2UxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zoRxfcaW00b_yAnbW0vQ7Mm9ec-QnwYH58DG-KXzusA"; // Tu token aquí

  const headers = {
    'Authorization': `Bearer ${token}`,
    'accept': 'application/json'
  };

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: headers
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return {
      props: {
        trendingMovies: data
      }
    };
  } catch (error) {
    console.error('Error:', error);
    // Puedes manejar el error según tus necesidades aquí
    return {
      props: {
        trendingMovies: {
          results: [] // Retornar un arreglo vacío en caso de error
        }
      }
    };
  }
}





