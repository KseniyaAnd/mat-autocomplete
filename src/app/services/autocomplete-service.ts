import { Injectable } from '@angular/core';
import {Country} from '../components/mat-autocomplete/mat-autocomplete';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteService {
  Countries: Country[] = [
    {
      "AF": { "en": "Afghanistan", "ru": "Афганистан" },
      "AL": { "en": "Albania", "ru": "Албания" },
      "DZ": { "en": "Algeria", "ru": "Алжир" },
      "AD": { "en": "Andorra", "ru": "Андорра" },
      "AO": { "en": "Angola", "ru": "Ангола" },
      "AG": { "en": "Antigua and Barbuda", "ru": "Антигуа и Барбуда" },
      "AR": { "en": "Argentina", "ru": "Аргентина" },
      "AM": { "en": "Armenia", "ru": "Армения" },
      "AU": { "en": "Australia", "ru": "Австралия" },
      "AT": { "en": "Austria", "ru": "Австрия" },
      "AZ": { "en": "Azerbaijan", "ru": "Азербайджан" },
      "BS": { "en": "Bahamas", "ru": "Багамы" },
      "BH": { "en": "Bahrain", "ru": "Бахрейн" },
      "BD": { "en": "Bangladesh", "ru": "Бангладеш" },
      "BB": { "en": "Barbados", "ru": "Барбадос" },
      "BY": { "en": "Belarus", "ru": "Беларусь" },
      "BE": { "en": "Belgium", "ru": "Бельгия" },
      "BZ": { "en": "Belize", "ru": "Белиз" },
      "BJ": { "en": "Benin", "ru": "Бенин" },
      "BT": { "en": "Bhutan", "ru": "Бутан" },
      "BO": { "en": "Bolivia", "ru": "Боливия" },
      "BA": { "en": "Bosnia and Herzegovina", "ru": "Босния и Герцеговина" },
      "BW": { "en": "Botswana", "ru": "Ботсвана" },
      "BR": { "en": "Brazil", "ru": "Бразилия" },
      "BN": { "en": "Brunei", "ru": "Бруней" },
      "BG": { "en": "Bulgaria", "ru": "Болгария" },
      "BF": { "en": "Burkina Faso", "ru": "Буркина-Фасо" },
      "BI": { "en": "Burundi", "ru": "Бурунди" },
      "KH": { "en": "Cambodia", "ru": "Камбоджа" },
      "CM": { "en": "Cameroon", "ru": "Камерун" },
      "CA": { "en": "Canada", "ru": "Канада" },
      "CV": { "en": "Cape Verde", "ru": "Кабо-Верде" },
      "CF": { "en": "Central African Republic", "ru": "Центральноафриканская Республика" },
      "TD": { "en": "Chad", "ru": "Чад" },
      "CL": { "en": "Chile", "ru": "Чили" },
      "CN": { "en": "China", "ru": "Китай" },
      "CO": { "en": "Colombia", "ru": "Колумбия" },
      "KM": { "en": "Comoros", "ru": "Коморы" },
      "CD": { "en": "Congo (DRC)", "ru": "Демократическая Республика Конго" },
      "CG": { "en": "Congo (Republic)", "ru": "Республика Конго" },
      "CR": { "en": "Costa Rica", "ru": "Коста-Рика" },
      "HR": { "en": "Croatia", "ru": "Хорватия" },
      "CU": { "en": "Cuba", "ru": "Куба" },
      "CY": { "en": "Cyprus", "ru": "Кипр" },
      "CZ": { "en": "Czech Republic", "ru": "Чехия" },
      "DK": { "en": "Denmark", "ru": "Дания" },
      "DJ": { "en": "Djibouti", "ru": "Джибути" },
      "DM": { "en": "Dominica", "ru": "Доминика" },
      "DO": { "en": "Dominican Republic", "ru": "Доминиканская Республика" },
      "EC": { "en": "Ecuador", "ru": "Эквадор" },
      "EG": { "en": "Egypt", "ru": "Египет" },
      "SV": { "en": "El Salvador", "ru": "Сальвадор" },
      "GQ": { "en": "Equatorial Guinea", "ru": "Экваториальная Гвинея" },
      "ER": { "en": "Eritrea", "ru": "Эритрея" },
      "EE": { "en": "Estonia", "ru": "Эстония" },
      "SZ": { "en": "Eswatini", "ru": "Эсватини" },
      "ET": { "en": "Ethiopia", "ru": "Эфиопия" },
      "FJ": { "en": "Fiji", "ru": "Фиджи" },
      "FI": { "en": "Finland", "ru": "Финляндия" },
      "FR": { "en": "France", "ru": "Франция" },
      "GA": { "en": "Gabon", "ru": "Габон" },
      "GM": { "en": "Gambia", "ru": "Гамбия" },
      "GE": { "en": "Georgia", "ru": "Грузия" },
      "DE": { "en": "Germany", "ru": "Германия" },
      "GH": { "en": "Ghana", "ru": "Гана" },
      "GR": { "en": "Greece", "ru": "Греция" },
      "GD": { "en": "Grenada", "ru": "Гренада" },
      "GT": { "en": "Guatemala", "ru": "Гватемала" },
      "GN": { "en": "Guinea", "ru": "Гвинея" },
      "GW": { "en": "Guinea-Bissau", "ru": "Гвинея-Бисау" },
      "GY": { "en": "Guyana", "ru": "Гайана" },
      "HT": { "en": "Haiti", "ru": "Гаити" },
      "HN": { "en": "Honduras", "ru": "Гондурас" },
      "HU": { "en": "Hungary", "ru": "Венгрия" },
      "IS": { "en": "Iceland", "ru": "Исландия" },
      "IN": { "en": "India", "ru": "Индия" },
      "ID": { "en": "Indonesia", "ru": "Индонезия" },
      "IR": { "en": "Iran", "ru": "Иран" },
      "IQ": { "en": "Iraq", "ru": "Ирак" },
      "IE": { "en": "Ireland", "ru": "Ирландия" },
      "IL": { "en": "Israel", "ru": "Израиль" },
      "IT": { "en": "Italy", "ru": "Италия" },
      "JM": { "en": "Jamaica", "ru": "Ямайка" },
      "JP": { "en": "Japan", "ru": "Япония" },
      "JO": { "en": "Jordan", "ru": "Иордания" },
      "KZ": { "en": "Kazakhstan", "ru": "Казахстан" },
      "KE": { "en": "Kenya", "ru": "Кения" },
      "KI": { "en": "Kiribati", "ru": "Кирибати" },
      "KR": { "en": "South Korea", "ru": "Южная Корея" },
      "KW": { "en": "Kuwait", "ru": "Кувейт" },
      "KG": { "en": "Kyrgyzstan", "ru": "Киргизия" },
      "LA": { "en": "Laos", "ru": "Лаос" },
      "LV": { "en": "Latvia", "ru": "Латвия" },
      "LB": { "en": "Lebanon", "ru": "Ливан" },
      "LS": { "en": "Lesotho", "ru": "Лесото" },
      "LR": { "en": "Liberia", "ru": "Либерия" },
      "LY": { "en": "Libya", "ru": "Ливия" },
      ...
    }

  ];

  constructor() { }

  filterCountry(name: string): Country[] {
    const filterValue = name.toLowerCase();

    return this.Countries.filter(
      option => option.name.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
