import React, { useContext } from 'react'
import { globalContext } from "../Context/Context";
import StarRatings from './react-star-ratings';

interface rate {
  onRate: (value: number) => void;
}

const StarRating: React.FC<rate> = ({ onRate }) => {

  const { rating, setRating } = useContext(globalContext);  

  return (
    <div>
      {[1, 2, 3, 4, 5].map(value => (
        <span key={value} onClick={() => {
          setRating(value);
          onRate(value);
        }}>
          {rating >= value ? '★' : '☆'}
        </span>
      ))}
    </div>
  )
}

export default StarRating