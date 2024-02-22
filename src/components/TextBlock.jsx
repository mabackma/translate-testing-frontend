import './TextBlock.css';

const TextBlock = ({label, text}) => {
  return (
    <div className="summary-container">
      <label>{label}</label>
      <p>{text}</p>
    </div>
  );
}

export default TextBlock;