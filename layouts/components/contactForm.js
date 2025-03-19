import { useState } from "react";

export default function ContactForm() {
  const [value, setValue] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1 className="text-dark mb-2.5">Contact Information</h1>
      <p>
        Simply enter your email, and we’ll send the best templates tailored to
        your business directly to your inbox.
      </p>

      <div className="grid grid-cols-2 gap-x-4 gap-y-8 mt-8">
        <div className="relative sm:col-span-1 col-span-2">
          <input
            className={`form-input w-full ${value.first_name ? "has-value" : ""}`}
            type="text"
            id="name"
            name="first_name"
            value={value.first_name ?? ""}
            onChange={handleChange}
            required
          />
          <label
            className="form-label -left-0 dark:bg-darkmode-body"
            htmlFor="email"
          >
            First Name *
          </label>
        </div>
        <div className="relative sm:col-span-1 col-span-2">
          <input
            className={`form-input w-full ${value.last_name ? "has-value" : ""}`}
            type="text"
            id="name"
            name="last_name"
            onChange={handleChange}
            value={value.last_name ?? ""}
          />
          <label
            className="form-label -left-0 dark:bg-darkmode-body"
            htmlFor="email"
          >
            Last Name
          </label>
        </div>
        <div className="relative col-span-2">
          <input
            className={`form-input w-full ${value.email ? "has-value" : ""} `}
            type="email"
            id="email"
            name="email"
            value={value.email ?? ""}
            onChange={handleChange}
            required
          />
          <label
            className="form-label -left-0 dark:bg-darkmode-body"
            htmlFor="email"
          >
            Email address *
          </label>
        </div>
      </div>
    </div>
  );
}
