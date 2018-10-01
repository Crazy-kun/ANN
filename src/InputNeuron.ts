import { Neuron } from "./Neuron";

export class InputNeuron extends Neuron {
    activation = () => {
        this.outputValue = this.inputValue;
    };
}
