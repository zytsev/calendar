import { generateWeeklyTimeRanges } from '@/service/utils';
import { useEffect, useState } from 'react';
import DialogBooking from './dialogBooking';

interface DayProps {
    title: string;
    interval: number;
    numberDayOfWeek: number;
    numberOfSlots: number;
}
export interface BookingData {
    startTimeBooking: number;
    student: string;
    endTimeBooking: number;
}
export const Day = ({ title, interval, numberDayOfWeek, numberOfSlots }: DayProps) => {
    const [open, setOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
    const [bookingData, setBookingData] = useState<BookingData[]>(() => {
        const saved = localStorage.getItem(`calendar-${numberDayOfWeek}`);
        return saved ? JSON.parse(saved) : [];
    });

    const slotsOfDay = generateWeeklyTimeRanges(interval, numberDayOfWeek);

    if (bookingData.length > 0) {
        bookingData.forEach((slot) => {
            slotsOfDay.forEach((el) => {
                if (el.startTime >= slot.startTimeBooking && el.endTime <= slot.endTimeBooking) {
                    el.isBooking = true;
                    el.student = slot.student;
                    el.startTimeBooking = slot.startTimeBooking;
                    el.endTimeBooking = slot.endTimeBooking;
                }
            });
        });
    }

    useEffect(() => {
        localStorage.setItem(`calendar-${numberDayOfWeek}`, JSON.stringify(bookingData));
    }, [bookingData, numberDayOfWeek]);
    return (
        <div className='schedule-grid' style={{ gridTemplateRows: `40px repeat(${numberOfSlots}, 30px)` }}>
            <div className='day-header'>{title}</div>
            {slotsOfDay.map((el) => (
                <div
                    key={el.id}
                    data-type={el.isWorking ? 'working' : 'notWorking'}
                    data-student={el.student + ': ' + (el.endTimeBooking - el.startTimeBooking) / 1000 / 60 + 'min'}
                    className={`schedule-cell ${el.isBooking && ' tooltip'}`}
                    style={{ ...(el.isBooking && { backgroundColor: 'var(--color-red-300)' }) }}
                    onClick={
                        el.isWorking
                            ? () => {
                                  setSelectedSlot(el.startTime);
                                  setOpen(true);
                              }
                            : undefined
                    }
                ></div>
            ))}
            {open && selectedSlot !== null && <DialogBooking startTimeBooking={selectedSlot} setOpen={setOpen} setBookingData={setBookingData} />}
        </div>
    );
};
