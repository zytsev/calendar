import days from '../assets/days.json';

export const Header = () => {
    return (
        <>
            {days.map((el) => (
                <div key={el.id} className={el.title === 'Time' ? 'time-header' : 'day-header'}>
                    {el.title}
                </div>
            ))}
        </>
    );
};
