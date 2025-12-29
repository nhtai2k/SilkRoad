import { MaterialModel } from "./material.model";

export interface MaterialUnitModel {
    id?: string;
    parentId?: string;
    materialId?: number;
    unitId: number;
    factor: number;
    value?: number;
    level: number;
    expanded?: boolean;
    children?: MaterialUnitModel[];
}

const defaultMaterialUnit: MaterialUnitModel = {
    unitId: 1,
    factor: 1,
    level: 1,
    expanded: true,
    children: [{
        unitId: 11,
        factor: 1,
        level: 2,
        expanded: true,
        children: [{
            unitId: 111,
            factor: 1,
            level: 3,
            expanded: true,
            children: []
        }, {
            unitId: 112,
            factor: 1,
            level: 3,
            expanded: true,
            children: []
        }]
    },
    {
        unitId: 12,
        factor: 1,
        level: 2,
        expanded: true,
        children: [
            {
                unitId: 121,
                factor: 1,
                level: 3,
                expanded: true,
                children: []
            },
            {
                unitId: 122,
                factor: 1,
                level: 3,
                expanded: true,
                children: []
            }
        ]
    },{
        unitId: 13,
        factor: 1,
        level: 2,
        expanded: true,
        children: []
    }
]
}
//Write a function to get MaterialUnitModel by index and level
//Index is the index of the MaterialUnitModel in the array, level is the level of the MaterialUnitModel

/**
 * Gets a MaterialUnitModel by index and level from a hierarchical array
 * @param index - The index of the MaterialUnitModel in the current level array
 * @param level - The target level of the MaterialUnitModel to find
 * @param obj - The array of MaterialUnitModel to search in
 * @returns The MaterialUnitModel if found, null otherwise
 */
function getMaterialUnitModelByIndexAndLevel(index: number, level: number, obj: MaterialUnitModel): MaterialUnitModel | null {
    // Check if the current item matches the index and level
    if (obj.level === level && index === 0) {
        return obj;
    }

    // If not found, search in children
    if (obj.children && obj.children.length > 0) {
        for (let i = 0; i < obj.children.length; i++) {
            const found = getMaterialUnitModelByIndexAndLevel(index - 1, level, obj.children[i]);
            if (found) {
                return found;
            }
        }
    }

    return null;
}
