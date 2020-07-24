export const settings = {
    title:"Tyrosine Kinase Explorer",
    ui: 
    {
        numberingMarginLeft: "28px",
        numberingMarginTop: "-4px",
    },
    elements: [
        {
            id: "constraint",
            type: "checkbox",
            name: "Constraint",
            dirpath: "constraint/png",
            extention: "png",
            checked: true,
            visible: false
        },
        {
            id: "positive",
            type: "checkbox",
            name: "Positive",
            dirpath: "positive/png",
            extention: "png",
            checked: true,
            visible: true
        },
        {
            id: "negative",
            type: "checkbox",
            name: "Negative",
            dirpath: "negative/png",
            extention: "png",
            checked: false,
            visible: true
        },

    ]
};
