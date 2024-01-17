"use client"
import React, { useEffect, useState } from 'react'

interface value {
  targetNumber: number;
  desc: string;
  bgr:string
}
export default function AnimatedNumber(props:value) {

  const [currentNumber, setCurrentNumber] = useState(0);

  useEffect(() => {
    // Update the current number over time
    const interval = setInterval(() => {
      if (currentNumber < props.targetNumber) {
        setCurrentNumber((prevNumber) => prevNumber + 1);
      } else {
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [currentNumber, props.targetNumber]);

  return (
    <div className={`p-4 ${props.bgr} rounded-3xl shadow-2xl bg-opacity-60`}>
      <h2 className="text-heading1-bold text-center">{currentNumber}</h2>
      <p className="text-small-semibold mt-3 text-center">{props.desc}</p>
    </div>
  );
};

