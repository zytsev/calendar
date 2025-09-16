import { useState } from 'react';
import type { BookingData } from './day';

interface DialogBookingProps {
    startTimeBooking: number;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setBookingData: React.Dispatch<React.SetStateAction<BookingData[]>>;
}
export default function DialogBooking({ startTimeBooking, setOpen, setBookingData }: DialogBookingProps) {
    const [duration, setDuration] = useState(30);
    const [student, setStudent] = useState('');

    const handleClickRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDuration(Number(e.target.value));
    };
    const handleSubmit = () => {
        const book = {
            startTimeBooking: startTimeBooking,
            student: student,
            endTimeBooking: startTimeBooking + duration * 60 * 1000,
        };
        setBookingData((prev) => [...prev, book]);
        setOpen(false);
    };
    const handleCancel = () => {
        setBookingData((prev) => prev.filter((el) => el.startTimeBooking !== startTimeBooking));
        setOpen(false);
    };
    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black/40 z-10'>
            <div className='bg-white p-6 rounded-2xl shadow-xl w-96 text-black relative'>
                <h2 className='text-lg font-semibold mb-4'>Choose lesson duration</h2>
                <button onClick={() => setOpen(false)} className='absolute top-2 right-3 cursor-pointer'>
                    ✕
                </button>
                <form className='space-y-3'>
                    <label className='flex items-center space-x-2'>
                        <input type='radio' name='choice' value={30} checked={duration === 30} onChange={(e) => handleClickRadio(e)} />
                        <span>30 min</span>
                    </label>

                    <label className='flex items-center space-x-2'>
                        <input type='radio' name='choice' value={60} checked={duration === 60} onChange={(e) => handleClickRadio(e)} />
                        <span>60 min</span>
                    </label>

                    <label className='flex items-center space-x-2'>
                        <input type='radio' name='choice' value={90} checked={duration === 90} onChange={(e) => handleClickRadio(e)} />
                        <span>90 min</span>
                    </label>
                    <h2 className='text-lg font-semibold mb-4'>Input student</h2>
                    <label className='flex items-center space-x-2'>
                        <input type='text' name='student' value={student} onChange={(e) => setStudent(e.target.value)} placeholder='Student...' />
                    </label>
                </form>
                <button onClick={() => handleSubmit()} className='cursor-pointer border-2 m-4 p-1 rounded-sm'>
                    Save
                </button>
                <button onClick={() => handleCancel()} className='cursor-pointer border-2 m-4 p-1 rounded-sm'>
                    Delete
                </button>
            </div>
        </div>
    );
}
