'use client'

import { useState } from 'react'
import Link from 'next/link'

const schematics = [
  {
    id: 'accumulation-1',
    title: 'Accumulation Schematic #1',
    description: 'The classic accumulation pattern - simplest form of smart money accumulation',
    phases: [
      { phase: 'A', name: 'Stop the Downtrend', elements: ['Selling Climax (SC)', 'Automatic Rally (AR)', 'Secondary Test (ST)'] },
      { phase: 'B', name: 'Building Cause', elements: ['Trading Range forms', 'Volume decreases', 'Institutional buying'] },
      { phase: 'C', name: 'The Spring', elements: ['Support tested', 'Price holds above low', 'Last Point of Support forms'] },
      { phase: 'D', name: 'Launch', elements: ['Breakout above resistance', 'Higher highs', 'Volume confirms'] },
      { phase: 'E', name: 'New Trend', elements: ['Markup phase begins', 'Price moves away from TR'] }
    ],
    color: '#10B981',
    keyPoints: [
      'Single spring before breakout',
      'Relatively tight trading range',
      'Clean SOS (Sign of Strength) breakout'
    ]
  },
  {
    id: 'accumulation-2',
    title: 'Accumulation Schematic #2',
    description: 'Complex accumulation with multiple springs and shakeouts',
    phases: [
      { phase: 'A', name: 'Stop the Downtrend', elements: ['Multiple Selling Climaxes', 'Deep Shakeouts', 'Recovery rallies'] },
      { phase: 'B', name: 'Building Cause', elements: ['Extended Trading Range', 'Multiple tests of support', 'Volume absorption'] },
      { phase: 'C', name: 'Tests', elements: ['Multiple Springs', 'Higher highs within TR', 'Last Point of Support'] },
      { phase: 'D', name: 'Launch', elements: ['Breakout after multiple tests', 'SOS with volume', 'Retest of breakout'] },
      { phase: 'E', name: 'New Trend', elements: ['Strong markup', 'Pullbacks find support'] }
    ],
    color: '#22C55E',
    keyPoints: [
      'More complex than Schematic #1',
      'Multiple springs and shakeouts',
      'Takes longer to complete',
      'Often leads to stronger moves'
    ]
  },
  {
    id: 'distribution',
    title: 'Distribution Schematic',
    description: 'Smart money selling positions to the public at higher prices',
    phases: [
      { phase: 'A', name: 'Stop the Uptrend', elements: ['Buying Climax (BC)', 'Automatic Reaction (AR)', 'Secondary Test (ST)'] },
      { phase: 'B', name: 'Building Cause', elements: ['Trading Range forms', 'High volume on rallies', 'Institutional selling'] },
      { phase: 'C', name: 'The Test (UTAD)', elements: ['Up-thrust after resistance distribution', 'Tests', 'Last Point of Supply forms'] },
      { phase: 'D', name: 'Breakdown', elements: ['Breakdown below support', 'Lower lows', 'Volume increases'] },
      { phase: 'E', name: 'New Trend', elements: ['Markdown phase begins', 'Price moves away from TR'] }
    ],
    color: '#EF4444',
    keyPoints: [
      'Mirror of accumulation',
      'High volume on selling',
      'UTAD (Up-Thrust After Distribution)',
      'SOW (Sign of Weakness) breakdown'
    ]
  },
  {
    id: 'cycle-overview',
    title: 'Wyckoff Cycle Overview',
    description: 'Complete cycle showing phases A through E',
    phases: [
      { phase: 'A', name: 'Stop the Trend', elements: ['Trend reversal begins', 'Climax event', 'Initial recovery'] },
      { phase: 'B', name: 'Build Cause', elements: ['Trading range', 'Accumulation/Distribution', 'Cause building'] },
      { phase: 'C', name: 'Test', elements: ['Spring or UTAD', 'Final test of S/R', 'Last point forms'] },
      { phase: 'D', name: 'Launch', elements: ['Breakout/Breakdown', 'Trend begins', 'Confirmation'] },
      { phase: 'E', name: 'New Trend', elements: ['Trend continues', 'Pullbacks to S/R', 'Extended move'] }
    ],
    color: '#3B82F6',
    keyPoints: [
      'Complete cycle: Accumulation → Markup → Distribution → Markdown',
      'Phases repeat continuously',
      'Identifies institutional activity',
      'Framework for market analysis'
    ]
  }
]

export default function SchematicsPage() {
  const [selectedSchematic, setSelectedSchematic] = useState(schematics[0])

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: 'white' }}>
      {/* Header */}
      <header style={{ 
        background: 'linear-gradient(to right, #065f46, #1e3a8a)', 
        padding: '2rem 1rem',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          📊 Wyckoff Schematics
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#bfdbfe' }}>
          Visual frameworks for identifying market structure
        </p>
        <Link href="/" style={{ color: '#60a5fa', marginTop: '1rem', display: 'inline-block' }}>
          ← Back to Home
        </Link>
      </header>

      {/* Content */}
      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '2rem 1rem' }}>
        
        {/* Schematic Selector */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {schematics.map(s => (
            <button
              key={s.id}
              onClick={() => setSelectedSchematic(s)}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                fontWeight: '500',
                backgroundColor: selectedSchematic.id === s.id ? s.color : '#1e293b',
                color: 'white',
                border: `1px solid ${selectedSchematic.id === s.id ? s.color : '#334155'}`,
                cursor: 'pointer',
              }}
            >
              {s.title}
            </button>
          ))}
        </div>

        {/* Selected Schematic */}
        <div style={{ display: 'grid', gap: '2rem' }}>
          
          {/* Header */}
          <div style={{ backgroundColor: '#1e293b', borderRadius: '0.75rem', padding: '2rem', borderLeft: `4px solid ${selectedSchematic.color}` }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              {selectedSchematic.title}
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1.125rem' }}>
              {selectedSchematic.description}
            </p>
          </div>

          {/* Visual Representation */}
          <div style={{ backgroundColor: '#1e293b', borderRadius: '0.75rem', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
              📈 Phase-by-Phase Structure
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              {selectedSchematic.phases.map((p, i) => (
                <div 
                  key={p.phase}
                  style={{ 
                    backgroundColor: '#0f172a', 
                    borderRadius: '0.5rem', 
                    padding: '1rem',
                    borderTop: `3px solid ${selectedSchematic.color}`
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <div style={{ 
                      width: '2rem', 
                      height: '2rem', 
                      borderRadius: '50%', 
                      backgroundColor: selectedSchematic.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold'
                    }}>
                      {p.phase}
                    </div>
                    <h4 style={{ fontWeight: 'bold' }}>{p.name}</h4>
                  </div>
                  <ul style={{ fontSize: '0.875rem', color: '#94a3b8', paddingLeft: '1rem' }}>
                    {p.elements.map((el, j) => (
                      <li key={j} style={{ marginBottom: '0.25rem' }}>{el}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Key Points */}
          <div style={{ backgroundColor: '#1e293b', borderRadius: '0.75rem', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              🎯 Key Characteristics
            </h3>
            <ul style={{ display: 'grid', gap: '0.75rem' }}>
              {selectedSchematic.keyPoints.map((point, i) => (
                <li 
                  key={i} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.75rem',
                    padding: '0.75rem',
                    backgroundColor: '#0f172a',
                    borderRadius: '0.5rem'
                  }}
                >
                  <span style={{ color: selectedSchematic.color }}>✓</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* TradingView Chart Placeholder */}
          <div style={{ backgroundColor: '#1e293b', borderRadius: '0.75rem', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              📈 Interactive Example
            </h3>
            <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>
              Practice identifying this pattern on the live chart:
            </p>
            <Link 
              href="/tools/chart"
              style={{
                display: 'inline-block',
                padding: '0.75rem 1.5rem',
                backgroundColor: '#2563eb',
                borderRadius: '0.5rem',
                color: 'white',
                fontWeight: 'bold',
                textDecoration: 'none',
              }}
            >
              Open Live Chart →
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
