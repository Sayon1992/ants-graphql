type Callback = (arg0: number) => void;

export const generateAntWinLikelihoodCalculator = () => {
  const delay = 7000 + Math.random() * 7000;
  const likelihoodOfAntWinning = Math.random();

  return (callback: Callback) => {
    setTimeout(() => {
      callback(likelihoodOfAntWinning);
    }, delay);
  };
};

export const getLoggedResult = (item: string) => {
  return item === 'false' ? false : true;
};
