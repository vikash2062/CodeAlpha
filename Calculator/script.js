 class Calculator {
            constructor() {
                this.mainDisplay = document.getElementById('mainDisplay');
                this.subDisplay = document.getElementById('subDisplay');
                this.currentOperand = '0';
                this.previousOperand = '';
                this.operation = null;
                this.waitingForOperand = false;
                this.shouldResetDisplay = false;
                
                this.initializeEventListeners();
            }

            initializeEventListeners() {
                document.addEventListener('click', (e) => {
                    if (e.target.matches('[data-action]')) {
                        this.handleButtonClick(e.target);
                    }
                });

                document.addEventListener('keydown', (e) => {
                    this.handleKeyboard(e);
                });
            }

            handleButtonClick(button) {
                const action = button.dataset.action;
                
                // Add pressed effect
                button.classList.add('pressed');
                setTimeout(() => button.classList.remove('pressed'), 150);

                switch (action) {
                    case 'number':
                        this.inputNumber(button.dataset.number);
                        break;
                    case 'operator':
                        this.inputOperator(button.dataset.operator);
                        break;
                    case 'equals':
                        this.calculate();
                        break;
                    case 'decimal':
                        this.inputDecimal();
                        break;
                    case 'clear':
                        this.clear();
                        break;
                    case 'clear-entry':
                        this.clearEntry();
                        break;
                }
            }

            handleKeyboard(e) {
                e.preventDefault();
                
                // Find and highlight the corresponding button
                let button = null;
                
                if (e.key >= '0' && e.key <= '9') {
                    button = document.querySelector(`[data-number="${e.key}"]`);
                    this.inputNumber(e.key);
                } else if (e.key === '+' || e.key === '-') {
                    button = document.querySelector(`[data-operator="${e.key}"]`);
                    this.inputOperator(e.key);
                } else if (e.key === '*') {
                    button = document.querySelector(`[data-operator="*"]`);
                    this.inputOperator('*');
                } else if (e.key === '/') {
                    button = document.querySelector(`[data-operator="/"]`);
                    this.inputOperator('/');
                } else if (e.key === 'Enter' || e.key === '=') {
                    button = document.querySelector(`[data-action="equals"]`);
                    this.calculate();
                } else if (e.key === '.') {
                    button = document.querySelector(`[data-action="decimal"]`);
                    this.inputDecimal();
                } else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
                    button = document.querySelector(`[data-action="clear"]`);
                    this.clear();
                } else if (e.key === 'Backspace') {
                    button = document.querySelector(`[data-action="clear-entry"]`);
                    this.clearEntry();
                }

                // Add visual feedback for keyboard press
                if (button) {
                    button.classList.add('pressed');
                    setTimeout(() => button.classList.remove('pressed'), 150);
                }
            }

            inputNumber(number) {
                if (this.waitingForOperand) {
                    this.currentOperand = number;
                    this.waitingForOperand = false;
                } else {
                    this.currentOperand = this.currentOperand === '0' ? number : this.currentOperand + number;
                }
                
                if (this.shouldResetDisplay) {
                    this.currentOperand = number;
                    this.shouldResetDisplay = false;
                }

                this.updateDisplay();
            }

            inputOperator(nextOperator) {
                const inputValue = parseFloat(this.currentOperand);

                if (this.previousOperand === '') {
                    this.previousOperand = inputValue;
                } else if (this.operation) {
                    const currentValue = this.previousOperand || 0;
                    const newValue = this.performCalculation(currentValue, inputValue, this.operation);

                    this.currentOperand = String(newValue);
                    this.previousOperand = newValue;
                    this.updateDisplay();
                }

                this.waitingForOperand = true;
                this.operation = nextOperator;
                this.updateSubDisplay();
            }

            calculate() {
                const prev = parseFloat(this.previousOperand);
                const current = parseFloat(this.currentOperand);

                if (isNaN(prev) || isNaN(current) || !this.operation) {
                    return;
                }

                const result = this.performCalculation(prev, current, this.operation);
                
                this.currentOperand = String(result);
                this.previousOperand = '';
                this.operation = null;
                this.waitingForOperand = false;
                this.shouldResetDisplay = true;
                
                this.updateDisplay();
                this.updateSubDisplay();
            }

            performCalculation(prev, current, operation) {
                let result;
                
                switch (operation) {
                    case '+':
                        result = prev + current;
                        break;
                    case '-':
                        result = prev - current;
                        break;
                    case '*':
                        result = prev * current;
                        break;
                    case '/':
                        if (current === 0) {
                            return 'Error';
                        }
                        result = prev / current;
                        break;
                    default:
                        return current;
                }

                // Round to avoid floating point precision issues
                return Math.round((result + Number.EPSILON) * 100000000) / 100000000;
            }

            inputDecimal() {
                if (this.waitingForOperand) {
                    this.currentOperand = '0.';
                    this.waitingForOperand = false;
                } else if (this.currentOperand.indexOf('.') === -1) {
                    this.currentOperand += '.';
                }

                if (this.shouldResetDisplay) {
                    this.currentOperand = '0.';
                    this.shouldResetDisplay = false;
                }

                this.updateDisplay();
            }

            clear() {
                this.currentOperand = '0';
                this.previousOperand = '';
                this.operation = null;
                this.waitingForOperand = false;
                this.shouldResetDisplay = false;
                this.updateDisplay();
                this.updateSubDisplay();
            }

            clearEntry() {
                if (this.currentOperand.length > 1) {
                    this.currentOperand = this.currentOperand.slice(0, -1);
                } else {
                    this.currentOperand = '0';
                }
                this.updateDisplay();
            }

            updateDisplay() {
                const displayValue = this.currentOperand;
                
                // Handle error states
                if (displayValue === 'Error' || displayValue === 'Infinity' || displayValue === '-Infinity') {
                    this.mainDisplay.textContent = 'Error';
                    this.mainDisplay.classList.add('error');
                    return;
                } else {
                    this.mainDisplay.classList.remove('error');
                }

                // Format large numbers
                const numValue = parseFloat(displayValue);
                if (!isNaN(numValue)) {
                    if (Math.abs(numValue) > 999999999) {
                        this.mainDisplay.textContent = numValue.toExponential(6);
                    } else {
                        this.mainDisplay.textContent = displayValue;
                    }
                } else {
                    this.mainDisplay.textContent = displayValue;
                }
            }

            updateSubDisplay() {
                if (this.operation && this.previousOperand !== '') {
                    const operatorSymbol = {
                        '+': '+',
                        '-': '−',
                        '*': '×',
                        '/': '÷'
                    }[this.operation];
                    
                    this.subDisplay.textContent = `${this.previousOperand} ${operatorSymbol}`;
                } else {
                    this.subDisplay.textContent = '';
                }
            }
        }

        // Initialize calculator when page loads
        document.addEventListener('DOMContentLoaded', () => {
            new Calculator();
        });