export interface KoreanWithGameProps {
  id: number;
  korean: string;
  pronounciation: string;
  signification: string;
}

export interface wordsData {
  data: KoreanWithGameProps[];
}