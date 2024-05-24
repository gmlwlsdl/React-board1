import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import { FaChevronDown } from 'react-icons/fa6';
import { FaRegCalendarAlt } from 'react-icons/fa';
import './index.css';

const D3 = () => {
  const [sessionName, setSessionName] = useState('');

  useEffect(() => {
    const sessionName = window.sessionStorage.getItem('nickname');
    setSessionName(sessionName || null);

    // Call the function to create the graph
    makeGraph();

    // Cleanup function to remove the existing graph when component unmounts or before re-rendering
    return () => {
      d3.select('svg').remove();
    };
  }, []);

  const makeGraph = () => {
    // Check and remove existing svg if any
    d3.select('svg').remove();

    // Setting canvas
    const width = 400;
    const height = 400;
    const margin = { top: 40, left: 40, bottom: 40, right: 40 };

    const svg = d3
      .select('body')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    // Data
    const data = [
      { month: '1월', value: 40, color: 'red' },
      { month: '2월', value: 10, color: 'orange' },
      { month: '3월', value: 60, color: 'yellow' },
      { month: '4월', value: 95, color: 'green' },
      { month: '5월', value: 30, color: 'blue' },
      { month: '6월', value: 78, color: 'indigo' },
    ];

    // Setting axis
    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.month))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const xAxis = (g) =>
      g
        .attr('transform', `translate(0, ${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0));

    const yAxis = (g) =>
      g
        .attr('transform', `translate(${margin.left}, 0)`)
        .call(
          d3
            .axisLeft(y)
            .ticks(5)
            .tickSize(-width + margin.left + margin.right),
        )
        .call((g) => g.select('.domain').remove())
        .attr('class', 'grid');

    // Apply axis to canvas
    svg.append('g').call(xAxis);
    svg.append('g').call(yAxis);

    // Vertical bar chart
    svg
      .append('g')
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (data) => x(data.month))
      .attr('y', (data) => y(data.value))
      .attr('width', x.bandwidth())
      .attr('height', (data) => y(0) - y(data.value))
      .attr('class', 'bar-chart')
      .attr('fill', (data) => data.color);

    // Line chart
    const line = d3
      .line()
      .x((d) => x(d.month) + x.bandwidth() / 2)
      .y((d) => y(d.value));

    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'red')
      .attr('stroke-width', 1)
      .attr('d', line);

    // Add text
    svg
      .append('g')
      .selectAll('text')
      .data(data)
      .enter()
      .append('text')
      .text((d) => d.value)
      .attr('x', (data) => x(data.month) + x.bandwidth() / 2)
      .attr('y', (data) => y(data.value) - 5)
      .attr('fill', 'black')
      .attr('font-family', 'Tahoma')
      .attr('font-size', '12px')
      .attr('text-anchor', 'middle');
  };

  return (
    <div>
      <div className="parent_dash">
        <div className="TopBar_dash">
          <div className="F1000003729_dash">
            <div className="F1000004070_dash">
              <p className="primaryDash">기본 대시보드</p>
            </div>
            <p className="name_dash">{sessionName}님</p>
          </div>
        </div>
        <div className="F1000004560_dash">
          <div className="F1000004559_dash">
            <div className="F1000004557_dash">
              <p className="Testsite_dash">Testsite</p>
            </div>
            <div className="F1000004558_dash">
              <p className="testDash_dash">테스트 대시보드</p>
            </div>
            <div className="F1000004559_2_dash">
              <p className="originDash">기본 대시보드</p>
            </div>
          </div>
        </div>
        <div className="F1000004576_dash">
          <div className="F1000004575_dash">
            <div className="F1000004565_dash"></div>
            <div className="F1000004566_dash"></div>
          </div>
          <div className="F1000004568_dash"></div>
        </div>
        <div className="Calendar_dash">
          <div className="Dropdown_dash">
            <div className="F1000004173_dash">
              <div className="F1000004172_dash">
                <FaRegCalendarAlt className="CourseHistoryIcon" />
                <div className="period_dash">2023/10/11-2023/10/26</div>
              </div>
              <div className="ChevronDownIcon">
                <FaChevronDown className="IconShape2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default D3;
