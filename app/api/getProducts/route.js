import axios from "axios";

const getAllProducts = (search) => {
  return axios.get(
    `${process.env.NEXT_PUBLIC_APP_API_ENDPOINT}/products/search?q=${search}`
  );
};

export { getAllProducts };
