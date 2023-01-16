const Announcement = () => {
  return (
    <div
      className={`announcement sticky top-[104px] z-[10] -translate-y-10 -translate-x-0 bg-white p-2 dark:bg-darkmode-body lg:-translate-x-4`}
    >
      <div className="rounded-[0.25rem] bg-gradient-to-r from-primary to-secondary  text-white transition-opacity ease-in hover:opacity-90">
        <a
          href="https://cfe.dev/events/the-jam-2023/"
          target="_blank"
          rel="noreferrer"
          className="flex content-between items-center px-3 py-2 font-light"
        >
          <span className="mr-2 inline-block rounded-[0.25rem] bg-dark/30 px-2 py-2 leading-none">
            Jamstack Conference
          </span>
          <span className="mx-auto">
            Join 2-days virtual conference at TheJam.dev on — 25 Jan, 2023
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="ml-auto"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="#fff"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <circle cx="12" cy="12" r="9" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <polyline points="15 15 15 9 9 9" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default Announcement;
