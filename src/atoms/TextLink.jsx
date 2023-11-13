import { Link } from "react-router-dom";
import PropTypes from "prop-types" 

const TextLink = ({className,body,to, ...rest}) => {
    
  return (
    <Link className={className} to={to} {...rest}>{body}</Link>
  )
}

TextLink.propTypes = {
    className:PropTypes.string,
    body:PropTypes.any.isRequired,
    to:PropTypes.string.isRequired
};
export default TextLink
