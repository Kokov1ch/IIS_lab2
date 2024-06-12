import React from 'react';

const TableRow = ({ row }) => (
    <tr>
        {Object.values(row).map((val, i) => (
            <td key={i}>{val}</td>
        ))}
    </tr>
);

export default TableRow;
