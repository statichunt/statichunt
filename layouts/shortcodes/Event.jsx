const Event = ({ date, title, children }) => {
  return (
    <li className="mb-12 ml-4">
      <div className="absolute -left-1.5 mt-2 h-3 w-3 rounded-full border border-white bg-gradient-to-r from-primary to-secondary dark:border-gray-900 dark:bg-darkmode-border"></div>
      <h3 className="mt-0 mb-1 text-lg font-semibold text-dark dark:text-darkmode-dark">
        {title}
      </h3>
      <time className="mb-1 text-sm font-normal leading-none text-text dark:text-darkmode-text">
        {date}
      </time>
      <p className="mb-4 mt-2 text-base font-normal text-text dark:text-darkmode-text">
        {children}
      </p>
    </li>
  );
};

export default Event;
