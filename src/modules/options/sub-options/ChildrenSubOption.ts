/**
 * The children sub option model.
 */


import Option from "../../models/Option";
import PlacementSubOption from "./PlacementSubOption";
import ChildrenAllowSubOption from "./ChildrenAllowSubOption";


/**
 * The children sub option class
 * of the from option.
 */
export default class ChildrenSubOption extends Option {

    /**
     * The keys of the `children` sub option.
     */
    public keys: FromChildrenKeys = {
        allow: new ChildrenAllowSubOption(),
        placement: new PlacementSubOption()
    };

    /**
     * Parameterless constructor.
     */
    constructor() {

        super('children', 'object', '', []);
    }
}


/**
 * The FromChildrenKeys type.
 */
type FromChildrenKeys = {

    /**
     * Whether or not to allow children inheritance.
     */
    allow: ChildrenAllowSubOption;

    /**
     * The inheritance mode.
     */
    placement: PlacementSubOption;
}
