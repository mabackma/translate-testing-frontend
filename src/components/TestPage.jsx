import { useState } from 'react';
import TextBlock from './TextBlock';
import { getText, getTextLibre } from '../services/apiService';
import Translator from './Translator';

const TestPage = () => {
  const [input, setInput] = useState('');
  const [summaryFromGoogleTranslation, setSummaryFromGoogleTranslation] = useState('');
  const [summaryFromLibreTranslation, setSummaryFromLibreTranslation] = useState('');
  const [googleTranslationToEnglish, setGoogleTranslationToEnglish] = useState('');
  const [googleTranslationToFinnish, setGoogleTranslationToFinnish] = useState('');
  const [libreTranslationToEnglish, setLibreTranslationToEnglish] = useState('');
  const [libreTranslationToFinnish, setLibreTranslationToFinnish] = useState('');
  const [translator, setTranslator] = useState('');

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const translateFromApi = async (language) => {
    let translationResult;

    switch (translator) {
      case 'Google Cloud Translation API':
        if (language === 'en') {
          // Send a POST request to Google Cloud Translation API
          translationResult = await getText(input, 'http://localhost:5001/translate-in-google', language);
          setGoogleTranslationToEnglish(translationResult.translation);
          break;
        } else {
          // Send a POST request to Google Cloud Translation API
          translationResult = await getText(summaryFromGoogleTranslation, 'http://localhost:5001/translate-in-google', language);
          setGoogleTranslationToFinnish(translationResult.translation);
          break;
        }
      case 'LibreTranslate':
        if (language === 'en') {
          // Send a POST request to LibreTranslate
          translationResult = await getTextLibre(input, language);
          setLibreTranslationToEnglish(translationResult.translatedText);
        break;
        } else {
          // Send a POST request to LibreTranslate
          translationResult = await getTextLibre(summaryFromLibreTranslation, language);
          setLibreTranslationToFinnish(translationResult.translatedText);
          break;
        }
      case 'translator3':
        break;
      default:
        break;
    }

  }

  const handleSummaryClick = async () => {
    try {
        // Send a POST request to the summary address
        if (translator === 'Google Cloud Translation API') {
        const summaryResult = await getText(googleTranslationToEnglish, 'http://localhost:5001/summary');
        setSummaryFromGoogleTranslation(summaryResult.summary);
      } else {
        const summaryResult = await getText(libreTranslationToEnglish, 'http://localhost:5001/summary');
        setSummaryFromLibreTranslation(summaryResult.summary);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleTranslateClick = async () => {
    try {
      translateFromApi('en');
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleTranslateBackClick = async () => {
    try {
      translateFromApi('fi');
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div>
      <br/>
      <label htmlFor="textarea">Enter Text:</label>
      <br/>
      <textarea
        id="textarea"
        value={input}
        onChange={handleChange}
        rows={20} 
        cols={150} 
      />
      <Translator translator={translator} setTranslator={setTranslator}/>
      {input ? <TextBlock label="Input text:" text={input}/> : null}
      <button onClick={handleTranslateClick}>Translate</button>
      <br/>
      {googleTranslationToEnglish ? <TextBlock label="Google translation from input text:" text={googleTranslationToEnglish}/> : null}
      {libreTranslationToEnglish ? <TextBlock label="Libre translation to english from input text:" text={libreTranslationToEnglish}/> : null}
      <button onClick={handleSummaryClick}>Summarize</button>
      <br/>
      {summaryFromGoogleTranslation ? <TextBlock label="Summary from Google translation:" text={summaryFromGoogleTranslation}/> : null}
      {summaryFromLibreTranslation ? <TextBlock label="Summary from Libre translation:" text={summaryFromLibreTranslation}/> : null}
      <button onClick={handleTranslateBackClick}>Translate back</button>
      <br/>
      {googleTranslationToFinnish ? <TextBlock label="Google translation  translation back to finnish from summary:" text={googleTranslationToFinnish}/> : null}
      {libreTranslationToFinnish ? <TextBlock label="Libre translation  translation back to finnish from summary:" text={libreTranslationToFinnish}/> : null}
    </div>
  );
}

export default TestPage;