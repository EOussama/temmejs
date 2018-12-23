/**
 * The module responsible for validating the input.
 */


import Option from "./models/Option";
import { options } from "./options";
import InvalidTemplateOptionError from "./errors/InvalidTemplateOptionError";


/**
 * Checks if an object is a valid hierarchy object.
 * 
 * @param hierarchy The object to check.
 */
export const isValidHierarchy = (hierarchy: Object): boolean => hierarchy != null && typeof hierarchy === 'object' && !Array.isArray(hierarchy);


/**
 * Checks if an object is a valid HTML element.
 * 
 * @param target The object to check.
 */
export const isValidHTMLElement = (target: HTMLElement): boolean => target != null && target instanceof HTMLElement;


/**
 * Validates the options in a hierarchy object for any
 * options it has or values it contains.
 * 
 * @param hierarchy The hierarchy object to validate the options for.
 * 
 * @throws InvalidOptionNameError, InvalidOptionTypeError, InvalidOptionValueError, InvalidTemplateOptionError
 */
export function validateOptions(hierarchy: any): void {

    try {

        // Looping through the hierarchy's options.
        for (const option in hierarchy) {

            const 
                matchingOption: Option = options.filter((opt: Option) => opt.label === option)[0],
                optionValue: any = hierarchy[option];

            // Validating the option's name.
            Option.validateOptionName(option, matchingOption);

            // Validating the option's type.
            Option.validateOptionType(option, optionValue, matchingOption);

            // Validating the option's value.
            Option.validateOptionValue(option, optionValue, matchingOption);
        }

        // Checking if the hierarchy object contains any templates.
        if ('templates' in hierarchy) {

            hierarchy.templates.forEach((template: Object) => {
                validateTemplates(template);
            });
        }

        // Repeating the same check for the hierarchy's children.
        if ('children' in hierarchy) {

            hierarchy.children.forEach((child: Object) => {
                validateOptions(child);
            });
        }
    }
    catch(e) {

        throw e;
    }
}


/**
 * Validates the templates in a hierarchy object.
 * 
 * @param template The template object to validate.
 * 
 * @throws InvalidOptionNameError, InvalidOptionTypeError, InvalidOptionValueError, InvalidTemplateOptionError
 */
export function validateTemplates(template: any): void {

    // The options that are not allowed for templates.
    const forbiddenOptions: Array<string> = ['name', 'children', 'templates'];

    try {

        // Looping through the options of the template.
        for (const option in template) {

            // Checking if the template contains any invalid options.
            if (forbiddenOptions.indexOf(option) > -1) {
                throw new InvalidTemplateOptionError(option);
            } else {
                validateOptions(template);
            }
        }
    }
    catch(e) {

        throw e;
    }
}
