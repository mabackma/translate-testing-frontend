import { useState } from 'react';
import TextBlock from './TextBlock';

const TestPage = () => {
  const [value, setValue] = useState('');
  const [summary, setSummary] = useState('');
  const [translation, setTranslation] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleClick = () => {
    // Create a JSON object with the text area value
    const data = { text: value };

    // Send a POST request to the summary address
    fetch('http://127.0.0.1:5000/summary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setSummary(data.summary);
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle errors here
    });

    // Send a POST request to the translate address
    fetch('http://127.0.0.1:5000/translate-in-google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setTranslation(data.translation);
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle errors here
    });
  }

  return (
    <div>
      <br/>
      <label htmlFor="textarea">Enter Text:</label>
      <br/>
      <textarea
        id="textarea"
        value={value}
        onChange={handleChange}
        rows={8} 
        cols={50} 
      />
      <br/>
      <button onClick={handleClick}>Send Text</button>
      {
        translation ?
        <TextBlock label="Translation from input text:" text={translation}/>
        : null
      }
      {
        summary ?
        <TextBlock label="Summary from input text:" text={summary}/>
        : null
      }
    </div>
  );
}

export default TestPage;