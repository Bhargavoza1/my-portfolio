// tried to use typewriter-effect but giving me errors
// right now this will work for me
'use client'

import React, {useState, useEffect, useRef} from 'react';

function Typewriter({
                        textclass,
                        cursorclass,
                        text = "HELLO,WORLD",
                        writeDelay = 100,
                        readDelay = 1000,
                        eraseDelay = 70,
                    }: {
    textclass: string;
    cursorclass: string;
    text: string;
    writeDelay: number;
    readDelay: number;
    eraseDelay: number;
}) {
    const sentences = text.split(',').map((value: string) => value.trim());

    const [currentText, setCurrentText] = useState('');
    const [isTyping, setIsTyping] = useState(true);
    const [charIndex, setCharIndex] = useState(0);
    const  sentenceIndex  = useRef(0);

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        const typeNextCharacter = () => {
            if (isTyping) {
                if (charIndex < sentences[sentenceIndex.current].length) {//write character per delay
                    setCurrentText((prevText) => prevText + sentences[sentenceIndex.current][charIndex]);
                    setCharIndex((prevCharIndex) => prevCharIndex + 1);
                } else {//wait for some delay for ppl to read it.then it will start revers order
                    timeout = setTimeout(() => {
                        setIsTyping(false);
                    }, readDelay);
                }
            } else {
                if (currentText.length > 0) {//reverse. erasing one character per delay
                    setCurrentText((prevText) => prevText.slice(0, -1));
                } else {// reset or pick next sentence
                    setIsTyping(true);
                    setCharIndex(0);
                    sentenceIndex.current =(sentenceIndex.current + 1) % sentences.length; //this will help not to use one more if else
                    setCurrentText('');
                }
            }
        };

        timeout = setTimeout(typeNextCharacter, isTyping ? writeDelay : eraseDelay);

        return () => clearTimeout(timeout);
    }, [currentText, isTyping]);

    return (
        <>
            <span className={`${textclass}`}>{currentText}</span>
            <span
                className={`${cursorclass } box-border inline-block w-0.5 lg:w-1 ml-0.5 md:ml-1 -mb-1.5  md:-mb-1.7 lg:-mb-2.5  h-7 md:h-9 lg:h-12 animate-typing will-change-transform`}
            ></span>
        </>
    );
}

export default Typewriter;
