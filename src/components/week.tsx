import { useState } from 'react';
import days from '../assets/days.json';
import { Day } from './day';
import { useTypeDevice } from '@/service/hooks';

interface WeekProps {
    numberOfSlots: number;
    interval: number;
}
export const Week = ({ numberOfSlots, interval }: WeekProps) => {
    const { isTablet, isMobile, isDesktopOrLaptop } = useTypeDevice();
    const initialState = isMobile ? new Date().getDay() - 1 : 0;
    const [cursor, setCursor] = useState(initialState);

    const step = isMobile ? 1 : 3;

    const FullWeek = days.map((el) => <Day key={el.id} interval={interval} numberOfSlots={numberOfSlots} numberDayOfWeek={el.id} title={el.title} />);
    let FilteredWeek = FullWeek;
    if (!isDesktopOrLaptop) {
        if (isTablet && cursor > 4) {
            setCursor(4);
        }
        FilteredWeek = FullWeek.slice(cursor, cursor + step);
    }

    const handleNext = () => {
        if (cursor + step < FullWeek.length) {
            setCursor(cursor + 1);
        }
    };
    const handlePrev = () => {
        if (cursor > 0) {
            setCursor(cursor - 1);
        }
    };
    return (
        <>
            {FilteredWeek}
            {!isDesktopOrLaptop && (
                <div className='fixed top-1/2 pl-5 pr-5 flex justify-between w-full'>
                    <button
                        className='w-12 h-12 flex items-center justify-center rounded-full shadow-md bg-white text-gray-700 hover:bg-gray-100 active:scale-95 transition'
                        disabled={cursor === 0}
                        onClick={handlePrev}
                    >
                        ←
                    </button>
                    <button
                        className='w-12 h-12 flex items-center justify-center rounded-full shadow-md bg-white text-gray-700 hover:bg-gray-100 active:scale-95 transition'
                        disabled={cursor === 6}
                        onClick={handleNext}
                    >
                        →
                    </button>
                </div>
            )}
        </>
    );
};
