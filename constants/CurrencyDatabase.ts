import type { Country } from "@/types/Country";

type CurrencyInfo = {
  currency: string;
  isoCode: string;
  countries: Country[];
};

class CurrencyDatabase {
  private byCurrency: Map<string, CurrencyInfo>;
  private byCountry: Map<string, Country>;
  private allCountries: Country[];

  constructor(countries: Country[]) {
    this.byCurrency = new Map();
    this.byCountry = new Map();
    this.allCountries = [...countries];

    for (const country of countries) {
      this.byCountry.set(country.name.toLowerCase(), country);

      if (!this.byCurrency.has(country.currency)) {
        this.byCurrency.set(country.currency, {
          currency: country.currency,
          isoCode: country.isoCode,
          countries: [],
        });
      }
      this.byCurrency.get(country.currency)?.countries.push(country);
    }
  }

  getAllCountries() {
    return this.allCountries;
  }

  // O(1) lookups
  getCountriesByCurrency(currency: string): Country[] | undefined {
    return this.byCurrency.get(currency)?.countries;
  }

  getCountryByName(name: string): Country | undefined {
    return this.byCountry.get(name);
  }

  search(query: string, callback: (results: Country[]) => void) {
    const lowercaseQuery = query.toLowerCase();

    if (!query.trim()) {
      callback(this.allCountries);
    }

    let matches: Country[] = [];

    // Immediate O(1) currency code matches
    const currencyMatches = this.byCurrency.get(lowercaseQuery.toUpperCase());
    if (currencyMatches) {
      matches = currencyMatches.countries;
      callback(matches);
    }

    const countryMatches = this.byCountry.get(lowercaseQuery);
    if (countryMatches) {
      matches.push(countryMatches);
      callback(matches);
    }

    // Full search in next tick
    setTimeout(() => {
      const additionalMatches = new Set<Country>();

      this.allCountries.forEach((country) => {
        if (
          country.name.toLowerCase().includes(lowercaseQuery) ||
          country.currency.toLowerCase().includes(lowercaseQuery) ||
          country.isoCode.toLowerCase().includes(lowercaseQuery)
        ) {
          additionalMatches.add(country);
        }
      });

      callback(Array.from(additionalMatches));
    }, 0);
  }
}

export default CurrencyDatabase;

//FIXME : Search should return a list of countries instead of the names
