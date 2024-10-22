export const settings = {
    title: "Family-specific Constraints in the Tyrosine Kinome",
    show_legend: false,
    ui: {
        numberingMarginLeft: "8px",
        numberingMarginTop: "-4px",
        numberingMinWidth: "18.55px"
    },
    options: [{
            id: "hierarchy",
            type: "checkbox",
            name: "Hierarchy",
            checked: true,
            visible: true
        },
        {
            id: "motif",
            type: "checkbox",
            name: "Motif",
            path: "",
            checked: false,
            visible: false
        },
        {
            id: "domain",
            type: "checkbox",
            name: "Domain Structure",
            path: "",
            checked: false,
            visible: true,
            width: 4840,
            marginLeft: 20
        }
    ],
    elements: [{
            id: "constraint",
            type: "checkbox",
            name: "Constraints",
            dirpath: "constraint/png",
            extention: "png",
            checked: true,
            visible: true
        },
        {
            id: "positive",
            type: "checkbox",
            name: "Positive",
            dirpath: "positive/png",
            extention: "png",
            checked: true,
            visible: false
        },
        {
            id: "negative",
            type: "checkbox",
            name: "Background",
            dirpath: "negative/png",
            extention: "png",
            checked: false,
            visible: true
        },
        {
            type: "dropdown",
            name: "Sequence",
            visible: true,
            options: [{
                    name: "Download",
                    dir: "sequence",
                    ext: "fa"
                },

            ]
        },

    ]
};