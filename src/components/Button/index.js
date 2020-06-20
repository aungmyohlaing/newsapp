import React from 'react'
import { Button } from 'react-bootstrap';
import { PropTypes } from 'prop-types';



export const CustomButton = ({ onClick, children, variant, size, className }) => (
    <Button className={className} variant={variant} size={size} onClick={onClick}>
      {children}
    </Button>
  );
  
  CustomButton.propTypes = {
    className: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    children: PropTypes.node,
    variant: PropTypes.string,
    size: PropTypes.string,
  };
  
  CustomButton.defaultProps = {
    className: "",
  };
  
 export const Loading = () => {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  };
 
  
  export const Sort = ({
    sortKey,
    onSort,
    children,
    activeSoftKey,
    className,
    variant,
  }) => {
    if (sortKey === activeSoftKey) {
      variant = "primary";
    } else variant = "default";
  
    return (
      <CustomButton
        className={className}
        variant={variant}
        size="sm"
        onClick={() => onSort(sortKey)}
      >
        {children}
      </CustomButton>
    );
  };
