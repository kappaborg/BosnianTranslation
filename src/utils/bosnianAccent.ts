/**
 * Boşnak dili aksanı ve telaffuz özellikleri için yardımcı fonksiyonlar
 * Bu dosya, Boşnak diline özgü karakter, telaffuz ve aksanları sağlar
 */

/**
 * Boşnak alfabesindeki özel karakterler
 */
export const bosnianSpecialChars: { [key: string]: string } = {
  c: 'ts',  // c = ts sound
  č: 'ch',  // č = ch as in "church"
  ć: 'ch',  // ć = softer ch sound
  dž: 'j',  // dž = j as in "jungle"
  đ: 'dj',  // đ = like j in "jeans" 
  j: 'y',   // j = y as in "yes"
  lj: 'ly', // lj = similar to "million"
  nj: 'ny', // nj = similar to "canyon"
  š: 'sh',  // š = sh as in "shoe"
  ž: 'zh',  // ž = like s in "pleasure"
};

/**
 * Boşnak diline özgü yaygın kelimeler ve telaffuzları
 */
export const commonBosnianWords: { [key: string]: { translation: string; pronunciation: string } } = {
  'zdravo': { translation: 'hello', pronunciation: 'zdrah-voh' },
  'dobar dan': { translation: 'good day', pronunciation: 'doh-bar dan' },
  'hvala': { translation: 'thank you', pronunciation: 'hva-la' },
  'molim': { translation: 'please', pronunciation: 'moh-leem' },
  'da': { translation: 'yes', pronunciation: 'da' },
  'ne': { translation: 'no', pronunciation: 'neh' },
  'dobro': { translation: 'good', pronunciation: 'dob-roh' },
  'loše': { translation: 'bad', pronunciation: 'loh-sheh' },
  'kako si': { translation: 'how are you', pronunciation: 'ka-koh see' },
  'ja sam': { translation: 'I am', pronunciation: 'ya sahm' },
  'kahva': { translation: 'coffee', pronunciation: 'kah-va' }, // Özel bir Boşnakça kelime (Sırpça'da "kafa")
  'lahko noć': { translation: 'good night', pronunciation: 'lah-koh noh-ch' },
  'džamija': { translation: 'mosque', pronunciation: 'ja-mee-ya' },
};

/**
 * Boşnak dilindeki özel bazı karakteristik kelimeler
 * Boşnakça'ya özgü, Sırpça ve Hırvatça'dan farklı kelimeler
 */
export const uniqueBosnianWords: { [key: string]: { translation: string; usage: string } } = {
  // Arapça'dan gelen kelimeler
  'Allah': { translation: 'God', usage: 'Religious term' },
  'mahala': { translation: 'neighborhood, quarter', usage: 'Urban areas' },
  'sebilj': { translation: 'public fountain', usage: 'Architecture' },
  'ćilim': { translation: 'carpet, rug', usage: 'Household' },
  'barjak': { translation: 'flag', usage: 'General' },
  'hadžija': { translation: 'person who has made the pilgrimage to Mecca', usage: 'Religious term' },
  'amidža': { translation: 'uncle', usage: 'Family terms' },
  'kann': { translation: 'inn, hostel', usage: 'Historical' },
  'bula': { translation: 'Muslim religious teacher (female)', usage: 'Religious term' },
  
  // Osmanlı Türkçesi'nden gelen kelimeler
  'bašča': { translation: 'garden', usage: 'Nature' },
  'sokak': { translation: 'street', usage: 'Urban' },
  'komšija': { translation: 'neighbor', usage: 'Social' },
  'čaršija': { translation: 'bazaar, marketplace', usage: 'Commercial' },
  'džezva': { translation: 'small pot for making Turkish/Bosnian coffee', usage: 'Household' },
};

/**
 * Boşnak telaffuzuna uygun şekilde metni dönüştürür
 * @param text Dönüştürülecek metin
 * @returns Boşnak telaffuzuna uygun dönüştürülmüş metin
 */
export function improveBosnianText(text: string): string {
  if (!text) return text;
  
  // Boşnak dilindeki özel karakterleri orijinal hallerine dönüştürme
  let improvedText = text
    .replace(/c(?=[aeiou])/gi, 'c') // Doğru c karakteri
    .replace(/ch/gi, 'č')
    .replace(/sh/gi, 'š')
    .replace(/zh/gi, 'ž')
    .replace(/dj/gi, 'đ')
    .replace(/j(?=[aeiou])/gi, 'dž') // ses uyumuna göre düzeltme
    
    // Yaygın kelime düzeltmeleri
    .replace(/kafa/gi, 'kahva') // Sırpça -> Boşnakça
    .replace(/hleb/gi, 'hljeb') // Sırpça -> Boşnakça
    .replace(/uticaj/gi, 'utjecaj') // Sırpça -> Boşnakça
    .replace(/opšti/gi, 'opći'); // Sırpça -> Boşnakça

  return improvedText;
}

/**
 * Özel Boşnak telaffuzunu vurgulayan fonksiyon
 * @param text Boşnakça metin
 * @returns Telaffuz ipuçları eklenmiş metin
 */
export function addBosnianPronunciationGuide(text: string): string {
  if (!text) return text;
  
  let words = text.split(' ');
  const result = words.map(word => {
    // Yaygın kelimeler içinde varsa, telaffuz ekle
    const lowerWord = word.toLowerCase();
    if (commonBosnianWords[lowerWord]) {
      return `${word} [${commonBosnianWords[lowerWord].pronunciation}]`;
    }
    return word;
  });
  
  return result.join(' ');
}

/**
 * MyMemory API için Boşnakça çeviri parametrelerini hazırlar
 * @param text Çevrilecek metin
 * @param langPair Dil çifti
 * @returns URL parametreleri
 */
export function prepareBosnianTranslationParams(text: string, langPair: string): URLSearchParams {
  const params = new URLSearchParams();
  params.append('q', text);
  params.append('langpair', langPair);
  params.append('de', 'yourname@bosniatrans.com'); // E-posta (Rate-limit için)
  params.append('mt', '1'); // Makine çevirisi kullan
  
  // Boşnak dilindeki yaygın oryantalist kelimelerini koruma ayarı
  params.append('onlyprivate', '0'); // Herkese açık bellek kullan
  
  return params;
}

/**
 * Boşnakça çeviri sonucunu iyileştirir
 * @param translatedText Çevrilmiş ham metin
 * @returns İyileştirilmiş Boşnakça metin
 */
export function enhanceBosnianTranslation(translatedText: string): string {
  if (!translatedText) return translatedText;
  
  // Metni iyileştir
  let enhancedText = improveBosnianText(translatedText);
  
  // Boşnakça'ya özgü özel kelimeleri vurgula
  Object.keys(uniqueBosnianWords).forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    if (regex.test(enhancedText)) {
      // Eğer bu özel kelime metinde varsa, vurgula
      enhancedText = enhancedText.replace(
        regex, 
        `${word}` // Özel kelimeyi vurgula
      );
    }
  });
  
  return enhancedText;
} 