import React, { useState } from 'react';

interface Props {
  onRateChange?: (value: number) => void;
  rating?: number; 
}

const StarRating: React.FC<Props> = ({ onRateChange, rating:initialRating }) => {

  const [ rating, setRating ] = useState<number>(initialRating || 0);  

  const onRating = (value:number) => {
    if (!onRateChange) return
    setRating(value);
          onRateChange(value);
          console.log("rating:", rating);


  }

  return (
    <div className='star-ratings-div' >
      {[1, 2, 3, 4, 5].map(value => (
        <span key={value} onClick={() => onRating(value)}>
          {rating >= value ? '⭐️' : '☆'}
        </span>
      ))}
    </div>
  )
}
export default StarRating

