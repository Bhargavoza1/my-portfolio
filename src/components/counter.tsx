// tried to use typewriter-effect but giving me errors
// right now this will work for me
'use client'

import React, { useState, useEffect } from 'react';

function Tick({ className ,text, delay  }) {
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentOrder, setcurrentOrder] = useState(false);

    const [currentWord, setcurrentWord] = useState('');
    const [currentSentenceindex, setcurrentSentenceindex] = useState( 0);

    const [firstInit, setcfirstInit] = useState(false);


    useEffect(() => {
        let timeout;
        if(!firstInit){
            var result = text.split(",").map(function (value) {
                return value.trim();
            });


                setcurrentSentenceindex(1);
                setcurrentWord(  result[0] );
                //console.log('currentSentenceindex' ,currentSentenceindex)



            setcfirstInit(true);

        }


        if (currentIndex <  currentWord.length && !currentOrder) {




            timeout = setTimeout(() => {
                setCurrentText(prevText => prevText + currentWord[currentIndex]);
                setCurrentIndex(prevIndex => prevIndex + 1);
            }, delay);

        } else if (currentIndex === currentWord.length ) { // ADD THIS CHECK
            timeout = setTimeout(() => {
                setcurrentOrder(true);
            }, 1000);


        }

        if(currentIndex !== 0 &&  currentOrder){
            timeout = setTimeout(() => {
                setCurrentIndex(prevIndex => prevIndex - 1);
                setCurrentText(prevText => prevText.slice(0, -1));
            }, 100);
        }
        else if (currentIndex <= 0  &&  currentOrder) { // ADD THIS CHECK

            var result = text.split(",").map(function (value) {
                return value.trim();
            });
           // console.log('from else' ,result);
                if(result.length >  currentSentenceindex  ){
                    setcurrentSentenceindex(prevState =>prevState + 1);
                    setcurrentWord(  result[currentSentenceindex ] );

                }
                else {
                    setcurrentSentenceindex(0);
                    setcurrentWord(  result[0] );
                    //console.log('currentSentenceindex' ,currentSentenceindex)
                }



                setcurrentOrder(false);

        }
        return () => clearTimeout(timeout);
    }, [currentIndex, currentOrder, delay,  currentSentenceindex ,currentWord ]);


    // Typing logic goes here

    return (

        < >
            <span className={`${ className}  `}>{currentText}</span>
            <span
                 className=" box-border inline-block w-0.5 md:w-1  h-7     md:ml-1 -mb-1.5 bg-[#1b96f3] md:-mb-4 md:h-16   animate-typing will-change-transform  "
             ></span>
        </ >
       );
}

export  default  Tick;