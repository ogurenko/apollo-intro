import React from "react";
import { useQuery, gql } from "@apollo/client";
import styled from "styled-components";
import Movie from "../components/Movie";

const GET_MOVIES = gql`
  {
    movies {
      id
      medium_cover_image
      isLiked @client
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Header = styled.header`
  background: #00b4db; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #0083b0,
    #00b4db
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #0083b0,
    #00b4db
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  height: 45vh;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 60px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const Subtitle = styled.h3`
  font-size: 35px;
`;

const Loader = styled.div`
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Message = styled.h2`
  font-size: 40px;
  color: rgb(100, 0, 0);
`;

const Movies = styled.div`
  /* display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 25px;
  width: 60px;
  position: relative;
  top: -50px; */
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Home = () => {
  const { loading, error,data } = useQuery(GET_MOVIES);
  console.log(loading, error, data);

  return (
    <Container>
      <Header>
        <Title>Movie App</Title>
        <Subtitle>Latest Movies</Subtitle>
      </Header>
      {loading && <Loader />}
      {error && <Message>error</Message>}
      <Movies>
        {data?.movies?.map((m) => (
          <Movie key={m.id} id={m.id} isLiked={m.isLiked} src={m.medium_cover_image} />
        ))}
      </Movies>
    </Container>
  );
};


    {/* // data.movies.map((m) => <img key={m.id} src={m.medium_cover_image} />)} */}


export default Home;
