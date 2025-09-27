import React, { useEffect, useRef } from 'react';
import { createChart, ColorType } from 'lightweight-charts';

const StockChart = ({ data, currentPrice, stock, timeRange, graphType }) => {
  const chartContainerRef = useRef();
  const chartRef = useRef();
  const seriesRef = useRef();

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const isNightMode = document.body.classList.contains('night-mode');
    
    chartRef.current = createChart(chartContainerRef.current, {
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
      width: chartContainerRef.current.clientWidth,
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
        mode: 1, // Normal mode
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

    // Create series based on graph type
    if (graphType === 'candles') {
      seriesRef.current = chartRef.current.addCandlestickSeries({
        upColor: isNightMode ? '#3fb950' : '#00b09b',
        downColor: isNightMode ? '#f85149' : '#ff416c',
        borderVisible: false,
        wickUpColor: isNightMode ? '#3fb950' : '#00b09b',
        wickDownColor: isNightMode ? '#f85149' : '#ff416c',
        priceScaleId: 'right',
      });
    } else {
      seriesRef.current = chartRef.current.addLineSeries({
        color: isNightMode ? '#58a6ff' : '#007bff',
        lineWidth: 2,
        priceScaleId: 'right',
      });
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.remove();
      }
    };
  }, [graphType]);

  useEffect(() => {
    if (seriesRef.current && data && data.length > 0) {
      // Transform data for line series if needed
      const chartData = graphType === 'line' 
        ? data.map(candle => ({
            time: candle.time,
            value: candle.close
          }))
        : data;
      
      seriesRef.current.setData(chartData);
      
      // Auto-fit the time scale to view all data
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

  // Update chart theme when night mode changes
  useEffect(() => {
    if (!chartRef.current) return;

    const isNightMode = document.body.classList.contains('night-mode');
    
    chartRef.current.applyOptions({
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
      timeScale: {
        borderColor: isNightMode ? '#30363d' : '#d1d5db',
      },
      rightPriceScale: {
        borderColor: isNightMode ? '#30363d' : '#d1d5db',
      },
    });

    // Update series colors based on theme
    if (seriesRef.current) {
      if (graphType === 'candles') {
        seriesRef.current.applyOptions({
          upColor: isNightMode ? '#3fb950' : '#00b09b',
          downColor: isNightMode ? '#f85149' : '#ff416c',
          wickUpColor: isNightMode ? '#3fb950' : '#00b09b',
          wickDownColor: isNightMode ? '#f85149' : '#ff416c',
        });
      } else {
        seriesRef.current.applyOptions({
          color: isNightMode ? '#58a6ff' : '#007bff',
        });
      }
    }
  }, [graphType]);

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