
export const getSentence = text => {
  return text.split('~').map((w, id) => {
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
   const wordList = Array.from( new Set(text.split('~')));

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

export function decodeDiacritics(jsonString) {
  const diacriticsMap = {
      '\\u0103': 'ă',
      '\\u00E2': 'â',
      '\\u0219': 'ș',
      '\\u021B': 'ț',
      '\\u00EE': 'î'
  };

  // console.log(jsonString)
  return jsonString.replace(/\\u(\w{4})/g, (match, grp) => {
      const replacement = diacriticsMap[`\\u${grp}`];
      return replacement ? replacement : match;
  });
}
