import React from "react";
import { useQuery, gql } from "@apollo/client";
// import { useParams } from "react-router-dom";
import styled from "styled-components";
import Movie from "../components/Movie";

// when uses variable write query, this is for apollo
const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      title
      rating
      description_intro
      summary
      language
      medium_cover_image
      genres
    }
    suggestions(id: $id) {
id
      medium_cover_image
      rating
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

const Poster = styled.div`
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
  padding: 18px;
`;

const Description = styled.div`
text-align: center;
  width: 35%;
  font-size: 25px;
`;

// const Column = styled.div`
// display: flex;
// flex-wrap: wrap;
// justify-content: center;
//   margin-left: 10px;
//   width: 60%;
// `;

const Movies = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Suggestions = (props) => {
  let { id } = props.match.params;
    console.log(id);

  const { loading, error, data } = useQuery(GET_MOVIE, {
    variables: { id: parseInt(id) },
  });
  console.log(loading, error, data);

  return (
    <Container>
      <Header>
        <Title>Movie App</Title>
        <Subtitle>Latest Movies</Subtitle>
      </Header>
      {loading && <Loader />}
      {error && <Message>error</Message>}
      {!loading && data.suggestions && (
        <>
          <h2>Rating: {data.suggestions.rating}</h2>
          <img src={data.suggestions.medium_cover_image} alt="" />
          <Description>
            <p>{data.suggestions.description_intro}</p>
          </Description>
          <h1>Recommended</h1>
          <Movies>
            {data.suggestions.map((s, i) => (
              <div key={i}>
                <Poster>
                  <img src={s.medium_cover_image} />
                </Poster>
              </div>
            ))}
          </Movies>
        </>
      )}
    </Container>
  );
};

export default Suggestions;
