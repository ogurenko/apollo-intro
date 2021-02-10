import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {  useMutation, gql } from "@apollo/client";


const LIKE_MOVIE = gql`
  mutation toggleLikeMovie($id: Int!, $isLiked: Boolean!) {
    toggleLikeMovie(id: $id, isLiked: $isLiked) @client
  }
`;

const Container = styled.div`
  height: 400px;
  border-radius: 7px;
  /* width: 100%; */
  padding: 18px;
  border: solid 20px transparent;
  /* box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23); */
  filter: drop-shadow(20px 0 30px #333);
  background-color: transparent;
`;



const Movie = (props) => {
  const [toggleLikeMovie] = useMutation(LIKE_MOVIE, {
    variables: { id: parseInt(props.id),isLiked: props.isLiked }
  });

  return (
    <>
      <Container>
        <Link to={`/${props.id}`}>
          <img src={props.src} alt="" />
        </Link>
        <button onClick={toggleLikeMovie}>
          {props.isLiked ? "Unlike" : "Like"}
        </button>
      </Container>
    </>
  );
};

export default Movie;
