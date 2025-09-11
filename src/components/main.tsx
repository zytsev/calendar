import { generateTimeStamps } from '@/service/utils';
import { Time } from './time';
import { Week } from './week';
import { useState } from 'react';
import { useTypeDevice } from '@/service/hooks';

export const Main = () => {
    const [interval, setInterval] = useState(30);
    const slots = generateTimeStamps(interval);
    const { isTablet } = useTypeDevice();
    console.log(isTablet);

    return (
        <div className='flex'>
            <Time slots={slots} value={interval} setValue={setInterval} />
            <Week numberOfSlots={slots.length} interval={interval} />
        </div>
    );
};
