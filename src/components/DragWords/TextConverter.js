
export const getSentence = text => {
  return text.split(';').map((w, id) => {
    if (w.startsWith('#')) {
      const m = w.match(/#(.*?)#/);
      if (m) {
        return { id, text: m[1], type: 'answer', placed: false, displayed: ''};
      }
    }
    return { id, text: w, type: 'word' };
  });
};

export const getAnswers = text => {
   const wordList = Array.from( new Set(text.split(';')));
   console.log(wordList)
   return wordList.reduce((acc, cur) => {
    if (cur.startsWith('#')) {
      const m = cur.match(/#(.*?)#/);
      if (m) {
          return acc.concat(m[1]);
      }
    }
    return acc;
  }, []);
};
