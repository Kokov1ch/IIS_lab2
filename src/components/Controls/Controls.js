import React from 'react';

const Controls = ({
                      selectedCountry,
                      setSelectedCountry,
                      sizeOrder,
                      setSizeOrder,
                      weightOrder,
                      setWeightOrder,
                      toggleTable,
                      showTable,
                      countries,
                      setPaginationEnabled,
                      paginationEnabled
                  }) => {
    const handleCheckboxChange = () => {
        setPaginationEnabled(!paginationEnabled);
    };

    return (
        <div className="controls">
            <label>
                Выбор страны
                <select value={selectedCountry} onChange={e => setSelectedCountry(e.target.value)}>
                    <option value="Все страны">Все страны</option>
                    {countries.map(country => (
                        <option key={country} value={country}>{country}</option>
                    ))}
                </select>
            </label>
            <br /><br />
            <label>
                Сортировка по размеру
                <select value={sizeOrder} onChange={e => setSizeOrder(e.target.value)}>
                    <option value="none">Без сортировки</option>
                    <option value="ascending">По возрастанию</option>
                    <option value="descending">По убыванию</option>
                </select>
            </label>
            <br /><br />
            <label>
                Сортировка по весу
                <select value={weightOrder} onChange={e => setWeightOrder(e.target.value)}>
                    <option value="none">Без сортировки</option>
                    <option value="ascending">По возрастанию</option>
                    <option value="descending">По убыванию</option>
                </select>
            </label>
            <br /><br />
            <label>
                Пагинация
                <input
                    type="checkbox"
                    checked={paginationEnabled}
                    onChange={handleCheckboxChange}
                />
            </label>
            <br /><br />
            <input type="button" value={showTable ? "Скрыть таблицу" : "Показать таблицу"} onClick={toggleTable} />
        </div>
    );
};

export default Controls;
