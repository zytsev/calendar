import days from '../assets/days.json';
import { Day } from './day';

interface WeekProps {
    numberOfSlots: number;
    interval: number;
}
export const Week = ({ numberOfSlots, interval }: WeekProps) => {
    return (
        <>
            {days.map((el) => (
                <Day key={el.id} interval={interval} numberOfSlots={numberOfSlots} numberDayOfWeek={el.id} title={el.title} />
            ))}
        </>
    );
};
