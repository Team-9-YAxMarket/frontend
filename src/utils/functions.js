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