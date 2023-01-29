const Timeline = ({ children }) => {
  return (
    <ol className="relative border-l border-border pl-3 dark:border-darkmode-border">
      {children}
    </ol>
  );
};

export default Timeline;
