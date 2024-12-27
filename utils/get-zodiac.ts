import dayjs from "dayjs";

const getHoroscope = (birthdate: any) => {
  const date = dayjs(birthdate);
  const month = date.month() + 1;
  const day = date.date();
  const horoscopes = [
    { name: "Capricorn", start: "12-22", end: "01-19" },
    { name: "Aquarius", start: "01-20", end: "02-18" },
    { name: "Pisces", start: "02-19", end: "03-20" },
    { name: "Aries", start: "03-21", end: "04-19" },
    { name: "Taurus", start: "04-20", end: "05-20" },
    { name: "Gemini", start: "05-21", end: "06-20" },
    { name: "Cancer", start: "06-21", end: "07-22" },
    { name: "Leo", start: "07-23", end: "08-22" },
    { name: "Virgo", start: "08-23", end: "09-22" },
    { name: "Libra", start: "09-23", end: "10-22" },
    { name: "Scorpio", start: "10-23", end: "11-21" },
    { name: "Sagittarius", start: "11-22", end: "12-21" },
  ];

  for (const horoscope of horoscopes) {
    const [startMonth, startDay] = horoscope.start.split("-").map(Number);
    const [endMonth, endDay] = horoscope.end.split("-").map(Number);

    if (
      (month === startMonth && day >= startDay) ||
      (month === endMonth && day <= endDay)
    ) {
      return horoscope.name;
    }
  }
  return "";
};
const getZodiac = (birthdate: any) => {
  const year = dayjs(birthdate).year();
  const zodiacs = [
    "Monkey",
    "Rooster",
    "Dog",
    "Pig",
    "Rat",
    "Ox",
    "Tiger",
    "Rabbit",
    "Dragon",
    "Snake",
    "Horse",
    "Goat",
  ];
  return zodiacs[year % 12];
};

export { getHoroscope, getZodiac };
