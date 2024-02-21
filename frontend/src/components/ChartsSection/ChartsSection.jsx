import React from 'react';

const ChartsSection = ({ chartUrls }) => {
  return (
    <div className="text-center my-8">
      <h2 className="text-4xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-2 gap-4">
        {chartUrls.map((url, index) => (
          <div key={index} className="shadow-lg">
            <iframe
              src={url}
              title={`Mongo Chart ${index}`}
              width="100%"
              height="400"
              frameBorder="0"
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartsSection;
