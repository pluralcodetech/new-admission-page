import PropTypes from "prop-types" 

const Logo = ({src, alt, className, ...rest}) => {
  return (
    <img src={src} alt={alt} className={className} {...rest}/>
  )
}

Logo.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string
}
export default Logo
