// tried to use typewriter-effect but giving me errors
// right now this will work for me
'use client'

import React, {useState, useEffect, useRef} from 'react';

function Tick( {className, text, WritingDelay,ReadingDelay,EraseDelay}:{className:string, text:string, WritingDelay:number,ReadingDelay:number,EraseDelay:number}) {


    const TotalSentence = text.split(",").map(function (value: string) {
        return value.trim();
    });

    const  currentSentence  = useRef('');
    const currentSentenceindex = useRef(0);

    const [currentText, setCurrentText] = useState('');
    const currentTextIndex = useRef(0);

    const [Isreverse, setIsreverse] = useState(true);


    useEffect(() => {
        let timeout:NodeJS.Timeout;


        if (!Isreverse) {

            if (currentTextIndex.current !== currentSentence.current.length) {
                timeout = setTimeout(() => {

                    setCurrentText(prevText => prevText + currentSentence.current[currentTextIndex.current - 1]);
                    currentTextIndex.current += 1;
                }, WritingDelay);


            } else { // ADD THIS CHECK
                timeout = setTimeout(() => {
                    setIsreverse(true);
                }, ReadingDelay);


            }
        } else {

            if (currentTextIndex.current !== 0) {
                timeout = setTimeout(() => {
                    currentTextIndex.current -= 1;
                    setCurrentText(prevText => prevText.slice(0, -1));
                }, EraseDelay);
            } else {


                currentSentence.current = TotalSentence.length  > currentSentenceindex.current ?
                                          TotalSentence[currentSentenceindex.current] :
                                          TotalSentence[currentSentenceindex.current = currentSentenceindex.current - currentSentenceindex.current];
                currentSentenceindex.current += 1;


                setIsreverse(false);

            }

        }


        return () => clearTimeout(timeout);
    }, [ Isreverse, currentText]);


    // Typing logic goes here

    return (

        < >
            <span className={`${className}  `}>{currentText}</span>
            <span
                className=" box-border inline-block w-0.5 md:w-1  h-7     md:ml-1 -mb-1.5 bg-[#1b96f3] md:-mb-4 md:h-16   animate-typing will-change-transform  "
            ></span>
        </ >
    );
}

export default Tick;