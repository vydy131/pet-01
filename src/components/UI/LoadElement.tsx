const LoadElement = ({ children, isLoading, ...props }: any) => {
  if (isLoading) {
    return <div {...props}>LOADER ACTIVE</div>;
  }
  return <div>{children}</div>;
};

export default LoadElement;
