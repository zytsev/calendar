import DialogInterval from './dialogInterval';
import { Slots } from './slots';
interface TimeProps {
    slots: string[];
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
}
export const Time = ({ slots, value, setValue }: TimeProps) => {
    return (
        <div className='schedule-grid' style={{ gridTemplateRows: `40px repeat(${slots.length}, 30px)`, gridTemplateColumns: '80px' }}>
            <div className='time-header'>
                <span>Time</span>
                <DialogInterval value={value} setValue={setValue} />
            </div>
            <Slots slots={slots} />
        </div>
    );
};
