import './Card.css';

function Card({item, stopFlip, handleSelectedCards, toggled}) {
  return (
    <div className="card">
        {toggled ? 
        <img className="face" src={item.img} alt="face" /> :
        <div className="back" onClick={() => (!stopFlip && handleSelectedCards(item))}>{" "}</div>
        }
    </div>
  );
}

export default Card;
