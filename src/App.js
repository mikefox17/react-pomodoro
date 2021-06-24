import './index.css';
import React, { useState, useRef } from 'react';

function padTime(time) {
    return time.toString().padStart(2, '0');
}

function App() {
    const [timeLeft, setTimeLeft] = useState(10);
    const [title, setTitle] = useState('Pomodoro');
    const [isRunning, setIsRunning] = useState(false);

    let intervalRef = useRef(null);

    function startTimer() {
        setIsRunning(true);
        if (intervalRef.current !== null) return;

        intervalRef.current = setInterval(() => {
            setTimeLeft(timeLeft => {
                setTitle('Countdown had begun');
                if (timeLeft >= 1) {
                    return timeLeft - 1;
                } else return 0;
            });
        }, 1000);
    }

    function stopTimer() {
        if (intervalRef.current === null) return;

        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setTitle('Keep it up!');
        setIsRunning(false);
    }

    function resetTimer() {
        setTitle('Pomodoro');
        setTimeLeft(10);
        intervalRef.current = null;
    }

    const minutes = padTime(Math.floor(timeLeft / 60));
    const seconds = padTime(timeLeft - minutes * 60);

    return (
        <div className='px-10 mx-auto py-20 bg-gray-100'>
            <h2 className='text-center text-4xl font-bold text-gray-400'>
                {title}
            </h2>
            <div className='timer mb-10 text-6xl text-green-400 text-center mt-10'>
                <span>{minutes}</span>
                <span>:</span>
                <span>{seconds}</span>
            </div>
            <div className='buttons space-x-4 text-center'>
                {!isRunning && (
                    <button
                        onClick={startTimer}
                        className='px-6 py-2 bg-blue-400 rounded text-blue-100 hover:bg-blue-300 hover:text-blue-500'
                    >
                        Start
                    </button>
                )}
                {isRunning && (
                    <button
                        onClick={stopTimer}
                        className='px-6 py-2 bg-blue-400 rounded text-blue-100 hover:bg-blue-300 hover:text-blue-500'
                    >
                        Stop
                    </button>
                )}

                <button
                    onClick={resetTimer}
                    className='px-6 py-2 bg-blue-400 rounded text-blue-100 hover:bg-blue-300 hover:text-blue-500'
                >
                    Reset
                </button>
            </div>
        </div>
    );
}

export default App;
