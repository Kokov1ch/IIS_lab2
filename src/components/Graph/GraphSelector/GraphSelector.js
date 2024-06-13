import React from 'react';

const GraphSelector = ({ graphs, handleGraphToggle }) => {

    const graphColors = {
        min: 'green',
        avg: 'blue',
        max: 'red'
    };

    const graphLabels = {
        min: 'Min',
        avg: 'Avg',
        max: 'Max'
    };

    return (
        <div className="graph-selector-container">
            <label className="graph-checkbox">
                <input
                    type="checkbox"
                    checked={graphs.includes('min')}
                    onChange={() => handleGraphToggle('min')}
                />
                <span style={{ color: graphColors.min }}>{graphLabels.min}</span>
            </label>

            <label className="graph-checkbox">
                <input
                    type="checkbox"
                    checked={graphs.includes('avg')}
                    onChange={() => handleGraphToggle('avg')}
                />
                <span style={{ color: graphColors.avg }}>{graphLabels.avg}</span>
            </label>

            <label className="graph-checkbox">
                <input
                    type="checkbox"
                    checked={graphs.includes('max')}
                    onChange={() => handleGraphToggle('max')}
                />
                <span style={{ color: graphColors.max }}>{graphLabels.max}</span>
            </label>
        </div>
    );
};

export default GraphSelector;

