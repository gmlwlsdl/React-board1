import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import { FaChevronDown } from 'react-icons/fa6';
import { FaRegCalendarAlt } from 'react-icons/fa';
import './index.css';
import './db';
// import { getTagsData } from './dashData';

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

  const makeGraph = async () => {
    // setting canvas
    const width = 800;
    const height = 400;
    const margin = { top: 40, left: 80, bottom: 40, right: 40 };

    const svg = d3
      .select('body')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    // Connect to MongoDB
    const database = await connectToDatabase();
    const tagsCollection = database.collection(process.env.TAGS_COLLECTION);

    // Fetch data from MongoDB
    const tagsData = await tagsCollection.find().toArray();

    // setting axis
    const x = d3
      .scaleBand()
      .domain(tagsData.map((d) => d.name)) // Use tag names for x-axis
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(tagsData, (d) => d.count)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const xAxis = (g) => {
      return g
        .attr('transform', `translate(0, ${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0));
    };

    const yAxis = (g) =>
      g
        .attr('transform', `translate(${margin.left}, 0)`)
        .call(
          d3
            .axisLeft(y)
            .ticks(5)
            .tickSizeInner(-width + margin.left + margin.right),
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
      .data(tagsData)
      .enter()
      .append('rect')
      .attr('x', (data) => x(data.name))
      .attr('y', (data) => y(data.count))
      .attr('width', x.bandwidth())
      .attr('height', (data) => y(0) - y(data.count))
      .attr('class', 'bar-chart')
      .attr('fill', 'steelblue');

    // add text
    svg
      .append('g')
      .selectAll('text')
      .data(tagsData)
      .enter()
      .append('text')
      .text((d) => d.count)
      .attr('x', (data) => x(data.name) + x.bandwidth() / 2)
      .attr('y', (data) => y(data.count) - 5)
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
