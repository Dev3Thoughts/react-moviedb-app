import React from "react";
import { useHistory } from "react-router-dom";
import {
  BASE_LANGUAGE_URL_PATH,
  baseURL,
  BASE_POSTER_PATH,
} from "../services/util/utility";
import useFetchAll from "../services/useFetchAll";
import Loader from "../components/Error/Loader";
import Error from "../components/Error/Error";

const Cart = ({ cart, dispatch }) => {
  const history = useHistory();
  const urls = cart.map(
    (i) => `${i.id}?api_key=${baseURL}${BASE_LANGUAGE_URL_PATH}`
  );
  const { data: movies, setData, loading, error } = useFetchAll(urls);

  const filteredProducts = (id) => {
    const removeItem = movies.filter((i) => i.id !== id);
    return setData(removeItem);
  };

  function renderItem(cartItem) {
    const { id } = cartItem;
    const { title, poster_path, release_date } = movies.find(
      (p) => p.id === parseInt(id)
    );
    return (
      <div key={cartItem.id} className="m-4">
        <img
          style={{ maxWidth: "160px" }}
          src={`${BASE_POSTER_PATH}/w500${poster_path}`}
          alt={poster_path}
        />
        <div className="d-inline">
          <h3 className="text-primary mt-2">{title}</h3>
          <strong className="lead">{release_date}</strong>
          <button
            type="button"
            className="ml-2 btn btn-outline-danger text-white"
            // onClick={() => dispatch({ type: "remove", id })}
            onClick={() => {
              filteredProducts(id, dispatch({ type: "remove", id }));
            }}
          >
            X
          </button>
        </div>
      </div>
    );
  }

  if (loading) return <Loader />;
  if (error) return <Error />;

  const numItems = cart.reduce(
    (prevValue, curValue) => prevValue + curValue.quantity,
    0
  );

  return (
    <div className="container mt-4">
      <h1 className="text-info">
        {numItems === 0
          ? "Your cart is empty"
          : `${numItems} Item${numItems > 1 ? "'s" : ""}`}
      </h1>
      <section className="row">{movies.map(renderItem)}</section>
      {cart.length > 0 && (
        <button
          className="btn btn-primary"
          onClick={() => history.push("/checkout")}
        >
          Check out
        </button>
      )}
    </div>
  );
};

export default Cart;
