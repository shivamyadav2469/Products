import React from 'react';
import AddProductButton from './components/Main';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="p-4 flex-grow">
        <AddProductButton />
      </div>
      <Footer />
    </div>
  );
};

export default App;
