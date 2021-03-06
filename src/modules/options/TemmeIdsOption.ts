/**
 * The reference option model.
 */


import Option from "../models/Option";


export default class TemmeIdsOption extends Option {

    /**
     * Parameterless constructor.
     */
    constructor() {

        super('temmeIds', 'array', [], []);
    }


    /**
     * Performs inheritance process on an option.
     * 
     * @param hierarchy The hierarchy object that inherits.
     * @param temmeIds The temmeIds to inherit.
     */
    public inherit(hierarchy: any, temmeIds: any): void { }


    /**
     * Gets nothing from a given HTML element.
     * 
     * @param element The HTML element to target. 
     */
    public getKeyFromElement = (element: HTMLElement): any => null;
}
