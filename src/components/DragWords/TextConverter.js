
export const getSentence = text => {
  return text.split(';').map((w, id) => {
    if (w.startsWith('<')) {
      const m = w.match(/[a-zA-Z0-9\sșȘțȚâÂîÎăĂ]+/);
      return { id, text: m[0], type: 'answer', placed: false, displayed: ''};
    }
    return { id, text: w, type: 'word' };
  });
};
export const getAnswers = text => {
   const wordList = Array.from( new Set(text.split(';')));
   return wordList.reduce((acc, cur) => {
    if (cur.startsWith('<')) {
      const m = cur.match(/[a-zA-Z0-9\sșȘțȚâÂîÎăĂ]+/);
      return acc.concat(m[0]);
    }
    return acc;
  }, []);
};
