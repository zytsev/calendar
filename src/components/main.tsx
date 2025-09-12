import { generateTimeStamps } from '@/service/utils';
import { Time } from './time';
import { Week } from './week';
import { useState } from 'react';

export const Main = () => {
    const [interval, setInterval] = useState(30);
    const slots = generateTimeStamps(interval);

    return (
        <div className='flex justify-center'>
            <Time slots={slots} value={interval} setValue={setInterval} />
            <Week numberOfSlots={slots.length} interval={interval} />
        </div>
    );
};
