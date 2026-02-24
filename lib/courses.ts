export interface Lesson {
  id: string
  title: string
  description: string
  content: string
  order: number
}

export interface Course {
  id: string
  title: string
  description: string
  lessons: Lesson[]
  icon: string
  color: string
}

export const courses: Course[] = [
  {
    id: 'fundamentals',
    title: 'Wyckoff Fundamentals',
    description: 'Master the core principles that drive market movements',
    icon: '📐',
    color: '#3B82F6',
    lessons: [
      {
        id: 'fundamentals-1',
        title: 'Introduction to Wyckoff',
        description: 'Understanding the methodology',
        order: 1,
        content: `
# Introduction to Wyckoff Methodology

The Wyckoff methodology is a technical analysis approach developed by Richard D. Wyckoff in the early 20th century. It focuses on understanding the actions of institutional money ("Composite Operator") and using that understanding to anticipate price movements.

## Key Principles

1. **Price and Volume Tell the Story** - The market's price and volume data reveal the supply and demand dynamics
2. **Composite Operator (CO)** - Large institutional traders who move markets
3. **Trend and Structure** - Markets move in phases that can be identified and predicted

## Why Wyckoff Works

Wyckoff believed that the market is not random but follows identifiable patterns caused by the accumulation and distribution of large orders by institutional traders.
        `
      },
      {
        id: 'fundamentals-2',
        title: 'The Three Laws',
        description: 'Law of Supply and Demand',
        order: 2,
        content: `
# The Three Laws of Wyckoff

## Law of Supply and Demand
When demand exceeds supply, prices rise. When supply exceeds demand, prices fall. This is the most fundamental law in trading.

## Law of Cause and Effect
Every effect (price movement) has a cause (accumulation or distribution). The cause must be sufficient to produce the effect.

## Law of Effort vs. Result
When effort (volume) doesn't match the result (price movement), expect a reversal. Divergence between price and volume signals weakness.
        `
      },
      {
        id: 'fundamentals-3',
        title: 'Reading Price and Volume',
        description: 'Interpreting market data',
        order: 3,
        content: `
# Reading Price and Volume

## Volume Analysis
- High volume indicates strong conviction
- Low volume suggests lack of interest
- Volume precedes price

## Price Action
- Close location indicates future direction
- Range expansion/contraction patterns
- Support and resistance levels
        `
      },
      {
        id: 'fundamentals-4',
        title: 'Trend Identification',
        description: 'Identifying market direction',
        order: 4,
        content: `
# Trend Identification

## Uptrend
- Higher highs and higher lows
- Buying in dips (accumulation zones)

## Downtrend
- Lower highs and lower lows
- Selling in rallies (distribution zones)

## Consolidation
- Price moving in a defined range
- Preparation for next move
        `
      },
      {
        id: 'fundamentals-5',
        title: 'Support and Resistance',
        description: 'Key price levels',
        order: 5,
        content: `
# Support and Resistance

## Support
- Price level where buying pressure exceeds selling
- Multiple tests indicate strength

## Resistance
- Price level where selling pressure exceeds buying
- Breakout confirms new trend
        `
      },
      {
        id: 'fundamentals-6',
        title: 'Market Structure',
        description: 'Understanding market phases',
        order: 6,
        content: `
# Market Structure

## Single Stick Analysis
- Open, High, Low, Close
- Position within daily range
- Volume interpretation

## Multiple Stick Analysis
- Trend patterns
- Support/resistance zones
- Accumulation/distribution signs
        `
      },
      {
        id: 'fundamentals-7',
        title: 'Introduction to Schematics',
        description: 'The visual framework',
        order: 7,
        content: `
# Introduction to Schematics

Wyckoff schematics are visual representations of the accumulation and distribution cycles. They help traders identify where smart money is accumulating or distributing positions.

## Types of Schematics
- Accumulation Schematic #1
- Accumulation Schematic #2
- Distribution Schematic
- Wyckoff Cycle Overview (Phases A-E)
        `
      },
      {
        id: 'fundamentals-8',
        title: 'Putting It Together',
        description: 'Practical application',
        order: 8,
        content: `
# Putting It Together

## Applying the Methodology

1. Identify the trend using price action
2. Look for accumulation/distribution zones
3. Use schematics to identify the phase
4. Wait for entry signals (Spring, UTAD)
5. Manage risk with position sizing
        `
      }
    ]
  },
  {
    id: 'accumulation',
    title: 'Accumulation Schematics',
    description: 'Learn to identify smart money accumulation patterns',
    icon: '📈',
    color: '#10B981',
    lessons: [
      {
        id: 'accum-1',
        title: 'What is Accumulation?',
        description: 'Understanding institutional buying',
        order: 1,
        content: `
# What is Accumulation?

Accumulation is the process by which smart money (institutional traders) builds positions in a stock over time, typically during a trading range, before a markup phase.

## Key Characteristics
- Buying at support levels
- Selling into strength (to test supply)
- Building cause before effect
        `
      },
      {
        id: 'accum-2',
        title: 'Accumulation Schematic #1',
        description: 'The classic accumulation pattern',
        order: 2,
        content: `
# Accumulation Schematic #1

## Phase A - Stop the Downtrend
- Last point of supply (LPSY)
- Selling climax (SC)
- Automatic rally (AR)
- Secondary test (ST)

## Phase B - Building Cause
- Trading range forms
- Institutional buying continues
- Volume decreases in range

## Phase C - The Spring
- Support is tested
- Price holds above low
- Last point of support (LPS)

## Phase D - Launch
- Breakout above resistance
- Higher highs and higher lows
- Increased volume confirms
        `
      },
      {
        id: 'accum-3',
        title: 'Accumulation Schematic #2',
        description: 'Complex accumulation pattern',
        order: 3,
        content: `
# Accumulation Schematic #2

Similar to Schematic #1 but with more complex structure:

## Characteristics
- Multiple springs
- Shakeouts
- Higher lows within TR
- More time in accumulation
        `
      },
      {
        id: 'accum-4',
        title: 'Spring Analysis',
        description: 'The key entry signal',
        order: 4,
        content: `
# Spring Analysis

A Spring is a test of support that fails to go below the prior low, indicating weak supply and potential upward movement.

## What to Look For
- Price dips below support but closes back above
- Low volume on the test
- Quick recovery
        `
      },
      {
        id: 'accum-5',
        title: 'Last Point of Support (LPS)',
        description: 'Optimal entry point',
        order: 5,
        content: `
# Last Point of Support (LPS)

The LPS is the final buying opportunity before markup begins, typically occurring after the Spring.

## Characteristics
- Higher low
- Reduced volume
- Consolidation before breakout
        `
      },
      {
        id: 'accum-6',
        title: 'Volume Analysis in Accumulation',
        description: 'Reading volume patterns',
        order: 6,
        content: `
# Volume Analysis in Accumulation

## Buying Climax
- High volume spike
- Wide range candle down
- Often the lowest point

## Automatic Rally
- Moderate volume increase
- Price recovers

## Testing
- Lower volume on retests
- Shows absorption
        `
      },
      {
        id: 'accum-7',
        title: 'Sign of Strength (SOS)',
        description: 'Confirming accumulation',
        order: 7,
        content: `
# Sign of Strength (SOS)

An SOS is a breakout above a previous resistance level with increased volume, confirming the end of accumulation.

## Characteristics
- Breakout above resistance
- Higher volume
- Retest of breakout
        `
      },
      {
        id: 'accum-8',
        title: 'Entry Strategies',
        description: 'When to enter positions',
        order: 8,
        content: `
# Entry Strategies

## Entry Points
1. After Spring confirmation
2. At LPS
3. On breakout (SOS)

## Confirmation
- Volume increase
- Price closes above resistance
- Strong close
        `
      },
      {
        id: 'accum-9',
        title: 'Stop Loss Placement',
        description: 'Risk management',
        order: 9,
        content: `
# Stop Loss Placement

## Where to Place Stops
- Below the Spring low
- Below recent lows
- Below accumulation low

## Risk Management
- Position size accordingly
- 1-2% max risk per trade
        `
      },
      {
        id: 'accum-10',
        title: 'Exit Strategies',
        description: 'Taking profits',
        order: 10,
        content: `
# Exit Strategies

## When to Exit
- First resistance target reached
- Signs of distribution
- Trend reversal signals

## Trail Stops
- Move to breakeven after initial target
- Use swing lows for uptrends
        `
      },
      {
        id: 'accum-11',
        title: 'Real Examples',
        description: 'Case studies',
        order: 11,
        content: `
# Real Examples

Let's analyze historical examples of accumulation patterns.
        `
      },
      {
        id: 'accum-12',
        title: 'Common Mistakes',
        description: 'What to avoid',
        order: 12,
        content: `
# Common Mistakes

## Mistakes to Avoid
- Entering too early (before Spring)
- Ignoring volume
- Not waiting for confirmation
- Poor stop loss placement
        `
      }
    ]
  },
  {
    id: 'distribution',
    title: 'Distribution Schematics',
    description: 'Spot where smart money distributes positions',
    icon: '📉',
    color: '#EF4444',
    lessons: [
      {
        id: 'dist-1',
        title: 'What is Distribution?',
        description: 'Understanding institutional selling',
        order: 1,
        content: `
# What is Distribution?

Distribution is the opposite of accumulation - smart money selling their positions to the public at higher prices before a markdown phase.
        `
      },
      {
        id: 'dist-2',
        title: 'Distribution Schematic',
        description: 'The classic pattern',
        order: 2,
        content: `
# Distribution Schematic

## Phase A - Stop the Uptrend
- Buying climax (BC)
- Automatic reaction (AR)
- Secondary test (ST)

## Phase B - Building Cause
- Trading range forms
- Institutional selling continues

## Phase C - The Test (UTAD)
- Test of resistance
- Last point of supply forms

## Phase D - Breakdown
- Breakdown below support
        `
      },
      {
        id: 'dist-3',
        title: 'Up-Thrust After Distribution (UTAD)',
        description: 'The key sell signal',
        order: 3,
        content: `
# Up-Thrust After Distribution (UTAD)

A UTAD is a test of resistance that fails to go above the prior high, indicating weak demand and potential downward movement.
        `
      },
      {
        id: 'dist-4',
        title: 'Last Point of Supply (LPSY)',
        description: 'Optimal short entry',
        order: 4,
        content: `
# Last Point of Supply (LPSY)

The LPSY is the final selling opportunity before markdown begins, typically occurring after the UTAD.
        `
      },
      {
        id: 'dist-5',
        title: 'Selling Climax',
        description: 'The beginning of distribution',
        order: 5,
        content: `
# Selling Climax (SC)

A selling climax is a high-volume spike that often marks the end of a downtrend or the beginning of accumulation.
        `
      },
      {
        id: 'dist-6',
        title: 'Signs of Weakness (SOW)',
        description: 'Confirming distribution',
        order: 6,
        content: `
# Signs of Weakness (SOW)

A SOW is a breakdown below a previous support level with increased volume, confirming the end of distribution.
        `
      },
      {
        id: 'dist-7',
        title: 'Short Selling Strategies',
        description: 'Timing entries',
        order: 7,
        content: `
# Short Selling Strategies

## Entry Points
1. After UTAD confirmation
2. At LPSY
3. On breakdown (SOW)
        `
      },
      {
        id: 'dist-8',
        title: 'Short Covering',
        description: 'Managing short positions',
        order: 8,
        content: `
# Short Covering

## When to Cover
- First support target reached
- Signs of accumulation
- Trend reversal signals
        `
      },
      {
        id: 'dist-9',
        title: 'Comparing Accumulation vs Distribution',
        description: 'Understanding the differences',
        order: 9,
        content: `
# Comparing Accumulation vs Distribution

## Key Differences
- Accumulation: Buying, low prices, upward bias
- Distribution: Selling, high prices, downward bias
- Mirror patterns
        `
      },
      {
        id: 'dist-10',
        title: 'Market Cycle Integration',
        description: 'Putting distribution in context',
        order: 10,
        content: `
# Market Cycle Integration

Distribution occurs as part of the complete Wyckoff cycle, leading into markdown and eventually back to accumulation.
        `
      }
    ]
  },
  {
    id: 'volume',
    title: 'Volume Analysis',
    description: 'Read volume like a professional trader',
    icon: '📊',
    color: '#8B5CF6',
    lessons: [
      {
        id: 'volume-1',
        title: 'Volume Fundamentals',
        description: 'Understanding volume',
        order: 1,
        content: `
# Volume Fundamentals

Volume represents the number of shares traded during a given period. It indicates the level of participation and conviction behind price movements.
        `
      },
      {
        id: 'volume-2',
        title: 'Volume and Trend',
        description: 'Confirming trends with volume',
        order: 2,
        content: `
# Volume and Trend

## Healthy Uptrend
- Higher volume on up days
- Lower volume on pullbacks

## Healthy Downtrend
- Higher volume on down days
- Lower volume on rallies
        `
      },
      {
        id: 'volume-3',
        title: 'Volume Climaxes',
        description: 'Identifying extreme readings',
        order: 3,
        content: `
# Volume Climaxes

## Buying Climax (BC)
- Extremely high volume
- Often accompanied by wide-range up bar
- May signal end of uptrend

## Selling Climax (SC)
- Extremely high volume
- Often accompanied by wide-range down bar
- May signal end of downtrend
        `
      },
      {
        id: 'volume-4',
        title: 'Volume and Breakouts',
        description: 'Confirming breakouts',
        order: 4,
        content: `
# Volume and Breakouts

## True Breakout
- Increased volume on breakout
- Wide-range candle
- Close above resistance

## False Breakout
- Low volume on breakout
- Close back below resistance
        `
      },
      {
        id: 'volume-5',
        title: 'Absorption',
        description: 'Reading institutional activity',
        order: 5,
        content: `
# Absorption

Absorption occurs when large players absorb all available supply or demand without moving price significantly.
        `
      },
      {
        id: 'volume-6',
        title: 'Effort vs Result',
        description: 'Divergence patterns',
        order: 6,
        content: `
# Effort vs Result

## High Effort, Low Result
- High volume but price doesn't move far
- Signals reversal likely

## Low Effort, High Result
- Low volume but price moves significantly
        `
      }
    ]
  },
  {
    id: 'psychology',
    title: 'Trading Psychology',
    description: 'Master your mind for trading success',
    icon: '🧠',
    color: '#F59E0B',
    lessons: [
      {
        id: 'psych-1',
        title: 'Market Psychology',
        description: 'Understanding crowd behavior',
        order: 1,
        content: `
# Market Psychology

Markets are driven by human emotions: fear and greed. Understanding these emotions helps predict market movements.
        `
      },
      {
        id: 'psych-2',
        title: 'Why Traders Fail',
        description: 'Common psychological pitfalls',
        order: 2,
        content: `
# Why Traders Fail

- Trading too large
- No trading plan
- Revenge trading
- Fear of missing out (FOMO)
- Overtrading
        `
      },
      {
        id: 'psych-3',
        title: 'Building Discipline',
        description: 'Developing a trading mindset',
        order: 3,
        content: `
# Building Discipline

## Key Principles
- Follow your trading plan
- Accept losses
- Be patient
- Stay objective
        `
      },
      {
        id: 'psych-4',
        title: 'Managing Emotions',
        description: 'Keeping emotions in check',
        order: 4,
        content: `
# Managing Emotions

## Techniques
- Take breaks after losses
- Journal your trades
- Stick to position sizing rules
- Have an exit plan
        `
      },
      {
        id: 'psych-5',
        title: 'Long-term Success',
        description: 'Sustainable trading',
        order: 5,
        content: `
# Long-term Success

Focus on consistency and risk management. The goal is to survive long-term, not to get rich quick.
        `
      }
    ]
  }
]

export function getCourseById(id: string): Course | undefined {
  return courses.find(c => c.id === id)
}

export function getLessonById(lessonId: string): Lesson | undefined {
  for (const course of courses) {
    const lesson = course.lessons.find(l => l.id === lessonId)
    if (lesson) return lesson
  }
  return undefined
}

export function getTotalLessons(): number {
  return courses.reduce((acc, course) => acc + course.lessons.length, 0)
}
