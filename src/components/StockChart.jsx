import React, { useEffect, useRef } from 'react';
import { createChart, ColorType } from 'lightweight-charts';

const StockChart = ({ data, currentPrice, stock, timeRange }) => {
  const chartContainerRef = useRef();
  const chartRef = useRef();
  const seriesRef = useRef();

  useEffect(() => {
    if (!chartContainerRef.current) return;

    chartRef.current = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'white' },
        textColor: '#333',
      },
      grid: {
        vertLines: { color: '#f0f0f0' },
        horzLines: { color: '#f0f0f0' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        borderColor: '#d1d5db',
      },
      rightPriceScale: {
        borderColor: '#d1d5db',
      },
      crosshair: {
        mode: 1, // Normal mode
      },
    });

    seriesRef.current = chartRef.current.addCandlestickSeries({
      upColor: '#00b09b',
      downColor: '#ff416c',
      borderVisible: false,
      wickUpColor: '#00b09b',
      wickDownColor: '#ff416c',
      priceScaleId: 'right',
    });

    // Add volume series if needed
    const volumeSeries = chartRef.current.addHistogramSeries({
      color: '#26a69a',
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: '',
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (seriesRef.current && data && data.length > 0) {
      seriesRef.current.setData(data);
      
      // Auto-fit the time scale to view all data
      chartRef.current.timeScale().fitContent();
    }
  }, [data, timeRange]);

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

  return (
    <div className="chart-container" ref={chartContainerRef} />
  );
};

export default StockChart;