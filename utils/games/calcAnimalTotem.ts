const zodiacTraits: { [key: string]: string } = {
  쥐띠: "Travailleur et agile, le rat est prudent et économe, symbole de prospérité et de fécondité. Cependant, lorsqu'il s'emporte, il peut foncer sur n'importe qui, donc il doit apprendre à se maîtriser.",
  소띠: "Calme et intelligent, le bœuf est très compétitif et atteint ses objectifs rapidement. Malgré son apparence douce, il est têtu et redoutable lorsqu'il se met en colère.",
  호랑이띠:
    "Le tigre est courageux et passionné, confiant et doté d'un fort leadership. Il est actif et entreprenant mais aussi parfois agressif et perfectionniste.",
  토끼띠:
    "Petit mais vif et sage comme un lapin. Il peut être timide et nerveux, et symbolise la longévité. Sa présence évoque la paix.",
  용띠: "Créature mystique et majestueuse, le dragon symbolise l'autorité et la responsabilité. Aventurier mais parfois arrogant et impulsif.",
  뱀띠: "Le serpent symbolise la prospérité et la fertilité. Sa mue représente le renouveau et il est perçu comme rusé et bavard.",
  말띠: "Le cheval est dynamique et rapide, plein de vitalité. Il est charmant et humoristique mais peut être changeant et dépensier.",
  양띠: "Douce et paisible, la chèvre symbolise la beauté et attire la chance. Cependant, elle peut être plaintive et craintive.",
  원숭이띠:
    "Malicieux mais intelligent et minutieux, le singe est positif et actif, reflétant l'animal le plus proche de l'humain.",
  닭띠: "Le coq symbolise l'intelligence et le courage. Il est habile, vigilant et parfois un peu égoïste.",
  개띠: "Le chien est joyeux et aimé de tous, fidèle et courageux. Il peut être têtu et manquer de maîtrise de soi.",
  돼지띠:
    "Le cochon est généreux, compréhensif et intègre. Il peut toutefois avoir des difficultés à prendre des décisions par lui-même.",
};

/**
 * displayGod(god, index) 올바른 십이지신 값을 한국어와 프랑스어로 출력하는 함수입니다.
 * @param {string} god 한국어 십이지신
 * @param {number} index 인덱스
 */
function displayGod(god: string, index: number) {
  // 프랑스어로 번역된 십이지신 배열입니다. 인자로 받은 인덱스를 이용하여 올바른 값을 찾아냅니다.
  const frenchGodYear = [
    "Année du singe",
    "Année du Coq",
    "Année du chien",
    "Année du cochon",
    "Année du rat",
    "Année du boeuf",
    "Année du tigre",
    " Année du lapin",
    "Année du dragon",
    "Année du serpent",
    "Année du cheval",
    "Année du mouton",
  ];
  const trait = zodiacTraits[god];
  return {
    god: god,
    frenchGod: frenchGodYear[index],
    signification: trait,
  };
}

/**
 * calculate12God(parsed) 사용자의 출생 연도를 이용해 십이지신 값을 찾는 함수입니다.
 * @param {number} parsed 숫자로 변환된 사용자 출생 연도
 */
export function calculate12God(parsed: number) {
  // 출생 연도를 12로 나눈 나머지 값으로 십이지신을 계산해 줍니다.
  const left = parsed % 12; // 모듈로 연산자 이용
  let result;
  switch (left) {
    case 0:
      result = displayGod("원숭이띠", 0);
      break;
    case 1:
      result = displayGod("닭띠", 1);
      break;
    case 2:
      result = displayGod("개띠", 2);
      break;
    case 3:
      result = displayGod("돼지띠", 3);
      break;
    case 4:
      result = displayGod("쥐띠", 4);
      break;
    case 5:
      result = displayGod("소띠", 5);
      break;
    case 6:
      result = displayGod("호랑이띠", 6);
      break;
    case 7:
      result = displayGod("토끼띠", 7);
      break;
    case 8:
      result = displayGod("용띠", 8);
      break;
    case 9:
      result = displayGod("뱀띠", 9);
      break;
    case 10:
      result = displayGod("말띠", 10);
      break;
    case 11:
      result = displayGod("양띠", 11);
      break;
  }
  return result;
}
