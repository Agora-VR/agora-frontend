<svelte:head>
  <title>Agora | Session</title>
</svelte:head>

<script>
  import { onMount } from 'svelte';

  import * as d3 from 'd3';

  import { getData, getJson } from '../../../_api.js';
  import { user } from '../../../_store.js';

  import Card from '../../_components/Card.svelte';
  import HeartRateGraph from './_components/HeartRateGraph.svelte';

  export let sessionId;

  function zip(...rows) {
    return [...rows[0]].map((_,c) => rows.map(row => row[c]))
  }

  async function getSession() {
    return await getJson(`/session/${sessionId}`);
  }

  async function getResponses() {
    return await getJson(`/session/${sessionId}/responses`);
  }

  async function getFiles() {
    return await getJson(`/session/${sessionId}/files`);
  }

  async function getAudioDataUrl() {
    const response = await getData(`/session/${sessionId}/files/audio_session`);

    const audioBlob = await response.blob();

    return URL.createObjectURL(audioBlob);
  }

  async function getText() {
    const response = await getData(`/session/${sessionId}/files/text_script`);

    return await response.text();
  }

    async function getHeartRate() {
    const response = await getData(`/session/${sessionId}/files/heart_rate_session`);

    return await response.text();
  }

  async function getSessionVolume() {
    const response = await getData(`/session/${sessionId}/files/volume_session`);

    return await response.text();
  }

  async function getDistractionData() {
    const response = await getData(`/session/${sessionId}/files/distraction_timestamp`);

    return await response.text();
  }

  async function getChartValues() {
    return [await getHeartRate(), await getSessionVolume()];
  }

  onMount(async () => {
    const dataSets = [{
      ticker: 'Heart Rate',
      color: 'red',
      data: d3.csvParse(await getHeartRate(), d3.autoType)
    }];

    const volumeData = d3.csvParse(await getSessionVolume(), d3.autoType);

    const weatherSets = [{
      name: 'Microphone Volume',
      color: 'blue',
      data: volumeData.map((data) => ({
        Timestamp: data.Timestamp,
        Decibels: data.MicDecibels
      })),
    },
    {
      name: 'Scene Volume',
      color: 'lightblue',
      data: volumeData.map((data) => ({
        Timestamp: data.Timestamp,
        Decibels: data.ListenDecibels
      })),
    },
    ];

    const height = 300, width = 500,
      margin = {top: 20, right: 40, bottom: 30, left: 40};

    // Create functions for converting a data set to data
    const getX = (d) => d.Timestamp, getY = (d) => d.Heartrate,
      getWX = (d) => d.Timestamp, getWY = (d) => d.Decibels;

    const stockDateExtents = dataSets.map((set) => d3.extent(set.data, getX)).flat(),
      weatherDateExtents = weatherSets.map((set) => d3.extent(set.data, getWX)).flat(),
      combinedExtents = stockDateExtents.concat(weatherDateExtents),
      xMin = d3.min(combinedExtents), xMax = d3.max(combinedExtents);

    const yMax = Math.ceil(Math.max(
      ...dataSets.map((data) => d3.max(data.data, getY))));

    const x = d3.scaleUtc()
        .domain([xMin, xMax])
        .range([margin.left, width - margin.right]);

    const xAxis = (g, x, height) => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0).tickFormat(d3.timeFormat('%M:%S')));

    const y = d3.scaleLinear()
        .domain([0, yMax])
        .range([height - margin.bottom, margin.top]);

    const yAxis = (g, y, title) => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
        .call(g => g.selectAll(".title").data([title]).join("text")
        .attr("class", "title")
        .attr("x", -margin.left)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text(title));

    const wMax = Math.ceil(Math.max(
        ...weatherSets.map((set) => d3.max(set.data, getWY))));

    const w = d3.scaleLinear()
        .domain([0, wMax])
        .range([height - margin.bottom, margin.top]);

    const wAxis = (g, y, title) => g
        .attr("transform", `translate(${width - margin.right},0)`)
        .call(d3.axisRight(y))
        .call(g => g.selectAll(".title").data([title]).join("text")
        .attr("class", "title")
        .attr("x", -margin.right)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "center")
        .text(title));

    // Create a function for converting a data set to a line
    const line = (x, y) => d3.line()
        .defined(d => !isNaN(getY(d)))
        .x(d => x(getX(d)))
        .y(d => y(getY(d)));

    const line2 = (x, y) => d3.line()
        .defined(d => !isNaN(getWY(d)))
        .x(d => x(getWX(d)))
        .y(d => y(getWY(d)));

    // Create the graph part
    const graphSvg = d3.create("svg")
        .attr("viewBox", [0, 0, width, height])
        .style("display", "block");

    // Create a clip path to hide values off the graph
    graphSvg.append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("x", margin.left)
        .attr("y", 0)
        .attr("height", height)
        .attr("width", width - margin.left - margin.right);

    // Draw dotted grid lines
    y.ticks().slice(1).forEach((value) => {
        const height = y(value);

        graphSvg.append('line')
            .attr('x1', margin.left)
            .attr('y1', height)
            .attr('x2', width - margin.right)
            .attr('y2', height)
            .attr('stroke-dasharray', 1.5)
            .style("stroke-width", 1)
            .style("stroke", "lightgrey")
            .style("fill", "none");
    });

    // For each data set, create a path for the line
    const paths = dataSets.map((set) =>
        graphSvg.append("path")
            .datum(set.data)
            .attr("clip-path", "url(#clip)")
            .attr("fill", "none")
            .attr("stroke", set.color)
            .attr("stroke-width", 1.5)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
    );

    const weatherPaths = weatherSets.map((set) =>
        graphSvg.append("path")
            .datum(set.data)
            .attr("clip-path", "url(#clip)")
            .attr("fill", "none")
            .attr("stroke", set.color)
            .attr("stroke-width", 1.5)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
    );

    // Create elements for the left and bottom axises
    const gx = graphSvg.append("g"),
        gy = graphSvg.append("g"),
        gw = graphSvg.append('g');

    const chart = graphSvg.node();

    // The filter part
    const focusHeight = 100,
        focusMargin = {top: 20, right: 40, bottom: 30, left: 40};

    const filterSvg = d3.create("svg")
        .attr("viewBox", [0, 0, width, focusHeight])
        .style("display", "block");

    // Add x-axis to the filter graph
    filterSvg.append("g").call(xAxis, x, focusHeight);

    dataSets.forEach((set) => {
        filterSvg.append("path")
            .datum(set.data)
            .attr("fill", "none")
            .attr("stroke", set.color)
            .attr("stroke-width", 1.5)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("d", line(x, y.copy().range([focusHeight - focusMargin.bottom, 4])));
    });

    weatherSets.forEach((set) => {
        filterSvg.append("path")
            .datum(set.data)
            .attr("fill", "none")
            .attr("stroke", set.color)
            .attr("stroke-width", 1.5)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("d", line2(x, w.copy().range([focusHeight - focusMargin.bottom, 4])));
    });

    const legendLeft = focusMargin.left + 4,
        legendTop = focusHeight - 2;

    const legendData = [
      {color: 'red', name: 'Heart Rate'},
      {color: 'blue', name: 'Microphone Volume'},
      {color: 'lightblue', name: 'Scene Volume'}
    ];

    legendData.forEach(({color, name}, index) => {
        filterSvg.append("circle")
            .attr("cx", legendLeft + 120 * index)
            .attr("cy", legendTop - 4)
            .attr("r", 4)
            .style("fill", color);
        filterSvg.append("text")
            .attr("x", legendLeft + 6 + 120 * index)
            .attr("y", legendTop)
            .text(name)
            .style("font-size", "10px")
            .attr("alignment-baseline", "middle");
    });

    const rectRanges = d3.csvParse(await getDistractionData(), d3.autoType);

    // Create rectangles for each range
    const graphRects = rectRanges.map(() =>
      graphSvg.append("rect")
        .attr("clip-path", "url(#clip)")
        .attr("y", margin.top)
        .attr("height", height - margin.bottom - margin.top)
        .style("stroke-width", 1)
        .style("stroke", "red")
        .style("fill", "rgba(200, 100, 100, 0.3)")
    );

    function updateRects(focusX, focusY) {
      zip(rectRanges, graphRects).forEach(([range, rect]) =>
        rect.attr("x", focusX(range.Start))
          .attr("width", focusX(range.End) - focusX(range.Start)));
    }

    rectRanges.forEach((range) =>
      filterSvg.append("rect")
        .attr("x", x(range.Start))
        .attr("y", 0)
        .attr("height", focusHeight - margin.bottom)
        .attr("width", x(range.End) - x(range.Start))
        .style("stroke-width", 1)
        .style("stroke", "red")
        .style("fill", "rgba(200, 100, 100, 0.3)")
    );

    function updateGraph(focusX, focusY, focusW) {
        gx.call(xAxis, focusX, height);
        gy.call(yAxis, focusY, "Heart Rate (BPM)");
        gw.call(wAxis, focusW, "Volume (dB)");

        updateRects(focusX, focusY, focusW);

        paths.forEach((path) => path.attr("d", line(focusX, focusY)));
        weatherPaths.forEach((path) => path.attr('d', line2(focusX, focusW)));
    }

    function resetGraph() {
        updateGraph(x.copy(), y.copy(), w.copy());
    }

    const brush = d3.brushX()
        .extent([[focusMargin.left, 0.5], [width - focusMargin.right, focusHeight - focusMargin.bottom + 0.5]]);

    const brushElement = filterSvg.append("g")
        .call(brush)
        .on('contextmenu', () => d3.event.preventDefault());

    brushElement.select('.selection')
        .on('contextmenu', () => d3.event.preventDefault())
        .on('mousedown', () => {
            if (d3.event.buttons == 2) {
                brush.clear(brushElement);
                d3.event.preventDefault();
                resetGraph();
            }
        });

    brush.on("brush", () => {
        if (!d3.event.selection) return;

        updateGraph(
            x.copy().domain(d3.event.selection.map(x.invert, x).map(d3.utcSecond.round)),
            y.copy(), w.copy());
    })

    resetGraph();

    const chartRoot = document.getElementById('d3-chart');

    chartRoot.appendChild(chart);
    chartRoot.appendChild(filterSvg.node());
  });
</script>

<style>
  audio {
    width: 100%;
  }

  pre {
    max-height: 16em;

    overflow: auto;

    white-space: pre-wrap;
  }

  #text-container {
    display: flex;
  }

  #text-container > div {
    flex-basis: 0;
    flex-grow: 1;

    padding: 0 1em;
  }
</style>

<h1>Session</h1>

{#await getSession()}
  <div>Loading Information...</div>
{:then sessionInfo}
  <table>
    <tr>
      <th>Patient Name</th>
      <td>{sessionInfo['user_full_name']} ({sessionInfo['user_name']})</td>
    </tr>
    <tr>
      <th>Date/Time</th>
      <td>{sessionInfo['session_datetime']}</td>
    </tr>
  </table>
{/await}


<Card title="Audio Performance">
  {#await getAudioDataUrl()}
    <p>Loading audio...</p>
  {:then audioData}
    <audio controls src={audioData}>
      Your browser does not support the <code>audio</code> element.
    </audio>
  {/await}

  <div id="text-container">
    <div>
      <h3>Script</h3>

      {#await getText()}
        <p>Loading script...</p>
      {:then scriptText}
        <pre id="script-text">
          {scriptText}
        </pre>
      {/await}
    </div>

    <div>
      <h3>Recorded</h3>

      <pre>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, laborum hic quos similique itaque numquam exercitationem! Adipisci nemo cupiditate laudantium totam obcaecati vero ipsa, nobis quibusdam sapiente quisquam temporibus asperiores?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga nobis suscipit voluptate odit sequi repellendus debitis, numquam, labore cum dolorem officia, eos earum velit totam tempore aliquid sint explicabo in.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus perferendis suscipit placeat, impedit dicta nam vel reprehenderit nesciunt, est alias cum molestiae similique quo magni sunt libero nisi hic doloremque.
      </pre>
    </div>
  </div>
</Card>

<Card title="Heart-Rate Data">
  <div id="d3-chart"></div>
</Card>

<Card title="Files">
  {#await getFiles()}
    <!-- promise is pending -->
  {:then files}
    <!-- promise was fulfilled -->
    <table>
      <tr>
        <th>Type</th>
      </tr>
      {#each files as file}
        <tr>
          <td>{file.type}</td>
          <td><a href="/app/session/{sessionId}/{file.type}">View</a></td>
        </tr>
      {/each}
    </table>
  {/await}
</Card>

<Card title="Forms">
  <p>
    Respond to this session <a href="{sessionId}/response">here</a>.
  </p>

  <table>
  <tr>
    <th>Name</th>
    <th>Date/Time</th>
  </tr>
  {#await getResponses()}
    <!-- promise is pending -->
  {:then responses}
    {#each responses as response}
      <tr>
        <td>{response['user_full_name']} ({response['user_name']})</td>
        <td>{response['response_datetime']}</td>
        <td><a href="/app/form/{response['response_id']}">View</a></td>
      </tr>
    {/each}
  {/await}
  </table>
</Card>
