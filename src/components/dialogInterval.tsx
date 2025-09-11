import { useState } from 'react';

interface DialogIntervalProps {
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
}
export default function DialogInterval({ value, setValue }: DialogIntervalProps) {
    const [open, setOpen] = useState(false);

    const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(Number(e.target.value));
        setOpen(false);
    };

    return (
        <div>
            {/* Кнопка для открытия диалога */}
            <button onClick={() => setOpen(true)} className='cursor-pointer'>
                ▼
            </button>

            {/* Сам диалог */}
            {open && (
                <div className='fixed inset-0 flex items-center justify-center bg-black/40 z-10'>
                    <div className='bg-white p-6 rounded-2xl shadow-xl w-96 text-black relative'>
                        <h2 className='text-lg font-semibold mb-4'>Choose interval</h2>
                        <button onClick={() => setOpen(false)} className='absolute top-2 right-3 cursor-pointer'>
                            ✕
                        </button>
                        <form className='space-y-3'>
                            <label className='flex items-center space-x-2'>
                                <input type='radio' name='choice' value={15} checked={value === 15} onChange={(e) => handleClick(e)} />
                                <span>15 min</span>
                            </label>

                            <label className='flex items-center space-x-2'>
                                <input type='radio' name='choice' value={30} checked={value === 30} onChange={(e) => handleClick(e)} />
                                <span>30 min</span>
                            </label>

                            <label className='flex items-center space-x-2'>
                                <input type='radio' name='choice' value={60} checked={value === 60} onChange={(e) => handleClick(e)} />
                                <span>60 min</span>
                            </label>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
