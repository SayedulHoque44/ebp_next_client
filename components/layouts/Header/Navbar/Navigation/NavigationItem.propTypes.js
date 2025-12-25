import PropTypes from "prop-types";

export const NavigationItemPropTypes = {
  item: PropTypes.shape({
    link: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    description: PropTypes.string,
    requiresAuth: PropTypes.bool,
    isAction: PropTypes.bool,
  }).isRequired,
  variant: PropTypes.oneOf(["desktop", "mobile", "tablet"]),
  onClick: PropTypes.func,
  className: PropTypes.string,
  showIcon: PropTypes.bool,
  showDescription: PropTypes.bool,
};

export const MobileMenuTogglePropTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  className: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  variant: PropTypes.oneOf(["default", "primary", "dark"]),
};

export const ResponsiveNavigationPropTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      description: PropTypes.string,
      requiresAuth: PropTypes.bool,
      isAction: PropTypes.bool,
    })
  ).isRequired,
  onItemClick: PropTypes.func,
  className: PropTypes.string,
  variant: PropTypes.oneOf(["desktop", "mobile", "tablet"]),
};
