/**
 * The hierarchy's option model.
 * What defines a valid option.
 */


 import { Hierarchy } from "./Hierarchy";


/**
 * The interface that indicates
 * sub-options.
 */
export interface IKeys {

    keys: any;
}


/**
 * The interface for options that have to parse their
 * respective values into a specific HTML element.
 */
export interface IParser {

    parse: (element: HTMLElement, hierarchy: Hierarchy) => void
}


/**
 * The option's class.
 */
export default abstract class Option {

    /**
     * The name of the option.
     */
    public label: string;

    /**
     * The data type of the option.
     */
    public type: string;

    /**
     * The possible values of the option.
     */
    public values: Array<any>;

    /**
     * The default value of the option.
     */
    public default: any;

    /**
     * Whether or not an option is inherited.
     */
    public inherited: boolean;
    

    /**
     * Constructor with parameters.
     * 
     * @param label The name of the option.
     * @param type The data type of the option.
     * @param defaultValue The default value of the option.
     * @param values The possible values of the option.
     */
    constructor(label: string, type: string, values: Array<any>, defaultValue: any, inherited: boolean = false) {

        this.label = label;
        this.type = type;
        this.values = values;
        this.default = defaultValue;
        this.inherited = inherited;
    }


    /**
     * Performs inheritance process on an option.
     */
    public abstract inherit (hierarchy: any, value: any): void


    /**
     * Get an option value from an existing HTML element.
     */
    public abstract getKeyFromElement (element: HTMLElement): any


    /**
     * Validates the option's name.
     * 
     * @param matchingOption The option object with the matching name.
     * 
     */
    public static validateOptionName = (matchingOption: Option): boolean => matchingOption != null;


    /**
     * Validates the data type of the option.
     * 
     * @param value The value of the option.
     * @param matchingOption The option object with the matching name.
     * 
     */
    public static validateOptionType(value: any, matchingOption: Option): { valid: boolean, type: string } {

        let optionType: string = "";

        // Getting the appropriate data type.
        if (Array.isArray(value)) {
            optionType = "array";
        } else {
            optionType = typeof value;
        }

        return {
            valid: optionType === matchingOption.type,
            type: optionType
        }
    }


    /**
     * Validates the option's value.
     * 
     * @param value The value to check.
     * @param matchingOption The option object with the matching name.
     * 
     */
    public static validateOptionValue(value: any, matchingOption: Option): boolean {
        
        // Checking if the matching object is valid.
        if (matchingOption != null && matchingOption.values.length > 0) {
            

            if (matchingOption.label === 'include' || matchingOption.label === 'exclude') {

                for (const val of value) {
                    
                    if (matchingOption.values.indexOf(val) === -1) {
                        return false;
                    }
                }
            } else {

                // Checking if the value is not a valid one.
                return matchingOption.values.indexOf(value) !== -1;
            }
        }

        return true;
    }
}
