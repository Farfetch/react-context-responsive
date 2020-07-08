import PropTypes from 'prop-types';
import useResponsive from './useResponsive';

const Responsive = ({ children }) => {
    const responsive = useResponsive();

    return children(responsive);
};

Responsive.propTypes = {
    children: PropTypes.func.isRequired,
};

export default Responsive;
