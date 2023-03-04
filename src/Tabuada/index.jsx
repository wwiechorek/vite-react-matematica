import { useEffect, useState } from "react";
import Times from './times.svg'
import Check from './check.svg'

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array
}

function Tabuada({ back, numbers }) {
    const [ calc, setCalc ] = useState([])
    const [ options, setOptions ] = useState([])
    const [ ok, setOk ] = useState(null)
    const [ acertos, setAcertos ] = useState(0)
    const [ erros, setErros ] = useState(0)

    function getTwoRandom() {
        let n1 = numbers[Math.floor(Math.random()*numbers.length)];
        let n2 = numbers[Math.floor(Math.random()*numbers.length)];
        return [n1, n2]
    }

    function generateQuestion() {
        let num = getTwoRandom()
        setCalc(num)
        let opts = [
            num[0]*num[1],
        ]
        while (opts.length < 4) {
            let numopt = getTwoRandom()
            let copt = numopt[0]*numopt[1]
            if(opts.indexOf(copt) < 0)
                opts.push(copt)
        }

        setOptions(shuffleArray(opts))
    }

    useEffect(() => {
        generateQuestion()
    }, [numbers])

    function response(value) {
        let time = 0
        if(calc[0] * calc[1] === value) {
            setOk(true)
            setAcertos(a => a+1)
            time = 600
        } else {
            setOk(false)
            setErros(a => a+1)
            time = 3000
        }

        
        setTimeout(() => {
            setOk(null)
            generateQuestion()
        }, time)
    }

    function clearLevel() {
        setAcertos(0)
        setErros(0)
        back()
    }

    return (
        <div>
            {ok !== null && (
                <div className="action">
                    {ok && (
                        <img src={Check} width='190px' />
                    )}
                    {ok === false && (
                        <div className="falha">
                            <img src={Times} width='240px' />
                            <div>
                                {calc[0]} x {calc[1]} = <span>{calc[0]*calc[1]}</span>
                            </div>
                        </div>
                    )}
                </div>
            )}
            <div className="flashcard">{calc[0]} x {calc[1]}</div>
            <div className="response">
                {options.map(i => (
                    <button key={i} onClick={() => response(i)}>{i}</button>
                ))}
            </div>
            <div className="result">
                <div>
                    Acertos <br />
                    {acertos}
                </div>
                <div>
                    Erros <br />
                    {erros}
                </div>
            </div>
            <div className="btnvoltar">
                <button onClick={clearLevel}>Voltar</button>
            </div>
        </div>
    )
}

export default Tabuada