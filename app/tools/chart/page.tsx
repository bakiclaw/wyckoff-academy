'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { createChart, IChartApi, ISeriesApi, Time, MouseEventParams } from 'lightweight-charts'

// Wyckoff concepts for the schematic overlay
const wyckoffConcepts = {
  // Accumulation concepts
  SC: { label: 'SC', name: 'Selling Climax', description: 'Extreme low with high volume', color: '#10B981', type: 'accumulation' },
  AR: { label: 'AR', name: 'Automatic Rally', description: 'Recovery after SC', color: '#10B981', type: 'accumulation' },
  ST: { label: 'ST', name: 'Secondary Test', description: 'Test of SC low', color: '#10B981', type: 'accumulation' },
  Spring: { label: 'Spring', name: 'Spring', description: 'Test of support before breakout', color: '#22C55E', type: 'accumulation' },
  LPS: { label: 'LPS', name: 'Last Point of Support', description: 'Final buying opportunity before markup', color: '#22C55E', type: 'accumulation' },
  SOS: { label: 'SOS', name: 'Sign of Strength', description: 'Breakout with volume', color: '#22C55E', type: 'accumulation' },
  // Distribution concepts  
  BC: { label: 'BC', name: 'Buying Climax', description: 'Extreme high with high volume', color: '#EF4444', type: 'distribution' },
  UTAD: { label: 'UTAD', name: 'UTAD', description: 'Test of resistance before breakdown', color: '#F97316', type: 'distribution' },
  LPSY: { label: 'LPSY', name: 'Last Point of Supply', description: 'Final selling opportunity before markdown', color: '#F97316', type: 'distribution' },
  SOW: { label: 'SOW', name: 'Sign of Weakness', description: 'Breakdown with volume', color: '#F97316', type: 'distribution' },
}

interface WyckoffMarker {
  id: string
  concept: keyof typeof wyckoffConcepts
  time: number
  price: number
}

interface ChartData {
  time: Time
  open: number
  high: number
  low: number
  close: number
}

const SYMBOLS = [
  { symbol: 'BTCUSDT', name: 'Bitcoin', base: 'BTC' },
  { symbol: 'ETHUSDT', name: 'Ethereum', base: 'ETH' },
  { symbol: 'SOLUSDT', name: 'Solana', base: 'SOL' },
  { symbol: 'BNBUSDT', name: 'Binance Coin', base: 'BNB' },
  { symbol: 'XRPUSDT', name: 'XRP', base: 'XRP' },
  { symbol: 'ADAUSDT', name: 'Cardano', base: 'ADA' },
]

const TIMEFRAMES = [
  { label: '1m', value: '1m', minutes: 1 },
  { label: '5m', value: '5m', minutes: 5 },
  { label: '15m', value: '15m', minutes: 15 },
  { label: '1h', value: '1h', minutes: 60 },
  { label: '4h', value: '4h', minutes: 240 },
  { label: '1D', value: '1d', minutes: 1440 },
]

export default function ChartPage() {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const candlestickSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null)
  
  const [symbol, setSymbol] = useState('BTCUSDT')
  const [timeframe, setTimeframe] = useState('1h')
  const [isLoading, setIsLoading] = useState(true)
  const [markers, setMarkers] = useState<WyckoffMarker[]>([])
  const [selectedConcept, setSelectedConcept] = useState<keyof typeof wyckoffConcepts | null>(null)
  const [isPlacingMarker, setIsPlacingMarker] = useState(false)
  const [detectedPhase, setDetectedPhase] = useState<string | null>(null)
  const [lastPrice, setLastPrice] = useState<number>(0)
  const [showSchematic, setShowSchematic] = useState(true)

  // Fetch candlestick data from Binance
  const fetchData = useCallback(async () => {
    setIsLoading(true)
    try {
      const limit = 200
      const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${timeframe}&limit=${limit}`
      const response = await fetch(url)
      const data = await response.json()
      
      const chartData: ChartData[] = data.map((k: any[]) => ({
        time: Math.floor(k[0] / 1000) as Time,
        open: parseFloat(k[1]),
        high: parseFloat(k[2]),
        low: parseFloat(k[3]),
        close: parseFloat(k[4]),
      }))

      if (candlestickSeriesRef.current) {
        candlestickSeriesRef.current.setData(chartData)
      }
      
      if (chartRef.current) {
        chartRef.current.timeScale().fitContent()
      }

      // Set last price
      if (chartData.length > 0) {
        setLastPrice(chartData[chartData.length - 1].close)
      }

      // Simple phase detection based on recent price action
      detectPhase(chartData)
      
    } catch (error) {
      console.error('Error fetching data:', error)
    }
    setIsLoading(false)
  }, [symbol, timeframe])

  // Detect Wyckoff phase based on price action
  const detectPhase = (data: ChartData[]) => {
    if (data.length < 50) return
    
    const recent = data.slice(-20)
    const earlier = data.slice(-50, -20)
    
    const recentAvgClose = recent.reduce((a, b) => a + b.close, 0) / recent.length
    const earlierAvgClose = earlier.reduce((a, b) => a + b.close, 0) / earlier.length
    
    const recentVol = recent.reduce((a, b) => a + (b.close > b.open ? 1 : -1), 0)
    
    // Simple trend detection
    if (recentAvgClose > earlierAvgClose * 1.02) {
      if (recentVol > 0) {
        setDetectedPhase('Phase C/D - Uptrend Building (Accumulation)')
      } else {
        setDetectedPhase('Phase D/E - Mark Up in Progress')
      }
    } else if (recentAvgClose < earlierAvgClose * 0.98) {
      if (recentVol < 0) {
        setDetectedPhase('Phase C/D - Downtrend Building (Distribution)')
      } else {
        setDetectedPhase('Phase D/E - Markdown in Progress')
      }
    } else {
      setDetectedPhase('Phase A/B - Trading Range (Accumulation/Distribution)')
    }
  }

  // Initialize chart
  useEffect(() => {
    if (!chartContainerRef.current) return

    const chart = createChart(chartContainerRef.current, {
      layout: {
        backgroundColor: '#0f172a',
        textColor: '#94a3b8',
      },
      grid: {
        vertLines: { color: '#1e293b' },
        horzLines: { color: '#1e293b' },
      },
      crosshair: {
        mode: 1,
      },
      timeScale: {
        borderColor: '#334155',
        timeVisible: true,
        secondsVisible: false,
      },
      rightPriceScale: {
        borderColor: '#334155',
      },
    })

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#10B981',
      downColor: '#EF4444',
      borderUpColor: '#10B981',
      borderDownColor: '#EF4444',
      wickUpColor: '#10B981',
      wickDownColor: '#EF4444',
    })

    chartRef.current = chart
    candlestickSeriesRef.current = candlestickSeries

    // Handle click to place marker
    chart.subscribeClick((param: MouseEventParams) => {
      if (isPlacingMarker && selectedConcept && param.time && param.point) {
        const price = candlestickSeries.coordinateToPrice(param.point.y)
        if (price) {
          const newMarker: WyckoffMarker = {
            id: Date.now().toString(),
            concept: selectedConcept,
            time: param.time as number,
            price: price,
          }
          setMarkers(prev => [...prev, newMarker])
          setIsPlacingMarker(false)
          setSelectedConcept(null)
        }
      }
    })

    fetchData()

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ 
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight 
        })
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
      chart.remove()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Update markers on chart
  useEffect(() => {
    if (!candlestickSeriesRef.current) return

    const seriesMarkers = markers.map(m => ({
      time: m.time as Time,
      position: 'aboveBar' as const,
      color: wyckoffConcepts[m.concept].color,
      shape: 'circle' as const,
      text: wyckoffConcepts[m.concept].label,
      size: 1,
    }))

    candlestickSeriesRef.current.setMarkers(seriesMarkers)
  }, [markers])

  // Re-fetch when symbol/timeframe changes
  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Auto-refresh every minute
  useEffect(() => {
    const interval = setInterval(fetchData, 60000)
    return () => clearInterval(interval)
  }, [fetchData])

  const removeMarker = (id: string) => {
    setMarkers(prev => prev.filter(m => m.id !== id))
  }

  const clearAllMarkers = () => {
    setMarkers([])
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#0f172a', color: 'white' }}>
      {/* Header */}
      <header style={{ padding: '1rem', backgroundColor: '#1e293b', borderBottom: '1px solid #334155' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>📈 Wyckoff Chart</h1>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Symbol selector */}
            <select 
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              style={{ padding: '0.5rem', borderRadius: '0.5rem', backgroundColor: '#334155', color: 'white', border: '1px solid #475569' }}
            >
              {SYMBOLS.map(s => (
                <option key={s.symbol} value={s.symbol}>{s.name} ({s.base})</option>
              ))}
            </select>

            {/* Timeframe selector */}
            <div style={{ display: 'flex', gap: '0.25rem', backgroundColor: '#334155', padding: '0.25rem', borderRadius: '0.5rem' }}>
              {TIMEFRAMES.map(tf => (
                <button
                  key={tf.value}
                  onClick={() => setTimeframe(tf.value)}
                  style={{
                    padding: '0.375rem 0.75rem',
                    borderRadius: '0.25rem',
                    backgroundColor: timeframe === tf.value ? '#2563eb' : 'transparent',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: timeframe === tf.value ? 'bold' : 'normal',
                  }}
                >
                  {tf.label}
                </button>
              ))}
            </div>

            {/* Refresh button */}
            <button
              onClick={fetchData}
              disabled={isLoading}
              style={{ padding: '0.5rem 1rem', backgroundColor: '#2563eb', borderRadius: '0.5rem', border: 'none', color: 'white', cursor: 'pointer' }}
            >
              {isLoading ? 'Loading...' : '🔄 Refresh'}
            </button>

            {/* Show/hide schematic */}
            <button
              onClick={() => setShowSchematic(!showSchematic)}
              style={{ 
                padding: '0.5rem 1rem', 
                backgroundColor: showSchematic ? '#10B981' : '#334155', 
                borderRadius: '0.5rem', 
                border: 'none', 
                color: 'white',
                cursor: 'pointer' 
              }}
            >
              {showSchematic ? '📊 Schematic On' : '📊 Schematic Off'}
            </button>
          </div>
        </div>

        {/* Price display */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
          <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
            ${lastPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          {detectedPhase && (
            <span style={{ 
              padding: '0.25rem 0.75rem', 
              backgroundColor: detectedPhase.includes('Accumulation') ? '#10B98122' : detectedPhase.includes('Distribution') ? '#EF444422' : '#3B82F622',
              borderRadius: '9999px',
              fontSize: '0.875rem',
              color: detectedPhase.includes('Accumulation') ? '#10B981' : detectedPhase.includes('Distribution') ? '#EF4444' : '#3B82F6',
            }}>
              {detectedPhase}
            </span>
          )}
        </div>
      </header>

      {/* Main content */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Chart */}
        <div ref={chartContainerRef} style={{ flex: 1, position: 'relative' }}>
          {isLoading && (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#94a3b8' }}>
              Loading chart data...
            </div>
          )}
        </div>

        {/* Sidebar - Wyckoff Tools */}
        <div style={{ width: '280px', backgroundColor: '#1e293b', borderLeft: '1px solid #334155', overflow: 'auto', padding: '1rem' }}>
          {/* Wyckoff Concepts */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>🎯 Place Marker</h3>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.75rem' }}>
              Click a concept, then click on the chart to place it
            </p>
            
            <div style={{ marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.75rem', color: '#10B981', marginBottom: '0.5rem', fontWeight: 'bold' }}>📈 Accumulation</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                {['SC', 'AR', 'ST', 'Spring', 'LPS', 'SOS'].map(concept => (
                  <button
                    key={concept}
                    onClick={() => { setSelectedConcept(concept as keyof typeof wyckoffConcepts); setIsPlacingMarker(true); }}
                    style={{
                      padding: '0.25rem 0.5rem',
                      fontSize: '0.75rem',
                      backgroundColor: '#10B98122',
                      color: '#10B981',
                      border: '1px solid #10B98144',
                      borderRadius: '0.25rem',
                      cursor: 'pointer',
                    }}
                  >
                    {concept}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p style={{ fontSize: '0.75rem', color: '#EF4444', marginBottom: '0.5rem', fontWeight: 'bold' }}>📉 Distribution</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                {['BC', 'UTAD', 'LPSY', 'SOW'].map(concept => (
                  <button
                    key={concept}
                    onClick={() => { setSelectedConcept(concept as keyof typeof wyckoffConcepts); setIsPlacingMarker(true); }}
                    style={{
                      padding: '0.25rem 0.5rem',
                      fontSize: '0.75rem',
                      backgroundColor: '#EF444422',
                      color: '#EF4444',
                      border: '1px solid #EF444444',
                      borderRadius: '0.25rem',
                      cursor: 'pointer',
                    }}
                  >
                    {concept}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Placed Markers */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 'bold' }}>📍 Markers ({markers.length})</h3>
              {markers.length > 0 && (
                <button
                  onClick={clearAllMarkers}
                  style={{ fontSize: '0.75rem', color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Clear All
                </button>
              )}
            </div>
            
            {markers.length === 0 ? (
              <p style={{ fontSize: '0.75rem', color: '#64748b' }}>No markers placed yet</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {markers.map(marker => (
                  <div
                    key={marker.id}
                    style={{
                      padding: '0.5rem',
                      backgroundColor: '#334155',
                      borderRadius: '0.25rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <span style={{ fontWeight: 'bold', color: wyckoffConcepts[marker.concept].color }}>
                        {wyckoffConcepts[marker.concept].label}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: '#94a3b8', marginLeft: '0.5rem' }}>
                        ${marker.price.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <button
                      onClick={() => removeMarker(marker.id)}
                      style={{ color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem' }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Wyckoff Phases Reference */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>📚 Wyckoff Phases</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { phase: 'A', name: 'Stop the Trend', desc: 'Prior trend ends, supply/demand equilibrium' },
                { phase: 'B', name: 'Build Cause', desc: 'Trading range forms, institutions accumulate' },
                { phase: 'C', name: 'Test', desc: 'Spring/UTAD tests support/resistance' },
                { phase: 'D', name: 'Launch', desc: 'Breakout, trend begins' },
                { phase: 'E', name: 'New Trend', desc: 'Price moves away from range' },
              ].map(p => (
                <div
                  key={p.phase}
                  style={{
                    padding: '0.5rem',
                    backgroundColor: '#334155',
                    borderRadius: '0.25rem',
                    borderLeft: '3px solid #3B82F6',
                  }}
                >
                  <div style={{ fontWeight: 'bold', color: '#3B82F6' }}>{p.phase}: {p.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{p.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          {isPlacingMarker && selectedConcept && (
            <div style={{ 
              marginTop: '1rem', 
              padding: '0.75rem', 
              backgroundColor: '#2563eb22', 
              borderRadius: '0.5rem',
              border: '1px solid #2563eb44'
            }}>
              <p style={{ fontSize: '0.875rem', color: '#60a5fa', fontWeight: 'bold' }}>
                Placing: {selectedConcept}
              </p>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                Click on the chart to place this marker
              </p>
              <button
                onClick={() => { setIsPlacingMarker(false); setSelectedConcept(null); }}
                style={{ 
                  marginTop: '0.5rem', 
                  padding: '0.25rem 0.5rem', 
                  backgroundColor: '#334155', 
                  border: 'none', 
                  borderRadius: '0.25rem',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '0.75rem'
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
