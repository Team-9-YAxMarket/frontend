export const setEfficiencyStatus = (userProgress) => {
    if (userProgress === 0) {
      return '#F3F0E9';
    } else if (userProgress > 0 && userProgress < 51) {
      return '#FF5639';
    } else if (userProgress >= 51 && userProgress < 71) {
      return '#FFA12A';
    } else if (userProgress >= 71 && userProgress <= 100) {
      return '#2AAD2E'
    } else if (userProgress > 100) {
      return '#8923D1';
    }
  };

  export const getBackgroundColor = (pack) => {
    
     pack = pack.toLowerCase()
  
    if (pack.includes('yma')) {
      return '#FF3C3C';
    } else if (pack.includes('ymf')) {
      return '#F29528';
    } else if (pack.includes('myf')) {
      return '#A75FC9';
    } else if (pack.includes('ymc')) {
      return '#336D57';
    } else if (pack.includes('mya')) {
      return '#F55B89';
    } else if (pack.includes('myb')) {
      return '#A3353A';
    } else if (pack.includes('myc')) {
      return '#54B7D6';
    } else if (pack.includes('myd')) {
      return '#ECC62E';
    } else if (pack.includes('mye')) {
      return '#7B6D35';
    } else {
      return '#676764'; 
    }
  };
