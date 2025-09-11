interface TimesProps {
    slots: string[];
}
export const Slots = ({ slots }: TimesProps) => {
    return (
        <>
            {slots.map((el, i) => (
                <div key={i} className='time-slot'>
                    {el}
                </div>
            ))}
        </>
    );
};
