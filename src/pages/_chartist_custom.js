function getChartCoord(data, value) {
  const xMin = data.chartRect.x1,
    xLength = data.axisX.axisLength;

  const valueMin = data.axisX.bounds.low,
    valueMax = data.axisX.bounds.high,
    valueRange = data.axisX.bounds.valueRange;

  // If the value is within the view of the chart
  if (value > valueMin && value < valueMax) {
    const relativePercent = (value - valueMin) / valueRange,
      relativePosition = xLength * relativePercent + xMin;

    return relativePosition;
  }
}

class CustomSvg {
  constructor(chart) {
    this._chart = chart;
  }

  show() {
    this._element.removeClass('ct-hidden');
  }

  hide() {
    this._element.addClass('ct-hidden');
  }
}

export class VerticalLine extends CustomSvg {
  constructor(chart, value) {
    super(chart)

    this._element = chart.svg.elem('line', {
      x1: 0,
      x2: 0,
      y1: chart.chartRect.y1,
      y2: chart.chartRect.y2
    });

    this._element.addClass('ct-vertical-line');

    this.position = value;
  }

  set position(value) {
    const newPosition = getChartCoord(this._chart, value);

    if (newPosition) {
      this.show();
      this._element.attr({x1: newPosition, x2: newPosition});
    } else {
      this.hide();
    }
  }
}

export class VerticalArea extends CustomSvg {
  constructor(chart, start, end) {
    super(chart)

    const chartHeight = this._chart.axisY.axisLength,
      chartMax = this._chart.axisY.chartRect.y2;

    this._element = chart.svg.elem('rect', {
      y: chartMax,
      height: chartHeight
    })

    this._element.addClass('ct-vertical-area');

    this.resize(start, end);
  }

  resize(start, end) {
    const valueMin = this._chart.axisX.bounds.low,
      valueMax = this._chart.axisX.bounds.high;

    const areaStartPosition = start < valueMin ? this._chart.chartRect.x1 : getChartCoord(this._chart, start),
      areaEndPosition = end > valueMax ? this._chart.chartRect.x2 : getChartCoord(this._chart, end),
      areaWidth = areaEndPosition - areaStartPosition;

    this._element.attr({
      x: areaStartPosition,
      width: areaWidth,
    });
  }
}
