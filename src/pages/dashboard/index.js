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

const fetchTagData = async () => {
  try {
    const response = await fetch('/.netlify/functions/dashTag');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching tag data:', error);
    throw error;
  }
};

export const fetchPostsData = async () => {
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

export const fetchQuestsData = async () => {
  try {
    const response = await fetch('/.netlify/functions/dashQuest');
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

    const fetchAndDrawGraphs = async () => {
      try {
        const createdAtData = await fetchCreatedAtArray();
        const tagData = await fetchTagData();
        makeGraph(createdAtData);
        makeBarGraph(tagData);
      } catch (error) {
        console.error('Error fetching data and drawing graphs:', error);
      }
    };

    const fetchSeparatedData = async () => {
      try {
        const postsData = await fetchPostsData();
        const questsData = await fetchQuestsData();

        makeSeparatedBarGraph(postsData, questsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    fetchAndDrawGraphs();
    fetchSeparatedData();

    return () => {
      // d3.select('svg').remove();
      // d3.selectAll('.tagGraph').remove();
      // d3.selectAll('.tapSeparatedGraph').remove();
    };
  }, []);

  const makeGraph = (data) => {
    if (!data.length) return;

    // 중복된 날짜를 제거하고 count를 계산
    const dateCounts = data.reduce((acc, date) => {
      const key = date.split('T')[0];
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    console.log(dateCounts);

    d3.select('svg').remove();

    const width = 714;
    const height = 316;
    const margin = { top: 40, left: 40, bottom: 40, right: 40 };

    const svg = d3
      .select('.G1000003513_dash')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const transformedData = Object.keys(dateCounts).map((date) => ({
      date: new Date(date),
      count: dateCounts[date],
    }));

    console.log(transformedData);

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
        )
        .attr('class', 'grid');

    svg.append('g').call(xAxis);
    svg.append('g').call(yAxis);

    // line grapgh
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

  const makeBarGraph = (tagData) => {
    if (!tagData.length) return;

    const transformedData = tagData.map((tag) => ({
      name: Object.keys(tag)[0], // 객체의 첫 번째 키를 name으로 설정
      count: Object.values(tag)[0], // 객체의 첫 번째 값(카운트)를 count로 설정
    }));

    console.log(transformedData);

    d3.select('.tagGraph').remove();

    const width = 714;
    const height = 316;
    const margin = { top: 40, left: 40, bottom: 40, right: 40 };

    const svg = d3
      .select('.G1000003511_dash')
      .append('svg')
      .attr('class', 'tagGraph')
      .attr('width', width)
      .attr('height', height);

    const x = d3
      .scaleBand()
      .domain(transformedData.map((d) => d.name))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(transformedData, (d) => d.count)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const xAxis = (g) =>
      g
        .attr('transform', `translate(0, ${height - margin.bottom})`)
        .call(d3.axisBottom(x))
        .selectAll('text')
        .attr('class', 'tagName1_dash');

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
        );

    svg.append('g').call(xAxis);
    svg.append('g').call(yAxis);

    svg
      .selectAll('.bar')
      .data(transformedData)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => x(d.name))
      .attr('y', (d) => y(d.count))
      .attr('width', x.bandwidth())
      .attr('height', (d) => height - margin.bottom - y(d.count))
      .attr('fill', '#f58a91');
  };

  const makeSeparatedBarGraph = (postsData, questsData) => {
    if (!postsData.length && !questsData.length) return;

    // 중복된 날짜를 제거하고 count를 계산
    const postsDateCounts = postsData.reduce((acc, date) => {
      const key = date.split('T')[0];
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    const questsDateCounts = questsData.reduce((acc, date) => {
      const key = date.split('T')[0];
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    console.log(postsDateCounts);
    console.log(questsDateCounts);

    d3.select('.tapSeparatedGraph').remove();

    const width = 714;
    const height = 316;
    const margin = { top: 40, left: 40, bottom: 40, right: 40 };

    const svg = d3
      .select('.G1000003511_2_dash')
      .append('svg')
      .attr('class', 'tapSeparatedGraph')
      .attr('width', width)
      .attr('height', height);

    // 날짜별로 데이터를 병합
    const mergedData = {};
    Object.keys(postsDateCounts).forEach((date) => {
      if (!mergedData[date]) {
        mergedData[date] = {
          date: new Date(date),
          postsCount: 0,
          questsCount: 0,
        };
      }
      mergedData[date].postsCount = postsDateCounts[date];
    });

    Object.keys(questsDateCounts).forEach((date) => {
      if (!mergedData[date]) {
        mergedData[date] = {
          date: new Date(date),
          postsCount: 0,
          questsCount: 0,
        };
      }
      mergedData[date].questsCount = questsDateCounts[date];
    });

    const allData = Object.values(mergedData);

    // 날짜 순서대로 정렬
    allData.sort((a, b) => a.date - b.date);

    const x = d3
      .scaleBand()
      .domain(allData.map((d) => d.date))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(allData, (d) => d.postsCount + d.questsCount)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const xAxis = (g) =>
      g
        .attr('transform', `translate(0, ${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickFormat(d3.timeFormat('%Y-%m-%d')))
        .selectAll('text')
        .attr('class', 'tagName1_dash');

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
        );

    svg.append('g').call(xAxis);
    svg.append('g').call(yAxis);

    // 누적 막대 그래프 그리기
    svg
      .selectAll('.post-bar')
      .data(allData)
      .enter()
      .append('rect')
      .attr('class', 'post-bar')
      .attr('x', (d) => x(d.date))
      .attr('y', (d) => y(d.postsCount + d.questsCount))
      .attr('width', x.bandwidth())
      .attr('height', (d) => height - margin.bottom - y(d.postsCount))
      .attr('fill', '#f58a91');

    svg
      .selectAll('.quest-bar')
      .data(allData)
      .enter()
      .append('rect')
      .attr('class', 'quest-bar')
      .attr('x', (d) => x(d.date))
      .attr('y', (d) => y(d.questsCount))
      .attr('width', x.bandwidth())
      .attr('height', (d) => height - margin.bottom - y(d.questsCount))
      .attr('fill', '#8ab2ff');
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
            <div className="F1000004566_dash">
              <p className="hashDash_dash">해시태그별 게시글 등록 수</p>
              <div className="F1000004568_2_dash">
                <div className="Ellipse850_dash"></div>
                <p className="postText_dash">게시글 등록 수</p>
              </div>
              <div className="G1000003511_dash"></div>
            </div>
          </div>
          <div className="F1000004568_3_dash">
            <p className="eachtagTitle_dash">게시판별 게시글 등록 수</p>
            <div className="F1000004574_dash">
              <div className="F1000004568_4_dash">
                <div className="Ellipse850_2_dash"></div>
                <p className="boardName1_dash">자유게시판</p>
              </div>
              <div className="F1000004569_dash">
                <div className="Ellipse850_3_dash"></div>
                <p className="boardName2_dash">질문게시판</p>
              </div>
            </div>
            <div className="G1000003511_2_dash"></div>
          </div>
        </div>
        <div className="Calendar_dash">
          <div className="Dropdown_dash">
            <div className="F1000004173_dash">
              <div className="F1000004172_dash">
                <FaRegCalendarAlt className="CourseHistoryIcon_dash" />
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
