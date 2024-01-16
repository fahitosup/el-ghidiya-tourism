import icon from "../../assets/icons/logo.png";
import { Helmet } from "react-helmet";

const SEO = ({
  title,
  description = "Explore El Ghidiya – your guide to Islamic wisdom and a wholesome lifestyle. Discover resources, connect with a like-minded community, and embrace a fulfilling Islamic experience. Start your journey with us today.",
  name = "El Ghidiya",
  tags = [],
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <link rel="icon" href={icon} type="image/x-icon" />
      <meta name="title" content={description} />
      <meta name="description" content={description} />
      {/* End standard metadata tags */}
      {/* Facebook tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {/* End Facebook tags */}
      {/* Twitter tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {/* End Twitter tags */}
    </Helmet>
  );
};

export default SEO;
