import React, { useState } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';

const AddStatus = () => {
  const [status, setStatus] = useState("");

  // Handle input changes
  const handleInputChange = (e) => {
    setStatus(e.target.value); // Update the status state with the input value
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const statusData = { status };

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json", // Tells the server we're sending JSON
        },
        body: JSON.stringify(statusData), // Send the status data as JSON
      });

      // const result = await response.json(); // Parse the response from the server

      if (response.ok) {
        // Toast Emitter
        toast.success('Status added successfully', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        })

        // Reset form after successful submission
        setStatus("");
      } else {
        throw new Error('Failed to add status');
      }
    } catch (error) {
      toast.error("Error creating status!", { // ✅ Fixed Error Toast
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.error("Error sending data:", error);
    }
  };

  return (
    <div className="bg-white m-auto rounded-lg border border-gray-200 w-auto md:w-lg">
      <h2 className="text-xl mb-3 border-b border-gray-200 p-3 pl-5 poppins-medium text-slate-700">Create Status</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-5">
        {/* Status Name */}
        <div>
          <label
            htmlFor="status-name"
            className="relative block rounded-md border border-gray-200 shadow-xs focus-within:border-[#8b5cf6] focus-within:ring-2 focus-within:ring-[#f3eefe]"
          >
            <input
              type="text"
              id="status-name"
              name="statusName"
              className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden p-3"
              placeholder="Status Name"
              value={status}
              onChange={handleInputChange} // Corrected here
              required
            />

            <span
              className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
            >
              Status Name
            </span>
          </label>
        </div>
        {/* Submit button */}
        <button type="submit" className='group relative inline-flex items-center overflow-hidden rounded-sm bg-[#8b5cf6] px-8 py-3 text-white focus:ring-3 focus:outline-hidden w-fit'>
          <span className="absolute -end-full transition-all group-hover:end-4">
            <svg
              className="size-5 rtl:rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#ffffff"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>

          <span className="text-sm font-medium transition-all group-hover:me-4 text-white">
            Add Status
          </span>
        </button>
      </form>
      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
}

export default AddStatus;
