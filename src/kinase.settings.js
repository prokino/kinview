
export const settings = {
    title: "KinView (Protein Kinase Viewer)",
    show_legend: true,
    ui: {
        numberingMarginLeft: "28px",
        numberingMarginTop: "-1px",
        numberingMinWidth: "20.01px",
        motifMarginLeft: "10px",
    },
    options: [
        {
            id: "treeview_only_dark",
        },
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
            visible: true,
            width: 4877,
            marginLeft: 0
        }
    ],
    elements: [{
            id: "residue",
            type: "checkbox",
            name: "Residue",
            dirpath: "sequences/png",
            extention: "png",
            checked: true,
            visible: true
        },
        {
            id: "ptmb",
            type: "checkbox",
            name: "PTM",
            dirpath: "ptm/barchart/png",
            extention: "png",
            checked: false,
            visible: true
        },
        {
            id: "mutant_weblogo",
            type: "checkbox",
            group: "Mutant Type",
            name: "Mutant/Weblogo",
            dirpath: "mutations/weblogos/png",
            extention: "png",
            checked: false,
            visible: true
        },
        {
            id: "barchart_weblogo",
            type: "checkbox",
            group: "Mutant Type",
            name: "Mutant/Barchart",
            dirpath: "mutations/barchart/png",
            extention: "png",
            checked: false,
            visible: true
        },
        {
            type: "dropdown",
            name: "Aligned sequences",
            visible: true,
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
                    ext: "fasta"
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
                }

            ]
        },
        {
            type: "dropdown",
            name: "Ortholog sequences",
            visible: true,
            options: [{
                    name: "Alignment",
                    dir: "ortholog_full",
                    ext: "fasta"
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