import { Neuron } from "./Neuron";
import sigmoid from "./sigmoid";

export class HiddenNeuron extends Neuron {
    activation = () => {
        this.outputValue = sigmoid(this.inputValue);
    };

    evalDelta = (weight: number, delta: number) => {
        this.weight_delta_sum += weight * delta;
        this.delta =
            (1 - this.outputValue) * this.outputValue * this.weight_delta_sum;
        this.inputValue = 0;
    };
}
