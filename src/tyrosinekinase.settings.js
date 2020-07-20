import { Tune } from "@material-ui/icons";

export const settings = {

    controls: ["constraint_checkbox","positive_checkbox","negative_checkbox"],
    content:
    {
        elements:[
            {
                id: "constraint",
                name: "Constraint",
                dirpath:"constraint/png",
                extention:"png",
                visible:true,
                switchable:false
            },
            {
                id:"positive",
                name: "Positive",
                dirpath:"positive/png",
                extention:"png",
                visible:true,
                switchable:true
            },
            {
                id: "negative",
                name: "Negative",
                dirpath:"negative/png",
                extention:"png",
                visible:false,
                switchable:true
            },
            
        ]
    }
};
