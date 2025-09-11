import { generateWeeklyTimeRanges } from '@/service/utils';

interface DayProps {
    title: string;
    interval: number;
    numberDayOfWeek: number;
    numberOfSlots: number;
}
export const Day = ({ title, interval, numberDayOfWeek, numberOfSlots }: DayProps) => {
    const slotsOfDay = generateWeeklyTimeRanges(interval, numberDayOfWeek);
    return (
        <div className='schedule-grid' style={{ gridTemplateRows: `40px repeat(${numberOfSlots}, 30px)` }}>
            <div className='day-header'>{title}</div>
            {slotsOfDay.map((el) => (
                <div key={el.id} data-type={el.isWorking ? 'working' : 'notWorking'} className='schedule-cell'>
                    {/* {el.startTime + '/' + el.endTime} */}
                </div>
            ))}
        </div>
    );
};
