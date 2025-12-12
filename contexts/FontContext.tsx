import * as Font from 'expo-font';
import React, { createContext, useEffect, useState } from 'react';

interface FontContextType {
  font: string;
  setFont: (lng: string) => void;
  isReady: boolean;
  setIsReady: (ready: boolean) => void;
}

export const FontContext = createContext<FontContextType>({
  font: 'default', 
  setFont: () => {},
  isReady: false,
  setIsReady: () => {},
});

export const FontProvider = ({ children }: { children: React.ReactNode }) => {
  const [font, setFont] = useState('default');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        cuteFont: require('../assets/fonts/ChangwonDangamRound.otf'),
        traditionalFont: require('../assets/fonts/Shilla_Culture(M).otf'),
      });
      setIsReady(true);
    };
    loadFonts();
  }, []);

  const changeFont = (lng: string) => {
    setFont(lng);
  };

  return (
    <FontContext.Provider value={{ font, setFont: changeFont, isReady, setIsReady }}>
      {children}
    </FontContext.Provider>
  );
};
