export const events = [
    {
      description:"Walk dog",
      time: Date.now() + (24 * 60 * 60 * 1000)
    },
    {
      description:"Walk cat",
      time: Date.now() + (25 * 60 * 60 * 1000)
    },
    {
      description:"Walk dog",
      time: Date.now() + (2 * 24 * 60 * 60 * 1000)
    },
    {
      description:"Walk cat",
      time: Date.now() + (2 * 25 * 60 * 60 * 1000)
    }
  ];
  export const month_lookup = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  export const day_of_week_lookup = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];

export function get_first_of_month_time()
{
   const now = new Date(Date.now());
   now.setDate(1);
   return now;
}

export function now()
{
    return new Date(Date.now());
}