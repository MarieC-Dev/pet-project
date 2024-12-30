calculatorForm.windowResult.value = 0;

const calculation = (result) => {
    calculatorForm.windowResult.value =
        calculatorForm.windowResult.value + result;
};

const calculationResult = () => {
    calculatorForm.windowResult.value = eval(calculatorForm.windowResult.value);
};

const calculationReset = () => {
    calculatorForm.windowResult.value = 0;
};
