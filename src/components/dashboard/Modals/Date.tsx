import { useSelectedDateStore } from "@/components/store/selectedDate";

export default function MyDatePicker() {
  const { selectedDate, setSelectedDate } = useSelectedDateStore();

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    if (!isNaN(date.getTime())) {
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
      }).format(date);
      setSelectedDate(formattedDate);
    }
  };

  return (
    <div className="outline-none ring-1 h-7 group cursor-pointer hover:bg-emerald-200 pr-3 pl-2 ring-gray-200 rounded-md flex justify-center flex-row gap-1 items-center">
      <input
        type="date"
        className="[&::-webkit-datetime-edit]:hidden group-hover:bg-emerald-200 w-full h-full cursor-pointer"
        onChange={handleDateChange}
        required
      />

      <span className="text-sm text-gray-700 group-hover:bg-emerald-200 text-nowrap">
        {selectedDate || "Select Date"}
      </span>
    </div>
  );
}
