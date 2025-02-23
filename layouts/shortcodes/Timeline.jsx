const Timeline = ({ children }) => {
  return (
    <ul className="relative list-none border-l border-border pl-0 dark:border-darkmode-border">
      {children}
    </ul>
  );
};

export default Timeline;
