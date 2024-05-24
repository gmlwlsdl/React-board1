import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import { FaChevronDown } from 'react-icons/fa6';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { IoRemoveOutline } from 'react-icons/io5';
import './index.css';

const D3 = () => {
  const [sessionName, setSessionName] = useState('');

  useEffect(() => {
    const sessionName = window.sessionStorage.getItem('nickname');

    if (sessionName) {
      setSessionName(sessionName);
    } else {
      setSessionName(null);
    }
    makeGraph();
  }, []);

  const makeGraph = () => {
    // setting canvas
    const width = 400;
    const height = 400;
    const margin = { top: 40, left: 40, bottom: 40, right: 40 };

    const svg = d3
      .select('body')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    // data
    const data = [
      { month: '1월', value: 40, color: 'red' },
      { month: '2월', value: 10, color: 'orange' },
      { month: '3월', value: 60, color: 'yellow' },
      { month: '4월', value: 95, color: 'green' },
      { month: '5월', value: 30, color: 'blue' },
      { month: '6월', value: 78, color: 'indigo' },
    ];

    // setting axis
    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.month))
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const xAxis = (g) => {
      return g
        .attr('transform', `translate(0, ${height})`)
        .attr('transform', `translate(0, ${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0));
    };

    const yAxis = (g) =>
      g
        .attr('transform', `translate(${margin.left}, 0)`)
        .call(
          d3.axisLeft(y).tickValues([0, 20, 40, 60, 80, 100]).tickSize(-width),
        )
        .call((g) => g.select('.domain').remove())
        .attr('class', 'grid');

    // apply axis to canvas
    svg.append('g').call(xAxis);
    svg.append('g').call(yAxis);

    // 막대 차트
    svg
      .append('g')
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (data) => x(data.month) + x.bandwidth() / 2 - 10)
      .attr('y', (data) => y(data.value))
      .attr('width', 20)
      .attr('height', (data) => y(0) - y(data.value))
      .attr('class', 'bar-chart')
      .attr('fill', (data) => data.color);

    // 선 그래프
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

    // add text
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
                {/* <div className="IconShape">
                  <div className="Path1_dash"></div>
                  <div className="Path2_dash"></div>
                  <IoRemoveOutline className="Path3_dash" />
                  <IoRemoveOutline className="Path4_dash" />
                </div> */}
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
