import React from 'react';

const TableHead = ({ data }) => (
    <thead>
    <tr>
        {data.length > 0 && Object.keys(data[0]).map((key) => (
            <th key={key}>{key}</th>
        ))}
    </tr>
    </thead>
);

export default TableHead;
