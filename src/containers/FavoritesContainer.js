import React from 'react';
import { connect } from 'react-redux';
import { Movie } from './Movie';
import './favorites-container.css';
import PropTypes from 'prop-types';

export const FavoritesContainer = (props) => {

  const mappedFavorites = props.favorites.map((favorite, index) => (
    <Movie {...favorite} key={index} />
  ));

  return (
    <div className="favorites-container">
      {mappedFavorites}
    </div>
  );
};

FavoritesContainer.Proptypes = {
  favorites: PropTypes.array
};

export const mapStateToProps = (state) => ({
  favorites: state.favorites
});

export default connect(mapStateToProps)(FavoritesContainer);