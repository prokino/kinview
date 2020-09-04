export const settings = {
    title:"GTExplorer",
    show_legend: true,
    ui: {
        numberingMarginLeft: "48px",
        numberingMarginTop: "-12px",
        numberingMinWidth: "20.76px"
    },
    options: [
        {
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
            checked: false,
            visible: true
        },
        {
            id: "domain",
            type: "checkbox",
            name: "Domain Structure",
            checked: false,
            visible: true
        }
    ],
    elements: [{
            id: "weblogo",
            type: "checkbox",
            name: "Residue",
            dirpath: "sequences/png",
            extention: "png",
            checked: true,
            visible: false
        },
        {
            id: "nr_seq",
            type: "dropdown",
            visible: true,
            name: "Nr Sequences",
            options: [{
                    name: "Alignment",
                    dir: "aligned_aln",
                    ext: "aln"
                },
                {
                    name: "Full-length seq",
                    dir: "aligned_full",
                    ext: "fasta"
                },
                {
                    name: "Kinase domain",
                    dir: "aligned_kd",
                    ext: "txt"
                },
                {
                    name: "Mutation",
                    dir: "aligned_mut",
                    ext: "txt"
                },
                {
                    name: "PTM",
                    dir: "aligned_ptm",
                    ext: "txt"
                },
            ]
        },
        {
            type: "dropdown",
            name: "UniProt sequences",
            visible: true,
            options: [{
                    name: "Alignment",
                    dir: "ortholog_full",
                    ext: "aln"
                },
                {
                    name: "Full-length seq",
                    dir: "ortholog_kd",
                    ext: "fasta"
                }

            ]
        },

    ]
};
