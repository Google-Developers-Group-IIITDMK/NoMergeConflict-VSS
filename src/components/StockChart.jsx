import React, { useEffect, useRef } from 'react';
import { createChart, ColorType } from 'lightweight-charts';

const StockChart = ({ data, currentPrice, stock, timeRange, graphType, nightMode }) => {
  const chartContainerRef = useRef();
  const chartRef = useRef();
  const seriesRef = useRef();

  // Function to get chart options based on theme
  const getChartOptions = (isNightMode) => ({
    layout: {
      background: { 
        type: ColorType.Solid, 
        color: isNightMode ? '#0d1117' : 'white' 
      },
      textColor: isNightMode ? '#c9d1d9' : '#333',
    },
    grid: {
      vertLines: { color: isNightMode ? '#30363d' : '#f0f0f0' },
      horzLines: { color: isNightMode ? '#30363d' : '#f0f0f0' },
    },
    width: chartContainerRef.current?.clientWidth || 0,
    height: 400,
    timeScale: {
      timeVisible: true,
      secondsVisible: false,
      borderColor: isNightMode ? '#30363d' : '#d1d5db',
    },
    rightPriceScale: {
      borderColor: isNightMode ? '#30363d' : '#d1d5db',
    },
    crosshair: {
      mode: 1,
      vertLine: {
        color: isNightMode ? '#58a6ff' : '#007bff',
        labelBackgroundColor: isNightMode ? '#58a6ff' : '#007bff',
      },
      horzLine: {
        color: isNightMode ? '#58a6ff' : '#007bff',
        labelBackgroundColor: isNightMode ? '#58a6ff' : '#007bff',
      },
    },
  });

  // Function to get series options based on theme and graph type
  const getSeriesOptions = (isNightMode, type) => {
    if (type === 'candles') {
      return {
        upColor: isNightMode ? '#3fb950' : '#00b09b',
        downColor: isNightMode ? '#f85149' : '#ff416c',
        borderVisible: false,
        wickUpColor: isNightMode ? '#3fb950' : '#00b09b',
        wickDownColor: isNightMode ? '#f85149' : '#ff416c',
        priceScaleId: 'right',
      };
    }
    return {
      color: isNightMode ? '#58a6ff' : '#007bff',
      lineWidth: 2,
      priceScaleId: 'right',
    };
  };

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Initialize chart
    chartRef.current = createChart(chartContainerRef.current, getChartOptions(nightMode));

    // Create series
    if (graphType === 'candles') {
      seriesRef.current = chartRef.current.addCandlestickSeries(
        getSeriesOptions(nightMode, 'candles')
      );
    } else {
      seriesRef.current = chartRef.current.addLineSeries(
        getSeriesOptions(nightMode, 'line')
      );
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.remove();
      }
    };
  }, [graphType]);

  useEffect(() => {
    if (seriesRef.current && data && data.length > 0) {
      const chartData = graphType === 'line' 
        ? data.map(candle => ({ time: candle.time, value: candle.close }))
        : data;
      
      seriesRef.current.setData(chartData);
      chartRef.current.timeScale().fitContent();
    }
  }, [data, timeRange, graphType]);

  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current && chartContainerRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update theme when nightMode changes
  useEffect(() => {
    if (!chartRef.current || !seriesRef.current) return;

    chartRef.current.applyOptions(getChartOptions(nightMode));
    
    if (graphType === 'candles') {
      seriesRef.current.applyOptions(getSeriesOptions(nightMode, 'candles'));
    } else {
      seriesRef.current.applyOptions(getSeriesOptions(nightMode, 'line'));
    }
  }, [nightMode, graphType]);

  return (
    <div className="stock-chart">
      <div className="chart-info">
        <h3>{stock.toUpperCase()} - {graphType === 'candles' ? 'Candlestick Chart' : 'Line Chart'}</h3>
        <p>Time Range: {timeRange} • Current Price: ₹{currentPrice.toFixed(2)}</p>
      </div>
      <div className="chart-container" ref={chartContainerRef} />
    </div>
  );
};

export default StockChart;