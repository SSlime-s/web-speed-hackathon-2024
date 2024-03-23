function isHiragana(ch: string): boolean {
  return /^[\u3041-\u3096]$/.test(ch);
}
function hiraganaToKatakana(ch: string): string {
  return String.fromCharCode(ch.charCodeAt(0) + 0x60);
}

function normalize(str: string): string {
  return str
    .split('')
    .map((ch) => {
      if (isHiragana(ch)) {
        return hiraganaToKatakana(ch);
      }
      return ch;
    })
    .join('')
    .normalize('NFKC');
}

type Params = {
  query: string;
  target: string;
};

// ひらがな・カタカナ・半角・全角を区別せずに文字列が含まれているかを調べる
export function isContains({ query, target }: Params): boolean {
  return normalize(target).includes(normalize(query));
}
