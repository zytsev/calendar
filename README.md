Requirements: React Calendar Component
The goal is to create a component that displays a teacher’s schedule. The calendar should be divided into 30-minute slots for the entire day. Slots outside the teacher’s schedule (white color) should not be interactive. Slots within the teacher’s schedule (light green) should have a duration of 30 minutes and be interactive (for example, they should display an alert with the slot’s time). Lessons (red color) can be 30, 60, or 90 minutes long, are presented as a single block, and should also be interactive (for example, display an alert with the lesson’s time).

1. Views
   • Desktop:
   o Week view (7 days).
   • Mobile:
   o Day view (1 day).
   o 3-day view (3 days).
   • Switch views depending on screen size.

---

2. Navigation
   • Controls: < >
   o < → moves view range back (by 1 day, 3 days, or 1 week depending on active view).
   o > → moves forward the same way.

---

3. Time Slots
   • Granularity: configurable (default 30 minutes).
   • Visible range: e.g., 00:00–24:00.
   • Each slot maps to one or more grid cells.
   • Each cell can be:
   o Not available (e.g., outside working hours, white).
   o Available (clickable, styled green).
   o Booked (clickable, styled red with student name).********\*\*********\_\_\_\_********\*\*********
4. Layout & Responsiveness
   • CSS Grid structure:
   o Columns = days in view.
   o Rows = time slots.
   o First column = time labels.
   • Desktop:
   o grid-cols-[time + 7 days]
   • Mobile:
   o Switch to grid-cols-[time + 1/3 days] with horizontal scroll if needed.
   • Use overflow-x-auto for small screens.

---

5. Interaction
   • Click Available slot → triggers callback (e.g., onSlotSelect(slot)).
   • Hover → highlight cell.
   • Booked slot should show tooltip or inline info (student name, duration) on click show context menu
   • Booked By Other -> no interaction

---

6. Data Structure
   Input prop:
   Type Schedule = [
   {
   "startTime": "2025-08-23T22:30:00+00:00",
   "endTime": "2025-08-24T02:29:59+00:00"
   },
   ]
   type Lesson = [
   {
   "id": 52,
   "duration": 60,
   "startTime": "2025-08-25T13:30:00+00:00",
   "endTime": "2025-08-25T14:29:59+00:00",
   “student”: “Alex”
   },
   {…}]
   type CalendarProps = {
   view: "day" | "3days" | "week";
   startDate: Date; // start of current view
   schedule:[]
   lessons: [];
   onSlotSelect?: (slot: { startTime: Date; endTime: Date }) => void;
   };

---

7. Styling
   • TailwindCSS utility classes.
   • Color coding:
   o bg-green-200 → available.
   o bg-red-300 → booked.
   o bg-gray-100 → blocked/off-hours.
   • Responsive typography for day labels.

---
