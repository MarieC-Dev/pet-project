calculatorForm.windowResult.value = '';

const calculation = (result) => {
    calculatorForm.windowResult.value =
        calculatorForm.windowResult.value + result;
};

const calculationResult = () => {
    calculatorForm.windowResult.value = 
        Function('return (' + calculatorForm.windowResult.value + ')')();
};

const calculationReset = () => {
    calculatorForm.windowResult.value = '';
};
