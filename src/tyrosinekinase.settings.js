export const settings = {

    controls: ["constraint_checkbox", "positive_checkbox", "negative_checkbox"],
    content: {
        elements: [
            {
                id: "constraint",
                type: "checkbox",
                name: "Constraint",
                dirpath: "constraint/png",
                extention: "png",
                checked: true,
                switchable: false
            },
            {
                id: "positive",
                type: "checkbox",
                name: "Positive",
                dirpath: "positive/png",
                extention: "png",
                checked: true,
                switchable: true
            },
            {
                id: "negative",
                type: "checkbox",
                name: "Negative",
                dirpath: "negative/png",
                extention: "png",
                checked: false,
                switchable: true
            },

        ]
    }
};
