import { Neuron } from "./Neuron";
import sigmoid from "./sigmoid";

export class OutputNeuron extends Neuron {
    constructor() {
        super();
        this.error = 0;
        this.ideal = 0;
        this._setCount = 0;
    }

    protected error: number;
    protected ideal: number;
    protected _setCount: number;

    evalError = () => {
        this.error =
            Math.pow(this.ideal - this.outputValue, 2) / this._setCount;
    };

    evalDelta = () => {
        this.delta =
            (this.ideal - this.outputValue) *
            ((1 - this.outputValue) * this.outputValue);
        this.inputValue = 0;
    };

    setIdeal = (value: number) => {
        this.ideal = value;
    };

    setCount = (count: number) => {
        this._setCount = count;
    };

    activation = () => {
        this.outputValue = sigmoid(this.inputValue);
    };

    result = () => {
        console.log("RESULT: ", this.outputValue);
        console.log("ERROR: ", this.error);
        console.log("=========================================");
    };
}
