import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import GraphSelector from './GraphSelector/GraphSelector';

const Graph = ({ data }) => {
    const svgRef = useRef();
    const [selectedGraphs, setSelectedGraphs] = useState(['min', 'avg', 'max']);

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const width = 960;
        const height = 500;
        const margin = { top: 20, right: 20, bottom: 50, left: 70 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const aggregateData = () => {
            const sizeGroups = d3.group(data, d => Math.round(parseFloat(d.Size))); // Group by Size
            const aggregatedData = Array.from(sizeGroups, ([size, values]) => {
                return {
                    Size: size,
                    min: d3.min(values, d => parseFloat(d.HarvestTime)) + 5,
                    max: d3.max(values, d => parseFloat(d.HarvestTime)) + 5,
                    avg: d3.mean(values, d => parseFloat(d.HarvestTime)) + 5
                };
            });
            return aggregatedData.sort((a, b) => a.Size - b.Size);
        };

        const aggregatedData = aggregateData();

        const x = d3.scaleLinear()
            .domain(d3.extent(aggregatedData, d => d.Size))
            .range([0, innerWidth]);

        const y = d3.scaleLinear()
            .domain([0, d3.max(aggregatedData, d => Math.max(Math.abs(d.min || 0), Math.abs(d.max || 0), Math.abs(d.avg || 0)))])
            .nice()
            .range([innerHeight, 0]);

        const chartGroup = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const lineGenerator = d3.line()
            .x(d => x(d.Size))
            .y(d => y(Math.abs(d)));

        if (selectedGraphs.includes('min')) {
            chartGroup.append("path")
                .datum(aggregatedData)
                .attr("class", "line-min")
                .attr("d", lineGenerator.y(d => y(Math.abs(d.min))))
                .attr("fill", "none")
                .attr("stroke-width", 2)
                .attr("stroke", "green");
        }

        if (selectedGraphs.includes('avg')) {
            chartGroup.append("path")
                .datum(aggregatedData)
                .attr("class", "line-avg")
                .attr("d", lineGenerator.y(d => y(Math.abs(d.avg))))
                .attr("fill", "none")
                .attr("stroke-width", 2)
                .attr("stroke", "blue");
        }

        if (selectedGraphs.includes('max')) {
            chartGroup.append("path")
                .datum(aggregatedData)
                .attr("class", "line-max")
                .attr("d", lineGenerator.y(d => y(Math.abs(d.max))))
                .attr("fill", "none")
                .attr("stroke-width", 2)
                .attr("stroke", "red");
        }

        chartGroup.append("g")
            .attr("class", "x axis")
            .attr("transform", `translate(0,${innerHeight})`)
            .call(d3.axisBottom(x));

        chartGroup.append("text")
            .attr("class", "axis-label")
            .attr("x", innerWidth / 2)
            .attr("y", margin.bottom + 420)  // Учитываем отступ margin.bottom
            .attr("text-anchor", "middle")
            .text("Размер");

        chartGroup.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(y));

        chartGroup.append("text")
            .attr("class", "axis-label")
            .attr("transform", "rotate(-90)")
            .attr("x", -innerHeight / 2)
            .attr("y", -margin.left + 20)
            .attr("text-anchor", "middle")
            .text("Время сбора");

    }, [data, selectedGraphs]);

    const handleGraphToggle = (graph) => {
        if (selectedGraphs.includes(graph)) {
            setSelectedGraphs(selectedGraphs.filter(g => g !== graph));
        } else {
            setSelectedGraphs([...selectedGraphs, graph]);
        }
    };

    return (
        <div>
            <svg ref={svgRef} width="960" height="500"></svg>
            <GraphSelector graphs={selectedGraphs} handleGraphToggle={handleGraphToggle} />
        </div>
    );
};

export default Graph;
