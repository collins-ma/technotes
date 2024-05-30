import React from 'react';
import { Link } from 'react-router-dom';

function WelcomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-cyan-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex-grow"></div>
      <div className="w-full text-center text-white mb-12">
        <h1 className="text-4xl font-extrabold">
          Welcome to <span className="nowrap">Collins Kemboi. Repairs!</span>
        </h1>
        <p className="mt-2 text-lg">
          Located in Beautiful Ruiru Town near Zetech University, Collins Kemboi. Repairs provides a trained staff ready to meet your tech repair needs.
        </p>
        <address className="not-italic mt-4">
          Collins Kemboi. Repairs<br />
          555 Ruiru Drive<br />
          Nairobi City,12345<br />
          <a href="tel:+0743951762" className="underline">(555) 555-5555</a>
        </address>
        <p className="mt-2">Owner: Collins Kemboi</p>
      </div>
      <div className="w-full">
        <hr className="border-t border-white" />
        <div className="text-center mt-4 mb-12">
          <Link to="/login" className="font-medium text-white hover:underline">
            Employee Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
