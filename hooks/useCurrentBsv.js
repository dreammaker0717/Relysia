export const useCurrentBsv = (balance) => {
  return balance && typeof balance.dollarBal === 'number'
    ? Number.parseFloat(balance?.bsvBal / 100000000).toFixed(8)
    : 0
}
