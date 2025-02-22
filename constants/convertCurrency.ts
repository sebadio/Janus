import { CountryCurrencyRate } from "@/app/converter";

function convertCurrency(
  amount: number,
  sourceCurrency: CountryCurrencyRate,
  targetCurrency: CountryCurrencyRate
): number {
  const amountInUSD = amount / sourceCurrency.rate;
  const convertedAmount = amountInUSD * targetCurrency.rate;

  console.log(
    ` ${amount} ${sourceCurrency.currency} = ${convertedAmount} ${targetCurrency.currency}`
  );
  return convertedAmount;
}

export default convertCurrency;
