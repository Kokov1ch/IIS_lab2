import React, { useState, useEffect } from 'react';
import Table from '../Table/Table';
import Controls from '../Controls/Controls';
import Graph from '../Graph/Graph';
import './App.css';
import bananasData from '../../data/bananas';
import { getSortFunction } from '../../utils/GetSortFunction';

const App = () => {
  const [showTable, setShowTable] = useState(false);
  const [filteredData, setFilteredData] = useState(bananasData);
  const [selectedCountry, setSelectedCountry] = useState("Все страны");
  const [sizeOrder, setSizeOrder] = useState("none");
  const [weightOrder, setWeightOrder] = useState("none");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [paginationEnabled, setPaginationEnabled] = useState(true);

  useEffect(() => {
    applyFilter();
    setCurrentPage(1);
  }, [selectedCountry, sizeOrder, weightOrder, paginationEnabled]);

  const toggleTable = () => {
    setShowTable(!showTable);
  };

  const applyFilter = () => {
    let data = [...bananasData];

    if (selectedCountry !== "Все страны") {
      data = data.filter(d => d.Country === selectedCountry);
    }

    let sizeSortFunction = getSortFunction("Size", sizeOrder, (a, b) => [a, b]);
    let weightSortFunction = getSortFunction("Weight", weightOrder, (a, b) => [a, b]);

    if (sizeOrder !== "none") {
      if (sizeSortFunction) {
        data.sort(sizeSortFunction);
      }
    }

    // Сортировка по весу
    if (weightOrder !== "none") {
      if (weightSortFunction) {
        data.sort(weightSortFunction);
      }
    }

    setFilteredData(data);
  };

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
      <div className="app">
        <h3>Список бананов</h3>
        <Controls
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            sizeOrder={sizeOrder}
            setSizeOrder={setSizeOrder}
            weightOrder={weightOrder}
            setWeightOrder={setWeightOrder}
            toggleTable={toggleTable}
            showTable={showTable}
            countries={[...new Set(bananasData.map(banana => banana.Country))]}
            setPaginationEnabled={setPaginationEnabled}
            paginationEnabled={paginationEnabled}
        />
        <Graph data={bananasData} />
        {showTable && (paginationEnabled ? (
            <Table
                data={filteredData}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                paginate={paginate}
                paginationEnabled={paginationEnabled}
            />
        ) : (
            <Table
                data={filteredData}
                paginationEnabled={false}
            />
        ))}
      </div>
  );
};

export default App;
