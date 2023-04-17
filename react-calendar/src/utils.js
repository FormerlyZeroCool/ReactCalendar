export const events = [
    {
      description:"Walk dog",
      sub_events: [
        "Put on leash",
        "Open door",
        "Walk",
        "Pickup Poo"
      ],
      time: Date.now() + (24 * 60 * 60 * 1000)
    },
    {
      description:"Walk cat",
      sub_events: [
        "Put on leash",
        "muzzle cat",
        "Walk",
        "Pickup Sandy Poo"
      ],
      time: Date.now() + (25 * 60 * 60 * 1000)
    },
    {
      description:"Walk dog",
      sub_events: [],
      time: Date.now() + (2 * 24 * 60 * 60 * 1000)
    },
    {
      description:"Walk cat",
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

export function days_events(events, today, starting_index = 0)
{
    today = new Date(today);
    today.setHours(0, 0, 0, 0);
    const start_day = today;
    const end_day = new Date(today);
    end_day.setHours(23, 59, 59);
    const current_day_events = [];
    //merge events with days
    while(events.length > starting_index && between_time(new Date(events[starting_index].time), start_day, end_day))
    {
      current_day_events.push(events[starting_index++]);
    }
    return [current_day_events, starting_index];
}