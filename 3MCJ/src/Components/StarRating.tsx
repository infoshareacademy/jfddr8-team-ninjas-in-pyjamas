import React, { useContext } from 'react'
import { globalContext } from "../Context/Context";

interface Props {
  onRate: (value: number) => void;
}

const StarRating: React.FC<Props> = ({ onRate }) => {

  const { rating, setRating } = useContext(globalContext);  

  return (
    <div>
      {[1, 2, 3, 4, 5].map(value => (
        <span key={value} onClick={() => {
          setRating(value);
          onRate(value);
          console.log("rating:", rating);
        }}>
          {rating >= value ? '⭐️' : '☆'}
        </span>
      ))}
    </div>
  )
}
export default StarRating
