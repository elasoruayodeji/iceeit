import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <h1>Our Story</h1>
        <p className="about-lede">
          ICEEIT was built on one idea: the cold doesn't stop the city, so your
          wardrobe shouldn't either.
        </p>
      </section>

      <section className="about-body">
        <p>
          We started ICEEIT because streetwear kept treating cold-weather
          pieces as an afterthought — bulky, plain, built for warmth alone.
          We wanted something sharper: silhouettes with real edge, fabrics
          that hold their shape, and details worth a second look, whether
          you're layering up for a shoot or just moving through your day.
        </p>
        <p>
          Every ICEEIT drop starts with the same question: does this piece
          earn its place in someone's rotation? If it doesn't move well,
          layer well, and last, it doesn't ship.
        </p>
      </section>

      <section className="about-pillars">
        <div className="pillar">
          <h3>Cut with intent</h3>
          <p>Clean lines, considered proportions — nothing on a piece that isn't there on purpose.</p>
        </div>
        <div className="pillar">
          <h3>Built for movement</h3>
          <p>Cold-weather essentials shouldn't slow you down. Everything is designed to layer and move with you.</p>
        </div>
        <div className="pillar">
          <h3>Made to last</h3>
          <p>We'd rather sell one piece you keep for years than five you replace by spring.</p>
        </div>
      </section>

      <section className="about-cta">
        <h2>Cut from ice. Built for the street.</h2>
        <Link to="/shop" className="btn btn-primary">Shop the collection</Link>
      </section>
    </div>
  );
}
