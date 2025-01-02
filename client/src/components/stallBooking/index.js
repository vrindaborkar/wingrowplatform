import React from 'react'
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva'

const Stall = ({ x, y, width, height, label }) => (
  <>
    <Rect
      x={x}
      y={y}
      width={width}
      height={height}
      stroke='black'
      fill='#88c0d0' 
      strokeWidth={2}
      cornerRadius={5}
    />
    {label && (
      <Text
        x={x + 5}
        y={y + 5}
        text={label}
        fontSize={14}
        fontStyle='bold'
        fill='black'
      />
    )}
  </>
)

const Road = ({ x, y, width, height, label }) => (
  <>
    <Rect x={x} y={y} width={width} height={height} fill='#606060' />
    {label && (
      <Text
        x={x + 5}
        y={y + 5}
        text={label}
        fontSize={14}
        fontStyle='bold'
        fill='white'
      />
    )}
  </>
)

const StallBookingComponent = () => {
  const stalls = [
    // Outer layout stalls
    { x: 50, y: 70, width: 100, height: 100, label: 'Main Gate' },
    { x: 150, y: 70, width: 100, height: 100, label: 'Parking' },
    // Add other stalls here...
    { x: 1050, y: 70, width: 100, height: 100, label: 'Main Gate' },
    // Inside market stalls
    { x: 200, y: 200, width: 100, height: 100, label: 'Fruit Stall 1' },
    { x: 300, y: 200, width: 100, height: 100, label: 'Fruit Stall 2' },
    { x: 400, y: 200, width: 100, height: 100, label: 'Fruit Stall 3' },
    { x: 500, y: 200, width: 100, height: 100, label: 'Fruit Stall 4' },
    { x: 600, y: 200, width: 100, height: 100, label: 'Fruit Stall 5' },
    { x: 700, y: 200, width: 100, height: 100, label: 'Fruit Stall 6' },
    { x: 800, y: 200, width: 100, height: 100, label: 'Fruit Stall 7' },
    { x: 900, y: 200, width: 100, height: 100, label: 'Fruit Stall 8' },
    { x: 1000, y: 200, width: 100, height: 100, label: 'Fruit Stall 9' },
    { x: 1100, y: 200, width: 100, height: 100, label: 'Fruit Stall 10' },
    // Central circle stalls
    { x: 600, y: 300, width: 100, height: 100, label: 'Fruit Stall 11' },
    { x: 700, y: 300, width: 100, height: 100, label: 'Fruit Stall 12' },
    { x: 800, y: 300, width: 100, height: 100, label: 'Fruit Stall 13' },
    { x: 600, y: 400, width: 100, height: 100, label: 'Fruit Stall 14' },
    { x: 700, y: 400, width: 100, height: 100, label: 'Fruit Stall 15' },
    { x: 800, y: 400, width: 100, height: 100, label: 'Fruit Stall 16' },
    { x: 600, y: 500, width: 100, height: 100, label: 'Fruit Stall 17' },
    { x: 700, y: 500, width: 100, height: 100, label: 'Fruit Stall 18' },
    { x: 800, y: 500, width: 100, height: 100, label: 'Fruit Stall 19' },
  ]

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Road
          x={0}
          y={0}
          width={window.innerWidth}
          height={40}
          label='Main Road'
        />
        <Road
          x={0}
          y={window.innerHeight - 40}
          width={window.innerWidth}
          height={40}
          label='Bottom Road'
        />
        <Line
          points={[50, 50, 1150, 50, 1150, 550, 50, 550, 50, 50]}
          closed
          stroke='black'
          strokeWidth={2}
        />
        <Circle
          x={600}
          y={300}
          radius={50}
          stroke='black'
          strokeWidth={2}
          fill='#FFD700'
        />
        <Text
          x={600 - 20}
          y={300 - 10}
          text='Center'
          fontSize={14}
          fontStyle='bold'
          fill='black'
        />
        {stalls.map((stall, index) => (
          <Stall key={index} {...stall} />
        ))}
        <Text
          x={50}
          y={20}
          text='Welcome to the Fruit Market!'
          fontSize={24}
          fontStyle='bold'
          fill='green'
        />
      </Layer>
    </Stage>
  )
}

export default StallBookingComponent
