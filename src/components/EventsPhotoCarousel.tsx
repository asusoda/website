import { useEffect, useState } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  parseISO,
} from "date-fns";

interface CalendarEvent {
  id: string;
  name: string;
  location: string;
  description: string | null;
  start: string;
  end: string;
  url?: string;
}

function EventsPhotoCarousel({
  setSelectedEvent,
}: {
  setSelectedEvent: (event: CalendarEvent | null) => void;
}) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://api.thesoda.io/api/calendar/soda/events");
      const data = await response.json();

      if (data?.status === "success" && Array.isArray(data.events)) {
        const formattedEvents = data.events.map(
          (event: {
            id: string;
            title: string;
            location?: string;
            description?: string;
            start: string;
            end: string;
            url?: string;
          }) => ({
            id: event.id,
            name: event.title,
            location: event.location || "No location provided",
            description: event.description || "No description available",
            start: event.start,
            end: event.end,
            url: event.url,
          })
        );
        setEvents(formattedEvents);
      } else {
        console.log("No events found, using dummy data");
      }
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const goToToday = () => setCurrentDate(new Date());

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currentMonthStr = format(currentDate, "MMMM yyyy");

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const startDayOffset = monthStart.getDay();

  const calendarDays = [];
  for (let i = 0; i < startDayOffset; i++) {
    calendarDays.push(null);
  }
  calendarDays.push(...daysInMonth);

  const getEventsForDay = (day: Date | null) => {
    if (!day) return [];
    return events.filter((event) => isSameDay(parseISO(event.start), day));
  };

  const isCurrentDay = (day: Date | null) => {
    if (!day) return false;
    return isSameDay(day, new Date());
  };

  return (
    <div className="dark cal-shadow md:mt-0 mt-14 md:mx-auto bg-[#ffffff0f] shadow-xl text-gray-300 p-4 w-full rounded-lg relative">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-medium">{currentMonthStr}</h1>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={handlePrevMonth} className="hover:bg-[#373737] p-1 rounded">
            <ChevronLeft size={20} />
          </button>
          <button onClick={goToToday} className="hover:bg-[#373737] px-3 py-1 rounded">
            Today
          </button>
          <button onClick={handleNextMonth} className="hover:bg-[#373737] p-1 rounded">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px">
        {isLoading ? (
          <div className="col-span-7">
            <Skeleton className="dark fade-in w-[100%] min-h-[463px] bg-gray-300 rounded" />
          </div>
        ) : (
          <>
            {days.map((day) => (
              <div key={day} className="p-2 text-sm text-gray-500">
                {day}
              </div>
            ))}
            {(() => {
              const totalCells = 42;
              const filledCalendarDays = [...calendarDays];
              while (filledCalendarDays.length < totalCells) {
                filledCalendarDays.push(null);
              }
              return filledCalendarDays.map((day, index) => {
                const dayEvents = day ? getEventsForDay(day) : [];
                const hasEvents = dayEvents.length > 0;
                return (
                  <div
                    key={index}
                    className={`w-full h-[70px] p-2 relative rounded-sm ${
                      isCurrentDay(day) ? "ring-1 ring-red-500 ring-offset-0" : ""
                    } ${hasEvents ? "bg-soda-blue hover:bg-blue-900 transition-all cursor-pointer" : ""}`}
                    onClick={() => (hasEvents ? setSelectedEvent(dayEvents[0]) : null)}
                  >
                    {day && (
                      <>
                        <span className="text-sm fade-in">{format(day, "d")}</span>
                        <div className="overflow-y-auto">
                          {dayEvents.map((evt, eventIndex) => (
                            <div key={eventIndex} className="mt-1 fade-in rounded p-1 text-xs ">
                              <div className="flex fade-in items-center gap-1 truncate">
                                <span className="truncate md:flex hidden">{evt.name}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                );
              });
            })()}
          </>
        )}
      </div>

      <button
        className="absolute bottom-4 right-4 bg-[#ffffff0f] hover:bg-[#373737] text-sm text-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2 transition-all"
        onClick={() =>
          window.open(
            "https://calendar.google.com/calendar/embed?src=c_9d4bb8cc4eb0a947ef07bb5d2a2133404bbd2a186814274013f02d2709f213af%40group.calendar.google.com&ctz=America%2FPhoenix",
            "_blank"
          )
        }
      >
        <Calendar size={16} />
        Add to Calendar
      </button>
    </div>
  );
}

export default EventsPhotoCarousel;
