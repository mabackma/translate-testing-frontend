const TextBlock = ({translator, setTranslator}) => {
  const handleTranslatorChange = (selectedTranslator) => {
    setTranslator(selectedTranslator);
  };

  return (
    <div>
      <div>
        <button onClick={() => handleTranslatorChange('Google Cloud Translation API')}>Google</button>
        <button onClick={() => handleTranslatorChange('Chat-GPT')}>Chat-GPT</button>
        <button onClick={() => handleTranslatorChange('LibreTranslate')}>LibreTranslate</button>
        <button onClick={() => handleTranslatorChange('Helsinki-NLP/opus-mt')}>Helsinki-NLP</button>
      </div>
      <p>{translator ? `Selected Translator: ${translator}` : 'Select Translator'}</p>
    </div>
  );
}

export default TextBlock;