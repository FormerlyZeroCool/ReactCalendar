export const events = [
    {
      description:"Walk dog to the place",
      sub_events: [
        "Put on leash",
        "Open door",
        "Walk",
        "Pickup Poo"
      ],
      time: Date.now() + (60 * 60 * 1000)
    },
    {
      description:"Walk cat",
      sub_events: [
        "Put on leash",
        "muzzle cat",
        "Walk",
        "Pickup Sandy Poo"
      ],
      time: Date.now() + (2 * 60 * 60 * 1000)
    },
    {
      description:"Walk demon",
      sub_events: [],
      time: Date.now() + (2 * 24 * 60 * 60 * 1000)
    },
    {
      description:"Walk fuzzy",
      sub_events: [],
      time: Date.now() + (4 * 25 * 60 * 60 * 1000)
    }
  ];
  events.sort((a, b) => {
    return a.time - b.time;
  })
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

  export function get_first_of_month_time(date = Date.now())
  {
     const now = new Date(date);
     now.setDate(1);
     now.setHours(0, 0, 0, 0);
     return now;
  }
  export function get_first_of_week_time(date = Date.now())
  {
     const now = new Date(date);
     now.setDate(now.getDate() - now.getDay() + 1);
     now.setHours(0, 0, 0, 0);
     return now;
  }
  export function between_time(date, start, end)
  {
    return date.getTime() >= start.getTime() && date.getTime() <= end.getTime();
  }

export function now()
{
    return new Date(Date.now());
}

export function days_in_month(year, month) 
{
    return new Date(year, month, 0).getDate();
} 