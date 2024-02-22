export const getText = async (text, address, targetLanguage) => {
  const response = await fetch(address, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text, targetLanguage })
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return data;
}

export const getTextLibre = async (text, language) => {
  const response = await fetch('http://localhost:5000/translate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      q: text,
      source: "auto",
      target: language,
      format: "text",
      api_key: ""
    }),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return data;
}