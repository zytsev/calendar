import { generateTimeStamps } from '@/service/utils';
import { Slots } from './slots';

export const Main = () => {
    return (
        <>
            <Slots slots={generateTimeStamps(30)} />
        </>
    );
};
