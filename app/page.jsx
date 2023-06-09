import ProductListing from "@components/ProductListing";

const Home = () => (
  <section className="w-full flex-center flex-col">
    <h1 className="head_text text-center">
      Product Listing
      <br className="max-md:hidden" />
      <span className="orange_gradient text-center">of Electronic items</span>
    </h1>
    <p className="desc text-center"></p>

    <ProductListing />
  </section>
);

export default Home;
