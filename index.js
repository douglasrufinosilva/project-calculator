const allNumbersBtn = document.querySelectorAll('[data-number]')
const clearBtn = document.querySelector('[data-clear]')
const deleteBtn = document.querySelector('[data-delete]')
const allOperationBtn = document.querySelectorAll('[data-operation]')
const equalBtn = document.querySelector('[data-equals]')
const previousOperandTxt = document.querySelector('[data-previous-operand]')
const currentOperandTxt = document.querySelector('[data-current-operand]')


class Calculator {
    constructor(previousOperandTxt, currentOperandTxt) {
        this.previousOperandTxt = previousOperandTxt
        this.currentOperandTxt = currentOperandTxt
        this.clear()
    }

    formatDisplayNumber(number) { //formatar as casas decimais

        const stringNumber = number.toString()

        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]

        let integerDisplay

        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0, // está como zero pq a adição do ponto de casas decimais será feito manualmente
            })
        }

        if (decimalDigits != null) { // adição do ponto
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }

    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    calculate() {
        let result

        const previousOperandFloat = parseFloat(this.previousOperand)
        const currentOperendFloat = parseFloat(this.currentOperand)

        if(isNaN(previousOperandFloat) || isNaN(currentOperendFloat)) return

        switch(this.operation) {
            case '+':
                result = previousOperandFloat + currentOperendFloat
                break
            case '-':
                result = previousOperandFloat - currentOperendFloat
                break
            case '÷':
                result = previousOperandFloat / currentOperendFloat
                break
            case '*':
                result = previousOperandFloat * currentOperendFloat
                break            
            default:
                return
        }

        this.currentOperand = result
        this.operation = undefined
        this.previousOperand = ''

    }

    choseOperation(operation) {

        if(this.currentOperand === '') return //impedir uso dos operadores caso nao haja numeros

        if(this.previousOperand !== '') {
            this.calculate()
            }

        this.operation = operation

        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    appendeNumber(number) {
        if(this.currentOperand.includes('.') && number === '.') return

        this.currentOperand = `${this.currentOperand}${number.toString()}`
    }

    clear() {
        this.previousOperand = ''
        this.currentOperand = ''
        this.operation = undefined
    }

    updateDisplay() {
        this.previousOperandTxt.innerText = `${this.formatDisplayNumber(this.previousOperand)} ${this.operation || ''}`
        this.currentOperandTxt.innerText = this.formatDisplayNumber(this.currentOperand)
    }
}

const calculator = new Calculator(previousOperandTxt, currentOperandTxt)

for(const numberBtn of allNumbersBtn) {
    numberBtn.addEventListener('click', () => {
        calculator.appendeNumber(numberBtn.innerText)
        calculator.updateDisplay()
    })
}

for (const operationBtn of allOperationBtn) {
    operationBtn.addEventListener('click', () => {
        calculator.choseOperation(operationBtn.innerText)
        calculator.updateDisplay()
    })
}

clearBtn.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

equalBtn.addEventListener('click', () => {
    calculator.calculate()
    calculator.updateDisplay()
})

deleteBtn.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})