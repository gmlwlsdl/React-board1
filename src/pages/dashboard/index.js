import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import { FaChevronDown } from 'react-icons/fa6';
import { FaRegCalendarAlt } from 'react-icons/fa';
import './index.css';

export const fetchCreatedAtArray = async () => {
  try {
    const response = await fetch('/.netlify/functions/dashPost');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching created_at array:', error);
    throw error;
  }
};

const D3 = () => {
  const [sessionName, setSessionName] = useState('');
  const [createdAtArray, setCreatedAtArray] = useState([]);

  useEffect(() => {
    const sessionName = window.sessionStorage.getItem('nickname');
    setSessionName(sessionName || null);

    // Fetch created_at data and create the graph
    const fetchData = async () => {
      try {
        const createdAtData = await fetchCreatedAtArray();
        setCreatedAtArray(createdAtData);
        console.log(createdAtArray);
        makeGraph(createdAtData);
      } catch (error) {
        console.error('Error fetching created_at data:', error);
      }
    };

    fetchData();

    return () => {
      d3.select('svg').remove();
    };
  }, []);

  const makeGraph = (data) => {
    if (!data.length) return;

    // 중복된 날짜를 제거하고 count를 계산합니다.
    const dateCounts = data.reduce((acc, date) => {
      const key = date.split('T')[0];
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    console.log(dateCounts);

    // Check and remove existing svg if any
    d3.select('svg').remove();

    // Setting canvas
    const width = 714;
    const height = 316;
    const margin = { top: 40, left: 40, bottom: 40, right: 40 };

    const svg = d3
      .select('.G1000003513_dash')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    // Transform the data into a suitable format for the graph
    const transformedData = Object.keys(dateCounts).map((date) => ({
      date: new Date(date),
      count: dateCounts[date],
    }));

    console.log(transformedData);

    // Setting axis
    const x = d3
      .scaleTime()
      .domain(d3.extent(transformedData, (d) => d.date))
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(transformedData, (d) => d.count)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const xAxis = (g) =>
      g
        .attr('transform', `translate(0, ${height - margin.bottom})`)
        .call(
          d3
            .axisBottom(x)
            .tickSizeOuter(0)
            .tickFormat((d) => {
              const formatDate = d3.timeFormat('%Y-%m-%d')(d);
              return dateCounts[formatDate] ? formatDate : ''; // count가 있는 날짜만 표시
            })
            .tickPadding(10), // 눈금과 텍스트 사이의 간격 설정
        )
        .call((g) => g.selectAll('.tick text').attr('class', 'day1_dash')) // x 축 텍스트에 클래스 추가
        .attr('class', 'x-axis');

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
        .call((g) =>
          g
            .selectAll('.tick line')
            .style('stroke', '#e1e1e1')
            .style('stroke-dasharray', '1px 2px'),
        ) // Apply y-axis line style
        .attr('class', 'grid');

    // Apply axis to canvas
    svg.append('g').call(xAxis);
    svg.append('g').call(yAxis);

    // Line chart
    const line = d3
      .line()
      .x((d) => x(d.date))
      .y((d) => y(d.count));

    svg
      .append('path')
      .datum(transformedData)
      .attr('fill', 'none')
      .attr('stroke', '#f58a91')
      .attr('stroke-width', 1.5)
      .attr('d', line);

    // Add circles at data points
    svg
      .append('g')
      .selectAll('circle')
      .data(transformedData)
      .enter()
      .append('circle')
      .attr('cx', (d) => x(d.date))
      .attr('cy', (d) => y(d.count))
      .attr('r', 3)
      .attr('fill', '#f58a91');
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
            <div className="F1000004565_dash">
              <p className="day_dash">날짜별 게시글 등록 수</p>
              <div className="F1000004568_0_dash">
                <div className="Ellipse850_dash"></div>
                <p className="listNum_dash">게시글 등록 수</p>
              </div>
              <div className="G1000003513_dash"></div>
            </div>
            <div className="F1000004566_dash"></div>
          </div>
          <div className="F1000004568_?_dash"></div>
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
