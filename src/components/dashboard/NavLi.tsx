import React from "react";
import {
  AllInboxRounded,
  AutoAwesomeMosaicRounded,
  CalendarMonthRounded,
  InsertInvitationRounded,
  SearchRounded,
} from "@mui/icons-material";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function NavLi() {
  const pathname = usePathname().split("/").pop();
  return (
    <div className="flex flex-col gap-1">
      <button className="flex flex-row gap-4 px-2 py-1.5 items-center rounded-lg hover:bg-[#F2EFED]">
        <SearchRounded className="text-gray-500" />
        <div>Search</div>
      </button>
      <Link
        href="/dashboard/inbox"
        className={`flex flex-row gap-4 px-2 py-1.5 items-center rounded-lg ${
          pathname === "inbox" ? "bg-[#CCFBF1]" : "hover:bg-[#F2EFED]"
        }`}
      >
        <AllInboxRounded
          className={`${
            pathname === "inbox" ? "text-emerald-500" : "text-gray-500"
          }`}
        />
        <div>Inbox</div>
      </Link>
      <Link
        href="/dashboard/today"
        className={`flex flex-row gap-4 px-2 py-1.5 items-center rounded-lg ${
          pathname === "today" ? "bg-[#CCFBF1]" : "hover:bg-[#F2EFED]"
        }`}
      >
        <InsertInvitationRounded
          className={`${
            pathname === "today" ? "text-emerald-500" : "text-gray-500"
          }`}
        />
        <div>Today</div>
      </Link>
      <Link
        href="/dashboard/upcoming"
        className={`flex flex-row gap-4 px-2 py-1.5 items-center rounded-lg ${
          pathname === "upcoming" ? "bg-[#CCFBF1]" : "hover:bg-[#F2EFED]"
        }`}
      >
        <CalendarMonthRounded
          className={`${
            pathname === "upcoming" ? "text-emerald-500" : "text-gray-500"
          }`}
        />
        <div>Upcoming</div>
      </Link>
      <Link
        href="/dashboard/filters-labels"
        className={`flex flex-row gap-4 px-2 py-1.5 items-center rounded-lg ${
          pathname === "filters-labels" ? "bg-[#CCFBF1]" : "hover:bg-[#F2EFED]"
        }`}
      >
        <AutoAwesomeMosaicRounded
          className={`${
            pathname === "filters-labels" ? "text-emerald-500" : "text-gray-500"
          }`}
        />
        <div>Filters & Labels</div>
      </Link>
    </div>
  );
}
