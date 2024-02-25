import { useState } from 'react';
import TextBlock from './TextBlock';
import { getText, getTextLibre } from '../services/apiService';
import Translator from './Translator';

const TestPage = () => {
  const [input, setInput] = useState('');
  const [summaryFromGoogleTranslation, setSummaryFromGoogleTranslation] = useState('');
  const [summaryFromChatgptTranslation, setSummaryFromChatgptTranslation] = useState('');
  const [summaryFromLibreTranslation, setSummaryFromLibreTranslation] = useState('');
  const [summaryFromHelsinkiTranslation, setSummaryFromHelsinkiTranslation] = useState('');

  const [googleTranslationToEnglish, setGoogleTranslationToEnglish] = useState('');
  const [googleTranslationToFinnish, setGoogleTranslationToFinnish] = useState('');

  const [chatgptTranslationToEnglish, setChatgptTranslationToEnglish] = useState('');
  const [chatgptTranslationToFinnish, setChatgptTranslationToFinnish] = useState('');

  const [libreTranslationToEnglish, setLibreTranslationToEnglish] = useState('');
  const [libreTranslationToFinnish, setLibreTranslationToFinnish] = useState('');

  const [helsinkiTranslationToEnglish, setHelsinkiTranslationToEnglish] = useState('');
  const [helsinkiTranslationToFinnish, setHelsinkiTranslationToFinnish] = useState('');

  const [translator, setTranslator] = useState('');

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const translateFromApi = async (language) => {
    let translationResult;

    switch (translator) {
      case 'Google Cloud Translation API':
        // Send a POST request to Google Cloud Translation API
        if (language === 'en') {
          translationResult = await getText(input, 'http://localhost:5001/translate-in-google', language);
          setGoogleTranslationToEnglish(translationResult.translation);
          break;
        } else {
          translationResult = await getText(summaryFromGoogleTranslation, 'http://localhost:5001/translate-in-google', language);
          setGoogleTranslationToFinnish(translationResult.translation);
          break;
        }
      case 'Chat-GPT':
        // Send a POST request to Google Cloud Translation API
        if (language === 'en') {
          translationResult = await getText(input, 'http://localhost:5001/chatgpt-translation', language);
          setChatgptTranslationToEnglish(translationResult.translation);
          break;
        } else {
          translationResult = await getText(summaryFromChatgptTranslation, 'http://localhost:5001/chatgpt-translation', language);
          setChatgptTranslationToFinnish(translationResult.translation);
          break;
        }
      case 'LibreTranslate':
        // Send a POST request to LibreTranslate
        if (language === 'en') {
          translationResult = await getTextLibre(input, language);
          setLibreTranslationToEnglish(translationResult.translatedText);
        break;
        } else {
          translationResult = await getTextLibre(summaryFromLibreTranslation, language);
          setLibreTranslationToFinnish(translationResult.translatedText);
          break;
        }
      case 'Helsinki-NLP/opus-mt':
        // Send a POST request to Helsinki-NLP/opus-mt
        if (language === 'en') {
          translationResult = await getText(input, 'http://localhost:5001/marianmt-fi-en', language);
          setHelsinkiTranslationToEnglish(translationResult.translation);
          break;
        } else {
          translationResult = await getText(summaryFromHelsinkiTranslation, 'http://localhost:5001/marianmt-en-fi', language);
          setHelsinkiTranslationToFinnish(translationResult.translation);
          break;
        }
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
      } else if (translator === 'Chat-GPT') {
        const summaryResult = await getText(chatgptTranslationToEnglish, 'http://localhost:5001/summary');
        setSummaryFromChatgptTranslation(summaryResult.summary);
      } else if (translator === 'LibreTranslate') {
        const summaryResult = await getText(libreTranslationToEnglish, 'http://localhost:5001/summary');
        setSummaryFromLibreTranslation(summaryResult.summary);
      } else if (translator === 'Helsinki-NLP/opus-mt') {
        const summaryResult = await getText(helsinkiTranslationToEnglish, 'http://localhost:5001/summary');
        setSummaryFromHelsinkiTranslation(summaryResult.summary);
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
      {chatgptTranslationToEnglish ? <TextBlock label="Chat-GPT translation from input text:" text={chatgptTranslationToEnglish}/> : null}
      {libreTranslationToEnglish ? <TextBlock label="Libre translation to english from input text:" text={libreTranslationToEnglish}/> : null}
      {helsinkiTranslationToEnglish ? <TextBlock label="Helsinki-NLP translation to english from input text:" text={helsinkiTranslationToEnglish}/> : null}
      <button onClick={handleSummaryClick}>Summarize</button>
      <br/>
      {summaryFromGoogleTranslation ? <TextBlock label="Summary from Google translation:" text={summaryFromGoogleTranslation}/> : null}
      {summaryFromChatgptTranslation ? <TextBlock label="Summary from Chat-GPT translation:" text={summaryFromChatgptTranslation}/> : null}
      {summaryFromLibreTranslation ? <TextBlock label="Summary from Libre translation:" text={summaryFromLibreTranslation}/> : null}
      {summaryFromHelsinkiTranslation ? <TextBlock label="Summary from Helsinki-NLP translation:" text={summaryFromHelsinkiTranslation}/> : null}
      <button onClick={handleTranslateBackClick}>Translate back</button>
      <br/>
      {googleTranslationToFinnish ? <TextBlock label="Google translation back to finnish from summary:" text={googleTranslationToFinnish}/> : null}
      {chatgptTranslationToFinnish ? <TextBlock label="Chat-GPT translation back to finnish from summary:" text={chatgptTranslationToFinnish}/> : null}
      {libreTranslationToFinnish ? <TextBlock label="Libre translation back to finnish from summary:" text={libreTranslationToFinnish}/> : null}
      {helsinkiTranslationToFinnish ? <TextBlock label="Helsinki-NLP translation back to finnish from summary:" text={helsinkiTranslationToFinnish}/> : null}
    </div>
  );
}

export default TestPage;