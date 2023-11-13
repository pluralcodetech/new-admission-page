import PropTypes from "prop-types" 

const Text = ({className, body, ...rest}) => {
  return (
    <p className={className} {...rest}>{body}</p>
  )
}
Text.propTypes = {
    body: PropTypes.string,
    className: PropTypes.string
}
export default Text
